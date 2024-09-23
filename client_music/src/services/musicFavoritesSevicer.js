import Instance from "~/utils/httpReques"
const MusicFavoritesSevicer = () => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'page/get/musicFavorites',
            method:'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export default MusicFavoritesSevicer