import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Scrollbar } from "react-scrollbars-custom";

import SongItemSlideBarRight from "~/components/carouselItem/songItemSlideBarRight";
import AlbumServicer from "~/services/albumServicer";
import MusicFavoritesSevicer from "~/services/musicFavoritesSevicer";
import { ListSongArtist } from "~/services/artistServicer";
import { setSongDataSlideBarRight, setCurSong, setPlay, setIsSlidebarRight, setListStateSong } from "~/state/actions/song";
import musicSections from "~/utils/musicSections";

const SlideBarRight = () => {
    const dispatch = useDispatch()
    const ref = useRef()
    const { slideBarRight } = useSelector((state) => state.home);
    const { songDataSlideBarRight, musicSection, currunSongId, isPlay, TITLE_KEY, isSbarRight, listStateSong } = useSelector(
        (state) => state.song
    );
    const [isTabBar, setIsTabBar] = useState(false);
    const [title, setTitle] = useState({
        name: null,
        link: null
    })

    const isSlidebarRight = slideBarRight
        ? "w-[330px] bg-[#120822] top-0 transition ease-in-out delay-150 duration-[0.75s] right-0 max-h-screen h-[calc(100vh-85px)] z-100 fixed translate-x-[0px]"
        : "w-[330px] bg-[#120822] top-0 transition ease-in-out delay-150 duration-[0.75s] right-0 max-h-screen h-[calc(100vh-85px)] z-100 fixed translate-x-[330px]";

    useEffect(() => {
        const listSongRight = () => {
            if (musicSections.ALBUM === musicSection.section) {
                albumSong()
            } else if (musicSections.ARTIST_SONGS === musicSection.section) {
                songsArtist()
            } else {
                musicFar()
            }
        };
        listSongRight()
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    const albumSong = async () => {
        if (musicSection.idSection === null) return
        const responseALbum = await AlbumServicer(musicSection.idSection)
        if (responseALbum.status === 200) {
            dispatch(setSongDataSlideBarRight(responseALbum.data.data.song))
            updataSongData(responseALbum.data.data.song)
        }
    }
    const songsArtist = async () => {
        const response = await ListSongArtist(musicSection.idSection,'song')
        if (response.data.status === 200) {
            dispatch(setSongDataSlideBarRight(response.data.data.item))
            updataSongData(response.data.data.item)
        }
    }
    const musicFar = async () => {
        const responseMusic = await MusicFavoritesSevicer()
        if (responseMusic.status === 200) {
            dispatch(setSongDataSlideBarRight(responseMusic.data.data))
            updataSongData(responseMusic.data.data)
        }
    }

    useLayoutEffect(() => {

        const checkUserClick = () => {
            updataSongData(songDataSlideBarRight)
            if (ref.current !== null) ref?.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
        }
        if (isPlay && !isSbarRight) {
            checkUserClick()
        } else if (isPlay && isSbarRight) {
            const data = listStateSong.pre?.concat(listStateSong.next);
            updataSongData(data, false)
        }

    }, [currunSongId, isPlay]);

    const handlUpdataCurSong = (id) => {
        if (id !== currunSongId) {
            dispatch(setCurSong(id))
            dispatch(setPlay(true))
            dispatch(setIsSlidebarRight(true))
        } else {
            dispatch(setIsSlidebarRight(true))
            isPlay ? dispatch(setPlay(false)) : dispatch(setPlay(true))
        }
    }

    const updataSongData = (data, isSetTitle = true) => {
        const findIndexSong = data?.findIndex(
            (item) => item.id === currunSongId
        );
        const songPre = data?.slice(0, findIndexSong + 1);
        const songNext = data?.filter((item, index) => index > findIndexSong)
        dispatch(setListStateSong(songPre, songNext))
        if (isSetTitle) {
            setTitle(() => ({
                name: TITLE_KEY?.title,
                link: TITLE_KEY?.link
            }))
        }
    }


    return (
        <div className={isSlidebarRight}>
            <div className="w-full h-full relative flex flex-col text-[#fff]">
                <div className="py-[14px] z-[10000]">
                    <div className="px-2 flex items-center">
                        <div className="flex-1 flex rounded-[999px] p-[3px] bg-[hsla(0,0%,100%,0.1)]">
                            <div
                                onClick={() => setIsTabBar((prev) => !prev)}
                                className={`py-[5px] hover:text-[#fff] ${!isTabBar && "bg-[hsla(0,0%,100%,0.3)] text-[#fff]"
                                    } text-[#dadada] cursor-pointer rounded-[999px] flex-grow flex items-center justify-center`}
                            >
                                <h6 className="text-[12.5px] font-medium font-family-cusstom">
                                    Danh sách phát
                                </h6>
                            </div>
                            <div
                                onClick={() => setIsTabBar((prev) => !prev)}
                                className={`py-[5px] hover:text-[#fff] ${isTabBar && "bg-[hsla(0,0%,100%,0.3)] text-[#fff]"
                                    } text-[#dadada] cursor-pointer rounded-[999px] flex-grow flex items-center justify-center`}
                            >
                                <h6 className="text-[12.5px] font-normal font-family-cusstom">
                                    Nghe gần đây
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <Scrollbar
                    thumbYProps={{
                        style: {
                            backgroundColor: "hsla(0,0%,100%,0.3)",
                            width: "5px",
                        },
                    }}
                    trackYProps={{
                        style:{
                            width:"5px",
                            marginRight:"4px",
                            backgroundColor:'transparent'
                        }
                    }}
                    style={{ width: "100%", height: "100%" }}
                >
                    <div className="px-2 w-full relative h-full">
                        {listStateSong.pre?.map((item) => (
                            <SongItemSlideBarRight
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                thumbnail={item.thumbnail}
                                artist={item.artist}
                                handlUpdataCurSong={handlUpdataCurSong}
                                isOpacity
                            />
                        ))}

                        {listStateSong.pre?.concat(listStateSong.next).length > 1
                            ? <div
                                ref={ref}
                                className={`pt-4 pr-2 pb-1 pl-2 sticky ${listStateSong.pre?.some(item => item.id === currunSongId) ? 'top-[55px]' : 'top-[-1px]'} bg-[#120822] z-10`}>
                                <h3 className="text-[14px] font-semibold transform-none text-white">
                                    Tiếp theo
                                </h3>
                                {musicSection.section !== musicSections.ARTIST_SONGS
                                ?
                                <h3 className="flex text-[rgba(254,255,255,0.6)] font-normal">
                                    <span className="flex-shrink-0">Từ playList</span>
                                    <Link
                                        to={title?.link}
                                        className="flex-1 ml-1 inline-block max-w-[295px] overflow-hidden whitespace-pre text-ellipsis font-medium text-[#c273ed]">
                                        {title?.name}
                                    </Link>
                                </h3>
                                :""}
                            </div>
                            : ""}

                        {listStateSong.next?.map((item) => (
                            <SongItemSlideBarRight
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                thumbnail={item.thumbnail}
                                artist={item.artist}
                                handlUpdataCurSong={handlUpdataCurSong}
                            />
                        ))}
                    </div>
                </Scrollbar>
            </div>
        </div>
    );
};
export default SlideBarRight;
