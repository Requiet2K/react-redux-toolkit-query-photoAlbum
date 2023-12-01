import { useAddPhotoMutation, useFetchPhotosQuery } from '../store/apis/photosApi';
import { albumState, photoState } from './propsTypes'
import { Skeleton,Button,CircularProgress,Stack } from "@mui/material";
import PhotoListItem from './PhotoListItem';

const PhotoList = ({album} : {album:albumState}) => {

    const {data, isError, isFetching} = useFetchPhotosQuery(album);

    const [addPhoto, {isLoading}] = useAddPhotoMutation();

    let content;
    console.log(data);
    const handleClick = () => {
        addPhoto(album);
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
            content = data.map((photo:photoState) => {
                return <PhotoListItem key = {photo.id} photo = {photo}/>
            })
        }
    }

    return (
        <div>
            <div className="topAlignment">
                <h1 style={{fontSize:"24px",marginLeft:"50px"}}>{album.title} Photos</h1>
                <Button variant="outlined" color="info" onClick={handleClick}>
                    {
                    isLoading ? 
                    <Stack alignItems="center" style={{width:"100px"}}>
                        <CircularProgress size={25} style={{padding: "0 10px"}} />
                    </Stack> 
                    : 
                    <span style={{width:"100px"}}>Add Photo</span>
                    }
                </Button>
            </div>
            <Stack direction="row" justifyContent="center" flexWrap="wrap" alignItems="center">
                {content}
            </Stack>
        </div>
    )
}

export default PhotoList
