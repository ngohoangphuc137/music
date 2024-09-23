import actionType from "../actions/actionType";

const initState = {
    dataSearch: null,
    loadingSearch: false
}

const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.SEARCH_TYPE:
            return {
                ...state,
                dataSearch: action.data
            }

        case actionType.LOADING_SEARCH:
            return {
                ...state,
                loadingSearch: action.isLoading
            }

        default:
            return state;
    }
}
export default searchReducer