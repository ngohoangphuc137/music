import Instance from "~/utils/httpReques"

export const loginServicer = (dataLogin) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'login',
            method: 'post',
            data: dataLogin
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const registerServicer = (dataRegister) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'register',
            method: 'post',
            data: dataRegister
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const logoutServicer = (tokenUser) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'logout',
            method: 'post',
            headers: {
                'Authorization': `Bearer ${tokenUser}`
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const loginGoogleServicer = (tokenGoogle) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'auth/google',
            method: 'post',
            data: { token: tokenGoogle }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const userFavourite = (type, id, tokenUser) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'user/favourite',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${tokenUser}`
            },
            params: {
                type,
                id
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const userFollow = (id, tokenUser) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'user/follow',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${tokenUser}`
            },
            params: {
                id
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const libaryService = (tokenUser) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'user/get/libary',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${tokenUser}`
            },
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const listPlaylistService = (tokenUser, type) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'user/get/list/playlist',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${tokenUser}`
            },
            params: {
                type
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const listArtistService = (tokenUser) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'user/get/list/artist',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${tokenUser}`
            },
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const createPlaylist = (tokenUser, name) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'user/playlist/post/create',
            method: 'post',
            headers: {
                'Authorization': `Bearer ${tokenUser}`
            },
            data: {
                name
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const addToPlaylistServicer = (tokenUser, idPlaylist, idSong) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'user/song/post/add-to-playlist',
            method: 'post',
            headers: {
                'Authorization': `Bearer ${tokenUser}`
            },
            params: {
                playlist: idPlaylist,
                id: idSong
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const removeToPlaylistServicer = (tokenUser, idPlaylist, idSong) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'user/song/post/remove-from-list',
            method: 'post',
            headers: {
                'Authorization': `Bearer ${tokenUser}`
            },
            params: {
                playlist: idPlaylist,
                id: idSong
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getListRecentlyServiver = (tokenUser, page) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'user/get/list-recently',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${tokenUser}`
            },
            params: {
                page
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const postRecentlyServiver = (tokenUser, id) => new Promise(async (resolve, reject) => {
    try {
        const response = await Instance({
            url: 'user/post/add-to-recently',
            method: 'post',
            headers: {
                'Authorization': `Bearer ${tokenUser}`
            },
            data: {
                id
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

