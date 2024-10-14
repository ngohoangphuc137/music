/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from 'react-responsive'

import AlbumServicer from "~/services/albumServicer";
import Icons from "~/components/icons";
import { setPlay, setCurSong } from "~/state/actions/song";
import TableListSong from "./tableListSong";
import { setTitleKey, setSection, setSongDataSlideBarRight, setIsSlidebarRight, setTemporaryDataRight } from "~/state/actions/song";
import musicSections from "~/utils/musicSections";
import AlbumTitleSkeleton from "~/components/skeleton/albumTitleSkeleton";
import SongSkeleton from "~/components/skeleton/songSkeleton";
import { userFavourite } from "~/services/authServicer";
import { toast } from "react-toastify";
import { setFavouritePlaylist, setFavouritePlaylistRemove } from "~/state/actions/user";

const { FaPlay, IoMdHeartEmpty, RxDotsHorizontal, IoIosPause, RiLoader2Line, IoMdHeart } = Icons;
const AlbumLayout = () => {
  const { title, id } = useParams();
  const dispatch = useDispatch();
  const [playList, setPlaylist] = useState(null);
  const [totalFavourited, setTotalFavourited] = useState(0)
  const { currunSongId, isPlay, loader } = useSelector((state) => state.song);
  const { info_user, bearer_token } = useSelector(
    (state) => state.user
  );
  const [songExits, setSongExits] = useState(false);
  const [loading, setloading] = useState(false);
  const isTitleAlbum = useMediaQuery({ query: '(max-width:558px)' })
  const maxW768 = useMediaQuery({ query: '(max-width:768px)' })

  useEffect(() => {
    const detailPlayList = async () => {
      const response = await AlbumServicer(id);
      if (response.status === 200) {
        setloading(true)
        setPlaylist(response.data.data);
        setTotalFavourited(response.data.data.totalFavourited)
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
      }
    };
    detailPlayList();
    setloading(false)
  }, [id]);
  useEffect(() => {
    const arrayIdSong = playList?.song.map((item) => item.id);
    const checkIdExit = arrayIdSong?.some(
      (arrayIdSong) => arrayIdSong === currunSongId
    );
    if (checkIdExit) setSongExits(true);
  }, [currunSongId]);

  const handlPlayMusicRandom = () => {
    const arrayIdSong = playList?.song.map((item) => item.id);
    const randomIdSong = Math.floor(Math.random() * playList?.song.length);
    if (songExits) {
      dispatch(setIsSlidebarRight(false))
      isPlay ? dispatch(setPlay(false)) : dispatch(setPlay(true));
    } else {
      setSongExits(true);
      dispatch(setCurSong(arrayIdSong[randomIdSong]));
      dispatch(setPlay(true));
      dispatch(setIsSlidebarRight(true))
      dispatch(setTitleKey(playList?.title, `/album/${title}/${id}`))
      dispatch(setSongDataSlideBarRight(playList?.song))
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
        setTotalFavourited(response.data.data.totalFavourite)
      } else {
        toast.success("Lỗi server!");
      }
    } else {
      toast.warning("Bạn cần đăng nhập tài khoản!");
    }
  }

  return (
    <div className={`lg:px-[59px] sm:px-[20px] min-[300px]:px-3 ${maxW768 ? 'relative h-[calc(100vh-135px-60px)]' : 'absolute mt-[70px]'} inset-0`}>
      <div className="text-[#fff] pt-5">
        <div>
          {loading ? (
            <div>
              <div className={`w-full flex ${maxW768 ? 'pb-2' : 'py-7'}`}>
                <div
                  className={
                    isPlay && songExits === true
                      ? "mr-5 relative active-song group overflow-hidden rounded-[5px]"
                      : "mr-5 relative group overflow-hidden rounded-[5px]"
                  }
                >
                  {/* active-song */}
                  <figure className="thumnail-album-title lg:w-[200px] lg:h-[200px] md:w-[150px] md:h-[150px] sm:w-[150px] sm:h-[150px]  overflow-hidden rounded-[5px] leading-[0] relative">
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
                        onClick={() => handlPlayMusicRandom()}
                        className="rounded-[50%] border-[#ffff] border-[1px] mx-5 border-solid flex items-start justify-center"
                      >
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

                <div className="flex flex-col items-start self-start content-between flex-grow flex-shrink">
                  <div>
                    <h3 className="text-[20px] font-bold leading-[1.5] ">
                      {playList?.title}
                    </h3>
                    <div className="text-color-custom">
                      {playList?.isAlbum
                        ? playList?.artist
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
                      {totalFavourited} người theo dõi
                    </div>
                    {!maxW768 && (
                      <div className="flex items-center mt-4">
                        <button
                          onClick={() => handlPlayMusicRandom()}
                          className={`flex items-center content-center mr-3 bg-[#9b4de0]  text-[#fff] rounded-3xl ${maxW768 ? 'text-[14px]' : 'text-[16px]'}`}
                        >
                          {isPlay && songExits ? (
                            <span className="flex items-center justify-center px-[33.5px] py-[1.5px]">
                              <IoIosPause size={18} className="m-2" />
                              Tạm dừng
                            </span>
                          ) : (
                            <span className="flex items-center content-center px-6 py-[2.5px]">
                              <FaPlay size={16} className="m-2 pl-[5px]" />{" "}
                              {songExits ? "Tiếp tục phát" : "Phát ngẫu nhiên"}
                            </span>
                          )}
                        </button>

                        <button
                          onClick={() => handlToggleFavourite(id)}
                          className="mr-3 flex items-center justify-center rounded-[50%] w-[35px] h-[35px] bg-[hsla(0,0%,100%,0.1)]">
                          {info_user.favouritePlaylists.includes(+id) ? (<IoMdHeart className="text-[#9b4de0]" size={20} />) : (<IoMdHeartEmpty size={20} />)}
                        </button>

                        <button className="mr-3 flex items-center justify-center rounded-[50%] w-[35px] h-[35px] bg-[hsla(0,0%,100%,0.1)]">
                          <RxDotsHorizontal size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>


              </div>
              <>
                {maxW768 && (
                  <div className="mb-5 w-4/5 mt-2 m-auto flex justify-between items-center">
                    <button
                      onClick={() => handlToggleFavourite(id)}
                      className="mr-3 flex items-center justify-center rounded-[50%] w-[35px] h-[35px] bg-[hsla(0,0%,100%,0.1)]">
                      {info_user.favouritePlaylists.includes(+id) ? (<IoMdHeart className="text-[#9b4de0]" size={20} />) : (<IoMdHeartEmpty size={20} />)}
                    </button>

                    <button
                      onClick={() => handlPlayMusicRandom()}
                      className={`flex items-center content-center mr-3 bg-[#9b4de0]  text-[#fff] rounded-3xl ${maxW768 ? 'text-[14px]' : 'text-[16px]'}`}
                    >
                      {isPlay && songExits ? (
                        <span className="flex items-center justify-center px-[30.5px] py-[1.5px]">
                          <IoIosPause size={18} className="m-2" />
                          Tạm dừng
                        </span>
                      ) : (
                        <span className="flex items-center content-center px-4 py-[2.5px]">
                          <FaPlay size={16} className="m-2 pl-[5px]" />{" "}
                          {songExits ? "Tiếp tục phát" : "Phát ngẫu nhiên"}
                        </span>
                      )}
                    </button>

                    <button className="mr-3 flex items-center justify-center rounded-[50%] w-[35px] h-[35px] bg-[hsla(0,0%,100%,0.1)]">
                      <RxDotsHorizontal size={20} />
                    </button>
                  </div>
                )}
              </>
            </div>
          ) : (<AlbumTitleSkeleton />)}


          {/* TableListSong */}
          {loading ? (<TableListSong playList={playList} />) : (<div className="mt-5" ><SongSkeleton count={10} /></div>)}
        </div>
      </div>
    </div>
  );
};
export default AlbumLayout;
