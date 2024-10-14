import { useEffect, useState } from "react"
import { useMediaQuery } from 'react-responsive'

import Icons from "~/components/icons"
import MusicFavoritesSevicer from "~/services/musicFavoritesSevicer"
import ListSongFavoties from "./ListSongFavorites"
import SongSkeleton from "~/components/skeleton/songSkeleton"

const { IoPlayCircleSharp } = Icons
const MusicFavorites = () => {
    const [loading, setloading] = useState(false);
    const [songs, setSongs] = useState(null);
    const maxW768 = useMediaQuery({ query: '(max-width:768px)' })
    useEffect(() => {
        const musicFavorites = async () => {
            const response = await MusicFavoritesSevicer();
            if (response.status === 200) {
                setSongs(response.data.data)
                setloading(true)
            }
        }
        musicFavorites()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={`lg:px-[59px] sm:px-[20px] min-[300px]:px-3 pt-6 ${maxW768 ? 'relative h-[calc(100vh-135px-60px)]' : 'absolute'} inset-0`}>
            <div className={`text-[#ffff] ${maxW768 ? 'pt-0' : 'pt-10'}`}>
                <div className="w-auto mb-7">
                    <div className="title text-[35px] font-bold leading-normal flex items-center">
                        <h3>BXH nhạc yêu thích</h3>
                        <button className="ml-3 w-10 h-10 flex items-center justify-center">
                            <IoPlayCircleSharp size={40} className="mt-1" />
                        </button>
                    </div>
                </div>

                <div>
                    {!loading && (<SongSkeleton count={10} />)}
                    {loading && (<ListSongFavoties songs={songs} />)}
                </div>
            </div >
        </div>
    )
}
export default MusicFavorites