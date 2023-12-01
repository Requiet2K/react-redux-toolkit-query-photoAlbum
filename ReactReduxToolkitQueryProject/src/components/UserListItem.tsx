import AlbumList from "./AlbumList";
import ExpandablePanel from "./ExpandablePanel";
import { userState } from "./propsTypes";
import { Button,CircularProgress } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRemoveUsersMutation } from "../store";

const UserListItem = ({ user }: { user: userState }) => {

    const [removeUser, {isLoading}] = useRemoveUsersMutation();

    const handleClick = () => {
        removeUser(user);
    }

    const header = (
        <>
            <Button onClick={handleClick}>
                {isLoading ? (<CircularProgress size={18}/>) : (<DeleteIcon />)}
            </Button>
            {user.name}
        </>
    );

    return (
        <ExpandablePanel header={header}>
            <AlbumList user={user} />
        </ExpandablePanel>
    );
};

export default UserListItem;
