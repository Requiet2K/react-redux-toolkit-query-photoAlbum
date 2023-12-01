import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store/apis/albumsApi";
import AlbumListItem from "./AlbumListItem";
import { albumState, userState } from "./propsTypes"
import { Skeleton,Button,CircularProgress,Stack } from "@mui/material";

function AlbumList({ user }: { user: userState }) {

  const { data, isError, isFetching } = useFetchAlbumsQuery(user);

  const [addAlbum, {isLoading}] = useAddAlbumMutation();

  let content;

  const handleClick = () => {
      addAlbum(user);
  }

  if(isFetching || isLoading){
      content = (
          <Skeleton variant="rectangular" sx={{width: "100%", height: "200px"}}/>
      );
  }
  else if(isError){
      content = (
          <div>Error</div>
      );
  }
  else{
      if(data){
          content = data.map((album:albumState) => {
              return <AlbumListItem key = {album.id} album = {album}/>
          })
      }
  }

  return (
      <div>
          <div className="topAlignment">
              <h1 style={{fontSize:"24px", marginLeft:"25px"}}>{user.name} Albums</h1>
              <Button variant="outlined" color="info" onClick={handleClick}>
                  {
                  isLoading ? 
                  <Stack alignItems="center" style={{width:"100px"}}>
                      <CircularProgress size={25} style={{padding: "0 10px"}} />
                  </Stack> 
                  : 
                  <span style={{width:"100px"}}>Add Album</span>
                  }
              </Button>
          </div>
          <div>
              {content}
          </div>
      </div>
  )
}

export default AlbumList
