import actionType from "../actions/actionType"
const initState = {
    currunSongId: null,
    musicSection:{
        idSection:null,
        section:null
    },
    TITLE_KEY: {
        title: null,
        link: null,
    },
    songInfo: null,
    isPlay: false,
    loader: false,
    isSbarRight: false,
    songDataSlideBarRight: [],
    temporaryDataRight:[],
    listStateSong: {
        pre: null,
        next: null
    }
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
                musicSection:{
                    idSection:action.id,
                    section:action.name 
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
            return{
                ...state,
                temporaryDataRight:action.data
            }
        default:
            return state
    }
}
export default SongReducer