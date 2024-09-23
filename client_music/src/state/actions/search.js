import actionType from "./actionType"
import { apiSearchType } from "~/services/searchSevicer"

export const searchType = (keyword, type) => async (dispatch) => {
    try {
        const response = await apiSearchType(keyword, type);
        if (response.data.status === 200) {
            dispatch({
                type: actionType.SEARCH_TYPE,
                data: response.data.data
            })
            dispatch(loadingSearch(true))
        } else {
            dispatch({
                type: actionType.SEARCH_TYPE,
                data: null
            })
            dispatch(loadingSearch(false))
        }
    } catch (error) {
        dispatch({
            type: actionType.SEARCH_TYPE,
            data: null
        })
        dispatch(loadingSearch(false))
    }
}
export const loadingSearch = (value) => ({
    type: actionType.LOADING_SEARCH,
    isLoading: value
})