export type userState = {
    map(arg0: (user: userState) => import("react/jsx-runtime").JSX.Element): any
    id: number,
    name: string
}

export type albumState = {
    userId: number,
    title: string,
    id: number
}

export type photoState = {
    albumId: number,
    url: string,
    id: number
}
