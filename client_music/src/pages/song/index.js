import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import Icons from "~/components/icons"
import { infoSong } from "~/services/musicServicer"
import TableListSong from "../album/tableListSong"
import { setPlay, setCurSong,setIsSlidebarRight } from "~/state/actions/song"

const { IoMdHeartEmpty, RxDotsHorizontal, FaPlay, IoIosPause, RiLoader2Line } = Icons
const Song = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [song, setSong] = useState(null)
    const [songExits, setSongExits] = useState(false);
    const { currunSongId, isPlay, loader } = useSelector((state) => state.song);

    useEffect(() => {
        const getSong = async () => {
            const response = await infoSong(id)
            if (response.data.status === 200) {
                const songRes = response.data.data;
                if (response.data.data.album) {
                    navigate(`/album/${songRes.album?.aliasTitle}/${songRes.album?.id}`)
                } else {
                    setSong(songRes)
                }
            }
        }
        getSong()
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [id])

    const handlPlayMusic = (id) => {
        if (songExits) {
            isPlay ? dispatch(setPlay(false)) : dispatch(setPlay(true));
        } else {
            setSongExits(true);
            dispatch(setCurSong(id));
            dispatch(setPlay(true));
            dispatch(setIsSlidebarRight(false))   
        }
    };

    return (
            <div className="mt-[70px] px-[59px] absolute inset-0">
                <div className="text-[#fff] pt-5" >
                    <div>
                        <div className="w-full flex py-7">
                            <div
                                className={
                                    isPlay === true && currunSongId === song?.id
                                        ? "mr-5 relative active-song group overflow-hidden rounded-[5px]"
                                        : "mr-5 relative group overflow-hidden rounded-[5px]"
                                }
                            >
                                {/* active-song */}
                                <figure className="w-[200px] h-[200px] overflow-hidden rounded-[5px] leading-[0] relative">
                                    <img
                                        className="duration-[0.7s] ease-out group-hover:scale-[1.1]"
                                        src={song?.thumbnail}
                                        alt=""
                                    />
                                </figure>
                                <div className="absolute w-[100%] h-[100%] group-hover:bg-[rgba(0,0,0,0.5)] top-0 left-0 z-[8]"></div>
                                <div className="actionPlaying absolute items-center hidden group-hover:block group-hover:z-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                                    <div className="flex items-center content-center">
                                        <button
                                            onClick={() => handlPlayMusic(song?.id)}
                                            className="rounded-[50%] border-[#ffff] border-[1px] mx-5 border-solid flex items-start justify-center"
                                        >
                                            {loader || currunSongId === null ? (
                                                isPlay ? (
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

                            <div className="flex flex-col items-start self-start content-between flex-grow flex-shrink">
                                <div>
                                    <h3 className="text-[20px] font-bold leading-[1.5] ">
                                        {song?.name}
                                    </h3>
                                    <div className="text-color-custom">
                                        {song?.album?.isAlbum
                                            ? song?.artist
                                                .map((item) => (
                                                    <Link
                                                        to={"/nghe-si/" + item.alias}
                                                        className="text-color-custom text-[14px] hover:underline hover:text-[#c273ed]"
                                                        key={item.id}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))
                                                .reduce((prev, curr) => [prev, ", ", curr])
                                            : ""}
                                    </div>
                                    <div className="text-color-custom text-[14px]">
                                        {song?.totalFavourited} người yêu thích
                                    </div>
                                </div>
                                <div className="mt-5 flex items-center">
                                    <button
                                        onClick={() => handlPlayMusic(song?.id)}
                                        className="flex items-center content-center mr-3 bg-[#9b4de0]  text-[#fff] rounded-3xl text-[16px]"
                                    >
                                        {isPlay && currunSongId === song?.id ? (
                                            <span className="flex items-center justify-center px-[33.5px] py-[1.5px]">
                                                <IoIosPause size={18} className="m-2" />
                                                Tạm dừng
                                            </span>
                                        ) : (
                                            <span className="flex items-center content-center px-6 py-[2.5px]">
                                                <FaPlay size={16} className="m-2 pl-[5px]" />
                                                Phát bài hát
                                            </span>
                                        )}
                                    </button>
                                    <button className="mr-3 flex items-center justify-center rounded-[50%] w-[35px] h-[35px] bg-[hsla(0,0%,100%,0.1)]">
                                        <IoMdHeartEmpty size={20} />
                                    </button>
                                    <button className="mr-3 flex items-center justify-center rounded-[50%] w-[35px] h-[35px] bg-[hsla(0,0%,100%,0.1)]">
                                        <RxDotsHorizontal size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <TableListSong playList={song} isSong={true} />
                    </div>
                </div>
            </div>
    )
}
export default Song