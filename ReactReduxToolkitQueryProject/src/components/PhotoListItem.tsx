import { photoState } from './propsTypes'
import { useRemovePhotoMutation } from '../store';
import { Button,CircularProgress,Stack,Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const PhotoListItem = ({photo} : {photo:photoState}) => {
    const [removePhoto, {isLoading}] = useRemovePhotoMutation();

    const handleClick = () => {
        removePhoto(photo);
    }

    return (
        <Stack direction="row" flexWrap="wrap" sx={{margin:"10px"}}>
            <Box style={{position:"relative"}}>
                <img src={photo.url} alt="" />
                <Button onClick={handleClick} 
                sx={{position: "absolute", top: "50%", left:"50%",transform: "translate(-50%,-50%)"}}>
                        {isLoading ? (<CircularProgress size={18}/>) : (<DeleteIcon />)}
                </Button>
            </Box>
        </Stack>
    );
}

export default PhotoListItem
