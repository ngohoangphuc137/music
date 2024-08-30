import Instance from "~/utils/httpReques"
export const getIdSong = () => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'get/idSong',
            method: 'get'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const infoSong = (idSong) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'get/infoSong',
            method: 'get',
            params: {
                id: idSong
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const linkSong = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'get/linkSong',
            method: 'get',
            params: {
                id: id
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})