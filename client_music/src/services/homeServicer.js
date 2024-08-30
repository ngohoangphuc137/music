import Instance from "~/utils/httpReques"
export const getHome = () => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'page/get/home',
            method: 'get'
        })
        resolve(response)
    } catch (error) {
        reject(error);
    }
})