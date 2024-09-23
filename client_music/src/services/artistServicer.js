import Instance from "~/utils/httpReques"

const ArtistServicer = (alias) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'page/get/artist',
            method: 'get',
            params: {
                alias: alias
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

const ListSongArtist = (id, type, page) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'artist/get/list',
            method: 'get',
            params: {
                id: id,
                type: type,
                page
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export { ArtistServicer, ListSongArtist }