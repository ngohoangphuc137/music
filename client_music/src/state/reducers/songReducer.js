import actionType from "../actions/actionType"
const initState = {
    currunSongId: null,
    isPlay: false,
    loader: false
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
        default:
            return state
    }
}
export default SongReducer