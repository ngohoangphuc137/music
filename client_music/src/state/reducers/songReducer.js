import actionType from "../actions/actionType"
const initState = {
    currunSongId: null,
    musicSection: {
        idSection: null,
        section: null
    },
    TITLE_KEY: {
        title: null,
        link: null,
    },
    songInfo: null,
    isPlay: false,
    songChanged: false,
    loader: false,
    isSbarRight: false,
    songDataSlideBarRight: [],
    temporaryDataRight: [],
    listStateSong: {
        pre: null,
        next: null
    },
    isShuffle: false,
    isRepeat: false,
    dataSlideRightShuffle: [],
    dataSongRecentlyHeard: [],
}
const SongReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.SET_CUR_SONG_ID:
            return {
                ...state,
                currunSongId: action.idSong || null
            }
        case actionType.SET_PLAYER:
            return {
                ...state,
                isPlay: action.isPlayer
            }
        case actionType.SET_LOADER:
            return {
                ...state,
                loader: action.loader
            }
        case actionType.SET_SECTION:
            return {
                ...state,
                musicSection: {
                    idSection: action.id,
                    section: action.name
                }
            }
        case actionType.SET_INFO_SONG:
            return {
                ...state,
                songInfo: action.dataInfoSong || null
            }
        case actionType.SET_TITLE_KEY:
            return {
                ...state,
                TITLE_KEY: {
                    title: action.title || null,
                    link: action.key || null
                }
            }
        case actionType.SET_SONG_DATA_SLIDEBAR_RIGHT:
            return {
                ...state,
                songDataSlideBarRight: action.dataSong || []
            }
        case actionType.SET_IS_SLIDEBAR_RIGHT:
            return {
                ...state,
                isSbarRight: action.isSbRight
            }
        case actionType.SET_LIST_STATE_SONG:
            return {
                ...state,
                listStateSong: {
                    pre: action.dataListState.dataPre || null,
                    next: action.dataListState.dataNext || null
                }
            }
        case actionType.SET_TEMPORART_DATA_RIGHT:
            return {
                ...state,
                temporaryDataRight: action.data
            }
        case actionType.SET_SONG_CHANGED:
            return {
                ...state,
                songChanged: action.data
            }
        case actionType.SET_IS_SHUFFLE:
            return {
                ...state,
                isShuffle: action.value
            }
        case actionType.SET_IS_REPEAT:
            return {
                ...state,
                isRepeat: action.value
            }
        case actionType.SET_DATASONG_RECENTLY_HEARD:
            let newDataRecenlty = [...state.dataSongRecentlyHeard]
            const checkDulicate = state.dataSongRecentlyHeard.some(item => item.id === action.data.id)
            if (!checkDulicate) {
                newDataRecenlty = [action.data, ...newDataRecenlty]
            }
            if (newDataRecenlty.length >= 10) {
                newDataRecenlty.pop()
            }
            return {
                ...state,
                dataSongRecentlyHeard: newDataRecenlty
            }
        default:
            return state
    }
}
export default SongReducer