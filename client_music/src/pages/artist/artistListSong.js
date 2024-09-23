import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import InfiniteScroll from "react-infinite-scroll-component";

import Icons from "~/components/icons";
import SelectItem from "~/components/carouselItem/selectItem";
import { ListSongArtist } from "~/services/artistServicer";
import hocSong from "~/components/HOC/hocSong";
import { setTemporaryDataRight } from "~/state/actions/song";

const { IoPlayCircleSharp, MdHorizontalRule } = Icons

const ArtistListSong = ({Context}) => {
    const type='song'
    const { infoArtist } = useSelector(state => state.artist)
    const dispatch = useDispatch();
    const [songs, setSongs] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(true)
    useEffect(() => {
        const listSong = async () => {
            const response = await ListSongArtist(infoArtist.idArtist, type, page)
            if (response.data.status === 200) {
                setSongs(response.data.data.item);
                dispatch(setTemporaryDataRight(response.data.data.item))
                setPage(page + 1)
                setTotal(response.data.data.total);
            }
        }
        listSong()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        if (songs.length < total) {
            setPage(page + 1)
            const listSong = async () => {
                const response = await ListSongArtist(infoArtist.idArtist, 'song', page);
                if (response.status === 200) {
                    setSongs(songs.concat(response.data.data.item))
                }
            }
            listSong()

        } else {
            setHasMore(false)
        }
    }

    return (
        <>
            <main className="flex-1">
                <InfiniteScroll
                    dataLength={songs.length}
                    next={fetchData}
                    hasMore={hasMore}
                    className="main-page relative flex-1 overflow-y-auto overflow-hidden scrollbar-hidden z-[90] h-[calc(100vh-85px)]"
                    loader={<h4>Loading...</h4>}
                    style={{ height: 'calc(100vh-85px)' }}
                    height={'100vh'}
                >
      
                    <div className="px-[59px] inset-0">
                        <div className="text-[#ffff] pt-3">
                            <div className="w-auto mb-7">
                                <div className="title text-[20px] font-bold leading-normal flex items-center">
                                    <h3>{infoArtist.nameArtist}</h3>
                                    <MdHorizontalRule size={20} className="px-[2px] mx-1" />
                                    <span>Tất cả bài hát</span>
                                    <button className="ml-3 w-10 h-10 flex items-center justify-center">
                                        <IoPlayCircleSharp size={40} />
                                    </button>
                                </div>
                            </div>

                            <div>
                                {songs?.map(item => (
                                    <SelectItem
                                        key={item.id}
                                        id={item.id}
                                        isLuMusic={false}
                                        thumbnail={item.thumbnail}
                                        name={item.name}
                                        artist={item.artist}
                                        album={item.album}
                                        thumbnailAlbum={item.album?.thumbnail}
                                        duration={item.duration}
                                        composers={item.composers}
                                        genre={item.genre}
                                        totalListens={item.totalListens}
                                        totalFavourited={item.totalFavourited}
                                        isAlbum={item.album?.isAlbum}
                                        Themecontext={Context}
                                    />
                                ))}
                            </div>
                        </div >
                    </div>
                </InfiniteScroll>
            </main>
        </>
    )
}
export default hocSong(ArtistListSong,true,'ARTIST_SONGS')