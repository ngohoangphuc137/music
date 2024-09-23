import Instance from "~/utils/httpReques"

export const searchSuggestions = (valueSearch) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'search/suggestions',
            method: 'get',
            params: {
                query: valueSearch
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiSearchType = (query, type) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'page/search',
            method: 'get',
            params: {
                q: query,
                type
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})