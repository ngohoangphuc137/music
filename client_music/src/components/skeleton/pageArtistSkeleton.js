import SongSkeleton from "./songSkeleton"
import PlayListSkeleton from "./playListSkeleton"
import { useMediaQuery } from 'react-responsive'

const PageArtistSkeleton = () => {
    const maxW768 = useMediaQuery({ query: '(max-width:768px)' })
    return (
        <div className="absolute inset-0 text-white">
            <div className="artist-page">
                <div className="artist-hero relative w-auto mt-[-70px] mb-[30px] pt-32 overflow-hidden">
                    <div className="absolute inset-0 w-full h-auto right-0">
                        <div className="blur filterCustom block bg-cover h-full absolute inset-0 bg-no-repeat"></div>
                    </div>
                    <div className="w-full lg:mt-[70px] lg:px-[59px] sm:px-[20px] sm:mt-[40px] min-[300px]:px-3 min-[300px]:mt-[30px] h-full relative pb-6">
                        <div className="flex flex-shrink flex-grow">
                            <span className={`animate-pulse bg-imgCustom rounded-[50%] ${maxW768?'w-[100px] h-[100px] mr-3':'w-[150px] h-[150px] mr-6 '} bg-no-repeat inline-block  bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]`}></span>
                            <div className="flex flex-col flex-1 justify-around">
                                <span className="animate-pulse mt-2 bg-imgCustom h-[50px] w-3/4 rounded-lg bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                                <div className="flex items-center">
                                    <span className="animate-pulse my-[7px] bg-imgCustom mr-4 pb-3 w-2/6 rounded-lg bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                                    <span className="animate-pulse my-[7px] bg-imgCustom pb-3 w-2/6 rounded-lg bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:px-[59px] sm:px-[20px] min-[300px]:px-3">
                <div className="animate-pulse mb-1 w-[300px] h-[30px] rounded bg-[hsla(0,0%,100%,0.1)]"></div>
                <SongSkeleton count={3} />
                <div className="animate-pulse mb-1 mt-4 w-[300px] h-[30px] rounded bg-[hsla(0,0%,100%,0.1)]"></div>
                <div className="grid md:grid-cols-5" ><PlayListSkeleton count={5} /></div>
                <div className="animate-pulse mb-1 mt-4 w-[300px] h-[30px] rounded bg-[hsla(0,0%,100%,0.1)]"></div>
                <div className="grid md:grid-cols-5" ><PlayListSkeleton count={5} /></div>
            </div>
        </div>
    )
}
export default PageArtistSkeleton