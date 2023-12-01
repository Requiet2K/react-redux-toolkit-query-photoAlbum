import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { userState } from "../../components/propsTypes";
import { faker } from "@faker-js/faker";

const pause = (duration:number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,duration);
    })
}

const usersApi = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),
    tagTypes: ["User"],
    endpoints(builder) {
        return {
            fetchUsers: builder.query<userState, void>({
                providesTags: ["User"],
                query: () =>{
                    return{
                        url:"/users",
                        method:"GET"
                    }}
            }),
            addUsers: builder.mutation<userState, void>({
                invalidatesTags: () => {
                    return [{type: "User"}];
                },
                query: () =>{
                    return{
                        url:"/users",
                        method:"POST",
                        body: {
                            name: faker.person.fullName(),
                        }}
                }
            }),
            removeUsers: builder.mutation<{ success: boolean; user: userState }, userState>({
                invalidatesTags: () => {
                    return [{type: "User"}];
                },
                query: (user) =>{
                    return{
                        url:`/users/${user.id}`,
                        method:"delete",
                    }}
            }),
        }
    },
})

export {usersApi};
export const {useFetchUsersQuery, useAddUsersMutation, useRemoveUsersMutation} = usersApi;