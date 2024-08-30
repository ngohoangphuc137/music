import actionType from "./actionType"
export const setCurSong = (id) => (
    {
        type: actionType.SET_CUR_SONG_ID,
        idSong: id
    }
)
export const setPlay = (valueboolen) => ({
    type: actionType.SET_PLAYER,
    isPlayer: valueboolen
})
export const setLoader = (value)=>({
    type:actionType.SET_LOADER,
    loader:value
})