import ItemFavorites from "~/components/carouselItem/itemFavorites"
import Icons from "~/components/icons"

const {IoPlayCircleSharp} = Icons
const MusicFavorites = () => {
    return (
        <div className="text-[#ffff] pt-10">
            <div className="w-auto mb-7">
                <div className="title text-[35px] font-bold leading-normal flex items-center">
                    <h3>BXH nhạc yêu thích</h3>
                    <button className="ml-3 w-10 h-10 flex items-center justify-center">
                        <IoPlayCircleSharp size={40} className="mt-1"/>
                    </button>
                </div>
            </div>
            <div>
                <ItemFavorites/>
                <ItemFavorites/>
                <ItemFavorites/>
            </div>
        </div>
    )
}
export default MusicFavorites