import { useAddUsersMutation, useFetchUsersQuery } from "../store"
import { Skeleton,Button,CircularProgress,Stack } from "@mui/material";
import UserListItem from "./UserListItem";
import { userState } from "./propsTypes";

const UserList = () => {

    const [addUsers, {isLoading}] = useAddUsersMutation();
    const { data, isError, isFetching } = useFetchUsersQuery();

    let content;

    const handleClick = () => {
        addUsers();
    }

    if(isFetching || isLoading){
        content = (
            <Skeleton variant="rectangular" sx={{width: "100%", height: "600px"}}/>
        );
    }
    else if(isError){
        content = (
            <div>Error</div>
        );
    }
    else{
        if(data){
            content = data.map((user:userState) => {
                return <UserListItem key = {user.id} user = {user}/>
            })
        }
    }

    return (
        <div>
            <div className="topAlignment">
                <h1 style={{fontSize:"24px"}}>Persons</h1>
                <Button variant="outlined" color="info" onClick={handleClick}>
                    {
                    isLoading ? 
                    <Stack alignItems="center" style={{width:"100px"}}>
                        <CircularProgress size={25} style={{padding: "0 10px"}} />
                    </Stack> 
                    : 
                    <span style={{width:"100px"}}>Add Person</span>
                    }
                </Button>
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}

export default UserList
