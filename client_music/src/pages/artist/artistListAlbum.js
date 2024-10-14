import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useMediaQuery } from 'react-responsive'

import InfiniteScroll from "react-infinite-scroll-component"
import Icons from "~/components/icons"
import { ListSongArtist } from "~/services/artistServicer"
import Album from "~/components/carouselItem/itemAlbum"
import PlayListSkeleton from "~/components/skeleton/playListSkeleton"

const { MdHorizontalRule, IoPlayCircleSharp } = Icons

const ArtistListAlbum = () => {
    const { infoArtist } = useSelector(state => state.artist)
    const [albums, setAlbums] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(true)
    const [loading, setloading] = useState(false);
    const type = 'album';
    const maxW768 = useMediaQuery({ query: '(max-width:768px)' })
    useEffect(() => {
        const listAlbum = async () => {
            const response = await ListSongArtist(infoArtist.idArtist, type, page)
            if (response.data.status === 200) {
                setAlbums(response.data.data.item)
                setTotal(response.data.data.total)
                setPage(page + 1)
                setloading(true)
            }
        }
        listAlbum()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        if (albums.length < total) {
            setPage(page + 1)
            const listSong = async () => {
                const response = await ListSongArtist(infoArtist.idArtist, 'song', page);
                if (response.status === 200) {
                    setAlbums(albums.concat(response.data.data.item))
                }
            }
            listSong()

        } else {
            setHasMore(false)
        }
    }


    return (
        <div>
            <InfiniteScroll
                dataLength={10}
                next={fetchData}
                hasMore={albums?.length === total ? false : hasMore}
                className={`lg:px-[59px] sm:px-[20px] min-[300px]:px-3 ${maxW768 ? 'relative h-[calc(100vh-135px-60px)]' : 'absolute lg:mt-[70px] sm:mt-[45px] min-[300px]:mt-[45px]'} inset-0 main-page`}
                loader={<div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`}  ><PlayListSkeleton count={10} /></div>}
                style={{ height: 'calc(100vh-85px)' }}
                height={'100vh'}
            >
                <div className="inset-0">
                    <div className="text-[#ffff] pt-3">
                        <div className="w-auto mb-3">
                            <div className={`title ${maxW768 ? 'text-[17px]' : 'text-[20px]'} font-bold leading-normal flex items-center`}>
                                <h3>{infoArtist.nameArtist}</h3>
                                <MdHorizontalRule size={20} className="px-[2px] mx-1" />
                                <span>Tất cả bài hát</span>
                                {!maxW768 && (
                                    <button className="ml-3 w-10 h-10 flex items-center justify-center">
                                        <IoPlayCircleSharp size={40} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`} >
                            {loading && (
                                albums?.map(item => (
                                    <Album
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        aliasTitle={item.aliasTitle}
                                        thumbnail={item.thumbnail}
                                        description={item.description}
                                        isAlbum={item.isAlbum}
                                    />
                                ))
                            )}
                        </div>
                        {!loading && <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`} ><PlayListSkeleton count={10} /></div>}
                    </div >
                </div>
            </InfiniteScroll>
        </div>
    )
}
export default ArtistListAlbum