import actionType from "../actions/actionType"
const initState = {
    favoriteMusic: {},
    topic1: {},
    topic2: {},
    album: {},
    slideBarRight: false,
    genre_parent: null
}
const HomeReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.GET_HOME:
            return {
                ...state,
                favoriteMusic: action?.home.find((item) => (item.sectionId === "song")) || {},
                topic1: action?.home.find((item) => (item.sectionId === "topic1")) || {},
                topic2: action?.home.find((item) => (item.sectionId === "topic2")) || {},
                album: action?.home.find((item) => (item.sectionId === "album")) || {},
            }
        case actionType.SET_TOGGLE_SLIDEBARRIGHT:
            return {
                ...state,
                slideBarRight: action.slideRight
            }
        case actionType.GENRE_PARENT:
            return {
                ...state,
                genre_parent: action.data || null
            }
        default:
            return state
    }
}
export default HomeReducer