import { albumState } from './propsTypes'
import ExpandablePanel from "./ExpandablePanel";
import { Button,CircularProgress } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRemoveAlbumMutation } from "../store";
import PhotoList from './PhotoList';

function AlbumListItem({album} : {album:albumState}) {
    const [removeUser, {isLoading}] = useRemoveAlbumMutation();

    const handleClick = () => {
        removeUser(album);
    }

    const header = (
        <>
            <Button onClick={handleClick}>
                {isLoading ? (<CircularProgress size={18}/>) : (<DeleteIcon />)}
            </Button>
            {album.title}
        </>
    );

    return (
        <ExpandablePanel header={header}>
            <PhotoList album={album} />
        </ExpandablePanel>
    );
}

export default AlbumListItem
