import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

import Icons from "~/components/icons";
import NoSearchData from "~/components/searchItem/noSearchData";
import AlbumServicer from "~/services/albumServicer";
import { setTemporaryDataRight } from "~/state/actions/song";
import { setTitleKey, setIsShuffle } from "~/state/actions/song";
import { setSongDataSlideBarRight, setIsSlidebarRight, setPlay, setSection, setCurSong } from "~/state/actions/song";
import SelectItem from "~/components/carouselItem/selectItem";
import hocSong from "~/components/HOC/hocSong";
import AlbumTitleSkeleton from "~/components/skeleton/albumTitleSkeleton";
import musicSections from "~/utils/musicSections";
import SongSkeleton from "~/components/skeleton/songSkeleton";
import { userFavourite } from "~/services/authServicer";
import { toast } from "react-toastify";
import { setFavouritePlaylist, setFavouritePlaylistRemove } from "~/state/actions/user";

const { FaPlay, RiLoader2Line, IoIosPause, RiDiscLine, MdOutlineEdit, IoMdHeart, RxDotsHorizontal, IoMdHeartEmpty } = Icons;

const Playlist = ({ Context, handlRemoveToPlatlist }) => {
    const { title, id } = useParams();
    const dispatch = useDispatch();
    const { currunSongId, isPlay, loader } = useSelector((state) => state.song);
    const { info_user, bearer_token } = useSelector((state) => state.user);
    const [songExits, setSongExits] = useState(false);
    const [playList, setPlaylist] = useState(null);
    const [listPlayList, setListPlaylist] = useState([]);
    const [loading, setloading] = useState(false);
    const maxW768 = useMediaQuery({ query: '(max-width:768px)' })

    useEffect(() => {
        const detailPlayList = async () => {
            const response = await AlbumServicer(id);
            if (response.status === 200) {
                setloading(true)
                setPlaylist(response.data.data);
                setListPlaylist(response.data.data.song)
                const dataTemp = {
                    id: response.data.data.id,
                    title: response.data.data.title,
                    aliasTitle: response.data.data.aliasTitle,
                    song: response.data.data.song
                }
                dispatch(setTemporaryDataRight(dataTemp))
                const collection = response.data.data.song.map((item) => item.id);
                const checkSongId = collection.includes(currunSongId);
                checkSongId ? setSongExits(true) : setSongExits(false);
                dispatch(setTitleKey(response.data.data.title, `/playlist/${title}/${id}`))
            }
        };
        detailPlayList();
        setloading(false)
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [id]);

    const handResetPlaylist = (id) => {
        const list = listPlayList.filter(item => item.id !== id)
        dispatch(setSongDataSlideBarRight(list))
        dispatch(setIsShuffle(false))
        setListPlaylist(list)
    }
    const handlPlayMusicRandom = () => {
        const arrayIdSong = listPlayList.map((item) => item.id);
        const randomIdSong = Math.floor(Math.random() * listPlayList?.length);
        if (songExits) {
            dispatch(setIsSlidebarRight(false))
            isPlay ? dispatch(setPlay(false)) : dispatch(setPlay(true));
        } else {
            setSongExits(true);
            dispatch(setCurSong(arrayIdSong[randomIdSong]));
            dispatch(setPlay(true));
            dispatch(setIsSlidebarRight(true))
            dispatch(setTitleKey(playList?.title, `/album/${title}/${id}`))
            dispatch(setSongDataSlideBarRight(listPlayList))
            dispatch(setSection(id, musicSections.ALBUM))
        }
    };

    const handlToggleFavourite = async (id) => {
        if (bearer_token !== null) {
            const response = await userFavourite('playlist', id, bearer_token)
            if (response.data.status === 200) {
                if (response.data.data.favourited) {
                    dispatch(setFavouritePlaylist(+id))
                    toast.success(`Đã thêm ${playList?.isAlbum ? "album" : "playlist"} vào thư viện`);
                } else {
                    dispatch(setFavouritePlaylistRemove(+id))
                    toast.success(`Đã xoá ${playList?.isAlbum ? "album" : "playlist"} khỏi thư viện`);
                }
            } else {
                toast.success("Lỗi server!");
            }
        } else {
            toast.warning("Bạn cần đăng nhập tài khoản!");
        }
    }

    return (
        <div className={`lg:px-[59px] sm:px-[20px] min-[300px]:px-3  ${maxW768 ? 'relative h-[calc(100vh-135px-60px)]' : 'absolute mt-[60px] '} inset-0`}>
            {loading ? (
                <div className="text-[#fff] pt-5">
                    <div className={`w-full flex ${maxW768 ? 'py-0' : 'py-7'}`}>
                        <div className="mr-5 relative group overflow-hidden rounded-[5px]">
                            <figure className={`lg:w-[200px] lg:h-[200px] md:w-[150px] md:h-[150px] sm:w-[150px] sm:h-[150px] ${maxW768 ? 'h-[150px] w-[150px]' : ''} overflow-hidden rounded-[5px] leading-[0] relative`}>
                                <img
                                    className="duration-[0.7s] ease-out group-hover:scale-[1.1]"
                                    src={playList?.thumbnail}
                                    alt=""
                                />
                            </figure>
                            <div className="absolute w-[100%] h-[100%] group-hover:bg-[rgba(0,0,0,0.5)] top-0 left-0 z-[8]"></div>
                            <div className="actionPlaying absolute items-center hidden group-hover:block group-hover:z-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                                <div className="flex items-center content-center">
                                    <button
                                        onClick={() => {
                                            if (listPlayList.length > 0) handlPlayMusicRandom()
                                        }}
                                        className="rounded-[50%] border-[#ffff] border-[1px] mx-5 border-solid flex items-start justify-center">
                                        {loader || currunSongId === null ? (
                                            isPlay && songExits ? (
                                                <i
                                                    className="inline-block w-6 h-6 bg-no-repeat bg-cover m-2 pl-[5px]"
                                                    style={{
                                                        backgroundImage: `url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif)`,
                                                    }}
                                                ></i>
                                            ) : (
                                                <FaPlay size={24} className="m-2 pl-[5px]" />
                                            )
                                        ) : (
                                            <RiLoader2Line size={24} className="loaderSong m-2" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-start self-start flex-grow flex-shrink">
                            <div>
                                <h3 className="text-[20px] font-bold leading-[1.5] flex items-center">{playList?.title}
                                    {info_user.createdPlaylists.some(item => item.id === playList?.id) ? <span className="pl-1 cursor-pointer"><MdOutlineEdit size={18} /></span> : ""}
                                </h3>

                                <div className="text-color-custom text-[13.5px] font-medium mt-2">
                                    Tạo bởi{" "}
                                    <span className="text-white font-medium">{playList?.userName}</span>
                                </div>
                            </div>
                            <div className="mt-10 flex items-center">
                                {listPlayList.length > 0 && (
                                    <button
                                        onClick={() => {
                                            if (listPlayList.length > 0) handlPlayMusicRandom()
                                        }}
                                        className={`flex items-center content-center mr-3 bg-[#9b4de0]  text-[#fff] rounded-3xl ${maxW768 ? 'text-[13px]' : 'text-[16px]'}`}>
                                        {isPlay && songExits ? (
                                            <span className={`flex items-center justify-center ${maxW768 ? 'px-[23.5px]' : 'px-[33.5px]'} py-[1.5px]`}>
                                                <IoIosPause size={18} className="m-2" />
                                                Tạm dừng
                                            </span>
                                        ) : (
                                            <span className={`flex items-center content-center ${maxW768 ? 'px-3' : 'px-6'} py-[2.5px]`}>
                                                <FaPlay size={16} className="m-2 pl-[5px]" />{" "}
                                                {songExits ? "Tiếp tục phát" : "Phát ngẫu nhiên"}
                                            </span>
                                        )}
                                    </button>
                                )}
                                {!info_user.createdPlaylists.some(item => item?.id === playList?.id) ? (
                                    <>
                                        <button
                                            onClick={() => handlToggleFavourite(id)}
                                            className="mr-3 flex items-center justify-center rounded-[50%] w-[35px] h-[35px] bg-[hsla(0,0%,100%,0.1)]">
                                            {info_user.favouritePlaylists.includes(+id) ? (<IoMdHeart className="text-[#9b4de0]" size={20} />) : (<IoMdHeartEmpty size={20} />)}
                                        </button>
                                        <button className="mr-3 flex items-center justify-center rounded-[50%] w-[35px] h-[35px] bg-[hsla(0,0%,100%,0.1)]">
                                            <RxDotsHorizontal size={20} />
                                        </button>
                                    </>
                                ) : ""}

                            </div>
                        </div>
                    </div>
                    {listPlayList.length <= 0
                        ? (<NoSearchData Icon={<RiDiscLine className="text-6xl" />} text={'Không có bài hát trong playlist của bạn'} />)
                        : (<div>
                            <div>
                                <div className="h-11 flex items-center justify-center p-[10px] rounded-[5px] border-b border-solid border-[hsla(0,0%,100%,0.05)]">
                                    <div className="flex-auto flex-shrink-0 flex-grow-0 w-[50%] ml-[10px]">
                                        <div>
                                            <div className="text-[14px] font-medium text-[hsla(0,0%,100%,0.5)]">
                                                Bài hát
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-auto flex-shrink flex-grow text-left self-center w-0 ml-[-10px]">
                                        {!maxW768 && (
                                            <div>
                                                <div className="text-[14px] font-medium text-[hsla(0,0%,100%,0.5)]">
                                                    ALBUM
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-auto flex-shrink-0 flex-grow-0 ml-[10px]">
                                        <div>
                                            <div className="text-[14px] font-medium text-[hsla(0,0%,100%,0.5)]">
                                                Thời lượng
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {listPlayList.map((item) => (
                                        <SelectItem
                                            key={item?.id}
                                            id={item?.id}
                                            isLuMusic={true}
                                            idPlaylist={playList?.id}
                                            album={item.album}
                                            name={item.name}
                                            thumbnail={item.thumbnail}
                                            thumbnailAlbum={playList?.thumbnail}
                                            duration={item.duration}
                                            artist={item.artist}
                                            composers={item.composers}
                                            genre={item.genre}
                                            totalListens={item.totalListens}
                                            totalFavourited={item.totalFavourited}
                                            isAlbum={playList?.isAlbum}
                                            Themecontext={Context}
                                            handResetPlaylist={handResetPlaylist}
                                            handlRemoveToPlatlist={handlRemoveToPlatlist}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>)
                    }

                </div>
            ) : (<><AlbumTitleSkeleton /> <div><SongSkeleton count={5} /></div></>)}
        </div>
    );
};
export default hocSong(Playlist, true, 'ALBUM');
