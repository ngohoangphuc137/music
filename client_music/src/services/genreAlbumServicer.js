import Instance from "~/utils/httpReques"

export const genreParent = () => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'get/genreParent',
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const genre = (idGenre) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'genre/get/info',
            method: 'get',
            params: {
                id: idGenre
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const albumGenre = (idGenre,page)=>new Promise(async(resolve, reject)=>{
    try {
        const response = await Instance({
            url: 'genrealbum/get/list',
            method: 'get',
            params: {
                id: idGenre,
                page
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})