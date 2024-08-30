import actionType from "../actions/actionType"
const initState = {
    favoriteMusic: {},
    topic1: {},
    topic2: {},
    album: {},
}
const HomeReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.GET_HOME:
            return {
                ...state,
                favoriteMusic: action?.home.find((item) => (item.sectionId === "song"))||{},
                topic1: action?.home.find((item) => (item.sectionId === "topic1"))||{},
                topic2: action?.home.find((item) => (item.sectionId === "topic2"))||{},
                album: action?.home.find((item) => (item.sectionId === "album"))||{},
            }
        default:
            return state
    }
}
export default HomeReducer