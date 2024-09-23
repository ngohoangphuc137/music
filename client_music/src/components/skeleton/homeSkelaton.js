import PlayListSkeleton from "./playListSkeleton"
import SongSkeleton from "./songSkeleton"

const HomeSkeleton = () => {
    return (
        <div>
            <div className="animate-pulse mb-1 w-[300px] h-[30px] rounded bg-[hsla(0,0%,100%,0.1)]"></div>
            <SongSkeleton count={5} />
            <div className="animate-pulse mb-1 mt-4 w-[300px] h-[30px] rounded bg-[hsla(0,0%,100%,0.1)]"></div>
            <div className="grid md:grid-cols-5" ><PlayListSkeleton count={5} /></div>
            <div className="animate-pulse mb-1 mt-4 w-[300px] h-[30px] rounded bg-[hsla(0,0%,100%,0.1)]"></div>
            <div className="grid md:grid-cols-5" ><PlayListSkeleton count={5} /></div>
            <div className="animate-pulse mb-1 mt-4 w-[300px] h-[30px] rounded bg-[hsla(0,0%,100%,0.1)]"></div>
            <div className="grid md:grid-cols-5" ><PlayListSkeleton count={5} /></div>
        </div>
    )
}
export default HomeSkeleton