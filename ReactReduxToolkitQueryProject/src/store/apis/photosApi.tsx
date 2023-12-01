import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { photoState } from "../../components/propsTypes";
import { albumState } from "../../components/propsTypes";
import { faker } from "@faker-js/faker";

const pause = (duration:number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,duration);
    })
}

const photosApi = createApi({
    reducerPath: "photos",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),
    tagTypes: ["Photo", "AlbumPhotos"],
    endpoints(builder) {
        return {
            fetchPhotos: builder.query<photoState[], albumState>({
                providesTags: (result, error, album) => {
                    
                    const tags: { type: "Photo" | "AlbumPhotos"; id: number }[] = [];

                    if(result){
                        tags.push(...result.map((photo:photoState) => {
                            return {type: "Photo" as const, id: photo.id};
                        }));
                    }                      

                    tags.push({type: "AlbumPhotos" as const, id: album.id});
                    return tags;
                },
                query: (album) =>{
                    return{
                        url:"/photos",
                        method:"GET",
                        params: {
                            albumId: album.id,
                        }
                    }}
            }),
            addPhoto: builder.mutation<photoState, albumState>({
                invalidatesTags: (result, error, album) => {
                    return [{type: "AlbumPhotos", id: album.id}];
                },
                query: (album) =>{
                    return{
                        url:"/photos",
                        method:"POST",
                        body: {
                            albumId: album.id,
                            url: faker.image.url({width:150, height: 150}),
                        }}
                }
            }),
            removePhoto: builder.mutation<{ success: boolean; photo: photoState }, photoState>({
                invalidatesTags: (result, error, album) => {
                    return [{type: "Photo", id: album.id}];
                },
                query: (photo) =>{
                    return{
                        url:`/photos/${photo.id}`,
                        method:"delete",
                    }}
            }),
        }
    },
})

export {photosApi};
export const {useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation} = photosApi;