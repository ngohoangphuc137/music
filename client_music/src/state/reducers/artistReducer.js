import actionType from "../actions/actionType";
const initState = {
    infoArtist: {
        idArtist: null,
        nameArtist: null
    }
}

const ArtistReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.SET_INFOARTIST:
            return {
                ...state,
                infoArtist: {
                    idArtist: action.id || null,
                    nameArtist: action.name || null,
                }
            }
        default:
            return state;
    }
}
export default ArtistReducer