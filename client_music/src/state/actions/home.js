import actionType from "./actionType";
export const actionHome = (dataHome) => ({
    type: actionType.GET_HOME,
    home: dataHome
})
export const toggleSlideBarRight = (value) => ({
    type: actionType.SET_TOGGLE_SLIDEBARRIGHT,
    slideRight: value
})
export const setGenreParent = (data) => ({
    type: actionType.GENRE_PARENT,
    data
})