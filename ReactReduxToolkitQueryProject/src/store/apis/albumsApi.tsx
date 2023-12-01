import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { userState } from "../../components/propsTypes";
import { albumState } from "../../components/propsTypes";
import { faker } from "@faker-js/faker";

const pause = (duration:number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,duration);
    })
}

const albumsApi = createApi({
    reducerPath: "albums",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),
    tagTypes: ["Album", "UsersAlbum"],
    endpoints(builder) {
        return {
            fetchAlbums: builder.query<albumState[], userState>({
                providesTags: (result, error, user) => {
                    
                    const tags: { type: "Album" | "UsersAlbum"; id: number }[] = [];

                    if(result){
                        tags.push(...result.map((album:albumState) => {
                            return {type: "Album" as const, id: album.id};
                        }));
                    }                      

                    tags.push({type: "UsersAlbum" as const, id: user.id});
                    return tags;
                },
                query: (user) =>{
                    return{
                        url:"/albums",
                        method:"GET",
                        params: {
                            userId: user.id,
                        }
                    }}
            }),
            addAlbum: builder.mutation<albumState, userState>({
                invalidatesTags: (result, error, user) => {
                    return [{type: "UsersAlbum", id: user.id}];
                },
                query: (user) =>{
                    return{
                        url:"/albums",
                        method:"POST",
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName(),
                        }}
                }
            }),
            removeAlbum: builder.mutation<{ success: boolean; album: albumState }, albumState>({
                invalidatesTags: (result, error, album) => {
                    return [{type: "Album", id: album.id}];
                },
                query: (album) =>{
                    return{
                        url:`/albums/${album.id}`,
                        method:"delete",
                    }}
            }),
        }
    },
})

export {albumsApi};
export const {useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation} = albumsApi;