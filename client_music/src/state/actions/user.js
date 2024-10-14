import actionType from "./actionType"

export const setIsOpenRegiter = (value) => ({
    type: actionType.SET_IS_OPEN_REGITER,
    value
})
export const setIsOpenLogin = (value) => ({
    type: actionType.SET_IS_OPEN_LOGIN,
    value
})
export const setTokenUser = (token) => ({
    type: actionType.SET_TOKEN_USER,
    token
})
export const setInfoUser = (name, favoSong, favoPlaylist, follow, creatPlaylist) => ({
    type: actionType.SET_INFO_USER,
    info: {
        name,
        favoSong,
        favoPlaylist,
        follow,
        creatPlaylist
    }
})
export const clearInfoUser = () => ({
    type: actionType.CLEAR_INFO_USER
})

export const setFavouriteSong = (id) => ({
    type: actionType.SET_FAVOURIRE_SONG_PUSH,
    id
})
export const setFavouriteSongRemove = (id) => ({
    type: actionType.SET_FAVOURIRE_SONG_REMOVE,
    id
})
export const setFavouritePlaylist = (id) => ({
    type: actionType.SET_FAVOURIRE_PLAYLIST_PUSH,
    id
})
export const setFavouritePlaylistRemove = (id)=>({
    type:actionType.SET_FAVOURIRE_PLAYLIST_REMOVE,
    id
})
export const setFollowArtistPush = (id)=>({
    type:actionType.SET_FOLLOW_ARTIST_PUSH,
    id
})
export const setFollowArtistRemove = (id)=>({
    type:actionType.SET_FOLLOW_ARTIST_REMOVE,
    id
})
export const setCreatePlaylistPush = (id)=>({
    type:actionType.SET_CREATE_PLAYLIST_PUSH,
    id
})
export const setCreatePlaylistRemove = (id)=>({
    type:actionType.SET_CREATE_PLAYLIST_REMOVE,
    id
})