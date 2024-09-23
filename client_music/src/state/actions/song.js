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
export const setSection = (id,name)=>({
    type:actionType.SET_SECTION,
    id,
    name
})
export const setTitleKey = (title,key)=>({
    type:actionType.SET_TITLE_KEY,
    title,
    key
})
export const setSonginfo = (data)=>({
    type:actionType.SET_INFO_SONG,
    dataInfoSong:data
})
export const setSongDataSlideBarRight = (data)=>({
    type:actionType.SET_SONG_DATA_SLIDEBAR_RIGHT,
    dataSong:data
})
export const setIsSlidebarRight = (value)=>({
    type:actionType.SET_IS_SLIDEBAR_RIGHT,
    isSbRight:value
})
export const setListStateSong = (pre,next)=>({
    type:actionType.SET_LIST_STATE_SONG,
    dataListState:{
        dataPre:pre,
        dataNext:next
    }
})
export const setTemporaryDataRight = (data)=>({
    type:actionType.SET_TEMPORART_DATA_RIGHT,
    data
})