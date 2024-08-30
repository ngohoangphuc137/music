import Instance from "~/utils/httpReques"

const AlbumServicer = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'get/playList',
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

export default AlbumServicer