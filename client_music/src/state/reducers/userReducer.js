import actionType from "../actions/actionType";
const initState = {
    isOpenRegiter: false,
    isOpenLogin: false,
    bearer_token: null,
    info_user: {
        name: null,
        favouriteSongs: [],
        favouritePlaylists: [],
        favouriteArtist: [],
        createdPlaylists: []
    },
}

const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.SET_IS_OPEN_REGITER:
            return {
                ...state,
                isOpenRegiter: action.value
            }
        case actionType.SET_IS_OPEN_LOGIN:
            return {
                ...state,
                isOpenLogin: action.value
            }
        case actionType.SET_TOKEN_USER:
            return {
                ...state,
                bearer_token: action.token
            }
        case actionType.SET_INFO_USER:
            return {
                ...state,
                info_user: {
                    name: action.info?.name || null,
                    favouriteSongs: action.info?.favoSong || [],
                    favouritePlaylists: action.info?.favoPlaylist || [],
                    favouriteArtist: action.info?.follow || [],
                    createdPlaylists: action.info?.creatPlaylist || []
                }
            }
        case actionType.CLEAR_INFO_USER:
            return {
                ...state,
                info_user: {
                    name: null,
                    favouriteSongs: [],
                    favouritePlaylists: [],
                    favouriteArtist: [],
                    createdPlaylists: []
                }
            }
        case actionType.SET_FAVOURIRE_SONG_PUSH:
            return {
                ...state,
                info_user: {
                    ...state.info_user,
                    favouriteSongs: [...state.info_user.favouriteSongs, action.id]
                },
            }
        case actionType.SET_FAVOURIRE_SONG_REMOVE:
            return {
                ...state,
                info_user: {
                    ...state.info_user,
                    favouriteSongs: state.info_user.favouriteSongs.filter(songId => songId !== action.id)
                },
            }
        case actionType.SET_FAVOURIRE_PLAYLIST_PUSH:
            return {
                ...state,
                info_user: {
                    ...state.info_user,
                    favouritePlaylists: [...state.info_user.favouritePlaylists, action.id]
                },
            }

        case actionType.SET_FAVOURIRE_PLAYLIST_REMOVE:
            return {
                ...state,
                info_user: {
                    ...state.info_user,
                    favouritePlaylists: state.info_user.favouritePlaylists.filter(Id => Id !== action.id)
                },
            }
        case actionType.SET_FOLLOW_ARTIST_PUSH:
            return {
                ...state,
                info_user: {
                    ...state.info_user,
                    favouriteArtist: [...state.info_user.favouriteArtist, action.id]
                },
            }
        case actionType.SET_FOLLOW_ARTIST_REMOVE:
            return {
                ...state,
                info_user: {
                    ...state.info_user,
                    favouriteArtist: state.info_user.favouriteArtist.filter(Id => Id !== action.id)
                },
            }
        case actionType.SET_CREATE_PLAYLIST_PUSH:
            return {
                ...state,
                info_user: {
                    ...state.info_user,
                    createdPlaylists: [...state.info_user.createdPlaylists, action.id]
                },
            }
        case actionType.SET_CREATE_PLAYLIST_REMOVE:
            return {
                ...state,
                info_user: {
                    ...state.info_user,
                    createdPlaylists: state.info_user.createdPlaylists.filter(Id => Id !== action.id)
                },
            }
        default:
            return state
    }
}
export default UserReducer