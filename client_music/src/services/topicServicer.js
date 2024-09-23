import Instance from "~/utils/httpReques"

export const TopicHome = () => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'page/get/topic-home',
            method: 'get'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const Topic_Detail = (idTopic) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'page/get/topic-detail',
            method: 'get',
            params: {
                id: idTopic
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
