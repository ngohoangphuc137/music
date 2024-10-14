/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import HeadlessTippy from "@tippyjs/react/headless";
import { useMediaQuery } from 'react-responsive'

import { infoSong } from "~/services/musicServicer";
import { postRecentlyServiver } from "~/services/authServicer";

import Icons from "~/components/icons";
import {
  setPlay,
  setLoader,
  setSonginfo,
  setIsSlidebarRight,
  setCurSong,
  setSongChanged,
  setIsShuffle,
  setIsRepeat,
  setRecentlyHeard
} from "~/state/actions/song";
import { useDebounce } from "~/hooks";
import { toggleSlideBarRight } from "~/state/actions/home";
import convertTime from "~/utils/convertTime";
import ItemNextSong from "~/components/carouselItem/itemNextSong";

const {
  //IoMdHeart,
  IoMdHeartEmpty,
  RxDotsHorizontal,
  PiShuffle,
  MdSkipPrevious,
  FaPlay,
  MdSkipNext,
  CiRepeat,
  IoVolumeMedium,
  BsMusicNoteList,
  IoIosPause,
  RiLoader2Line,
} = Icons;
var interval;
const Player = () => {
  const dispatch = useDispatch();
  const thumbRef = useRef();
  const volumeRef = useRef();
  const [audio, setAudio] = useState(new Audio());
  const [currTime, setCurrTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [countRepeat, setCountRepeat] = useState(0);
  const {
    currunSongId,
    isPlay,
    loader,
    songInfo,
    listStateSong,
    songChanged,
    isShuffle,
    isRepeat,
  } = useSelector((state) => state.song);
  const { slideBarRight } = useSelector((state) => state.home);
  const { bearer_token } = useSelector((state) => state.user);
  const debounce = useDebounce(songInfo, 750);
  const isActionPlay = useMediaQuery({ query: '(max-width:768px)' })

  useEffect(() => {
    thumbRef.current.value = 0;
    audio.muted = true;
    setCurrTime(0)
    setProgress(0)
    interval && clearInterval(interval)
    const detaiSong = async () => {
      dispatch(setLoader(false));
      audio.currentTime = 0;
      if (currunSongId !== null) {
        const info = await infoSong(currunSongId);
        if (info.status === 200) {
          setIsDragging(true);
          dispatch(setSonginfo(info.data.data));
        }
      }
    };
    if (currTime >= +songInfo?.duration / 2) recentlyHeard(currunSongId, songInfo)
    if (currunSongId !== null && currunSongId !== songInfo?.id) detaiSong();
  }, [currunSongId]);

  useEffect(() => {
    const detaiSong = async () => {
      if (currunSongId !== null && songInfo?.audio_file) {
        setAudio(new Audio(process.env.REACT_APP_API_URL_S3 + songInfo.audio_file));
        //audio.pause();
        audio.load();
      }
    };
    detaiSong();
  }, [debounce]);

  useEffect(() => {
    // audio.pause();
    //audio.load();
    audio.muted = false;
    if (isPlay && audio.currentTime === 0 && audio.paused) {
      audio.play();
    }
    setIsDragging(false);
    dispatch(setLoader(true));
  }, [audio]);

  useEffect(() => {

    if (audio.src === undefined) return;
    if (!songChanged && audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA)

      isPlay ? audio.play() : audio.pause();
  }, [isPlay]);

  const setProgress = (progressData, flag = false, currValue = null) => {
    thumbRef.current.style.background = `linear-gradient(
      to right, 
      #fff 0%, 
      #fff ${progressData}%, 
      hsla(0,0%,100%,0.3) ${progressData}%,
      hsla(0,0%,100%,0.3) 100%
    )`;
    thumbRef.current.value = !flag ? progressData : currValue;
  };

  const playNextSong = () => {
    if (listStateSong.next?.length > 0) {
      dispatch(setCurSong(listStateSong.next[0].id));
      dispatch(setPlay(true));
      dispatch(setSongChanged(true));
      dispatch(setIsSlidebarRight(false));
    } else {
      dispatch(setPlay(false));
      audio.pause();
    }
  };

  const recentlyHeard = async (currunSongId, songInfo) => {
    if (bearer_token === null) {
      const { id, name, thumbnail, artist, alias } = songInfo
      const dataSong = { id, name, thumbnail, artist, alias }
      dispatch(setRecentlyHeard(dataSong))
    } else {
      await postRecentlyServiver(bearer_token, currunSongId)
    }

  }

  const updateTime = () => {
    setCurrTime(audio.currentTime);
    const percent = (audio.currentTime / songInfo?.duration) * 100;
    setProgress(percent);

    if (Math.floor(audio.currentTime) === Math.floor(+songInfo?.duration)) {
      audio.muted = true
      recentlyHeard(currunSongId, songInfo)
      if (isRepeat) {
        if (countRepeat >= 1) {
          playNextSong();
          setCountRepeat(0)
        } else {
          setCountRepeat(countRepeat + 1)
        }
      } else {
        playNextSong();
      }

      setCurrTime(0);
      audio.currentTime = 0;
      setProgress(0);
      interval && clearInterval(interval);
    }
  };

  useEffect(() => {
    if (isPlay) {
      if (!isDragging) {
        interval = setInterval(() => {
          updateTime();
        }, 400);
      } else {
        interval && clearInterval(interval);
      }
    } else {
      interval && clearInterval(interval);
    }
    return () => interval && clearInterval(interval);
  }, [audio, isDragging, isPlay, countRepeat]);

  const hanldToggleSong = async () => {
    dispatch(setIsSlidebarRight(false));
    if (isPlay) {
      dispatch(setSongChanged(false));
      dispatch(setPlay(false));
    } else {
      dispatch(setSongChanged(false));
      dispatch(setPlay(true));
    }
  };
  const hanldToggleSlideRight = () => {
    dispatch(toggleSlideBarRight(!slideBarRight));
  };

  const handlNextSong = () => {
    dispatch(setCurSong(listStateSong.next[0].id));
    dispatch(setPlay(true));
    dispatch(setSongChanged(false));
    dispatch(setIsSlidebarRight(false));
  };
  const handlPreSong = () => {
    const lengthListSong = listStateSong.pre?.length - 1;
    const song = listStateSong.pre[lengthListSong - 1];
    dispatch(setCurSong(song.id));
    dispatch(setSongChanged(false));
    dispatch(setPlay(true));
    dispatch(setIsSlidebarRight(false));
  };

  const handlMouseUpDragging = (e) => {
    setIsDragging(false);
    audio.currentTime = (e.target.value / e.target.max) * songInfo.duration;
  };

  const handlCalcValue = (e) => {
    const percent = (e.target.value / e.target.max) * 100;
    const updataTimeBar = (e.target.value / e.target.max) * songInfo.duration;
    setCurrTime(updataTimeBar);
    setIsDragging(true);
    setProgress(percent, true, e.target.value);
  };
  const handlVolume = (e) => {
    const getVolume = (e.target.value / e.target.max) * 1;
    volumeRef.current.style.background = `linear-gradient(
      to right, 
      #fff 0%, 
      #fff ${(e.target.value / e.target.max) * 100}%, 
      hsla(0,0%,100%,0.3) ${(e.target.value / e.target.max) * 100}%,
      hsla(0,0%,100%,0.3) 100%
    )`;
    volumeRef.current.value = getVolume * e.target.max;
    audio.volume = getVolume;
  };

  const handlShuffleMusic = () => {
    dispatch(setIsShuffle(!isShuffle));
    isShuffle
      ? dispatch(setIsSlidebarRight(false))
      : dispatch(setIsSlidebarRight(true));
  };
  const handlRepeat = () => {
    dispatch(setIsRepeat(!isRepeat));
  };

  return (
    <div className="fixed bottom-0 w-[100%] z-[2] cursor-pointer bg-[#170f23]">
      <div className={`flex items-center justify-between ${isActionPlay ? 'w-full px-[10px] h-[65px]' : 'min-w-[768px] px-[20px] h-[85px]'} active-bg border-t-[1px] border-solid border-custom-border-top text-[#faf6f6]`}>
        <div className={isActionPlay ? 'w-[50%]' : 'w-[30%]'}>
          <div className="flex items-center grid-cols-4">
            <div className="mr-[10px]">
              <div className="max-[825px]:hidden">
                <div className="w-[64px] h-[64px] rounded-[4px] overflow-hidden">
                  <img
                    className="w-[100%] h-auto"
                    src={songInfo?.thumbnail}
                    alt=""
                  ></img>
                </div>
              </div>
            </div>
            <div className={`${isActionPlay ? 'max-w-[85%]' : 'max-w-[55%]'}`}>
              <div className="pr-[10px] w-[100%] inline-block overflow-hidden whitespace-pre text-ellipsis">
                <a href="/">
                  <span className="text-[15px] font-medium leading-[1.36] overflow-visible">
                    {songInfo?.name}
                  </span>
                </a>
              </div>
              <h3 className="text-[13.5px] w-[100%] text-color-custom inline-block overflow-hidden whitespace-pre text-ellipsis">
                {songInfo?.artist
                  .map((artist) => (
                    <Link
                      key={artist.id}
                      className="hover:text-[#c273ed] hover:underline"
                      to={`/nghe-si/${artist.alias}`}
                    >
                      {artist.name}
                    </Link>
                  ))
                  .reduce((prev, curr) => [prev, ", ", curr])}
              </h3>
            </div>
            <div className="w-auto ml-[12px]">
              <div className="flex items-center content-center">
                <div>
                  <Tippy content="Thêm vào thư viện" arrow={true}>
                    <button className="mx-[3px] p-1 hover:bg-active-bg rounded-[50%] flex items-center justify-center">
                      <IoMdHeartEmpty size={18} className="m-[3px]" />
                    </button>
                  </Tippy>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isActionPlay && (
          <div className="max-w-[40vw] flex justify-center">
            <div className="w-auto flex items-center flex-col">
              <div className="flex items-center content-center">
                <Tippy
                  content={
                    !isShuffle ? "Bật phát ngẫu nhiên" : "Tắt phát ngẫu nhiên"
                  }
                >
                  <button
                    onClick={handlShuffleMusic}
                    className="mx-[7px] hover:bg-active-bg rounded-[50%] p-1 border-none"
                  >
                    <PiShuffle
                      className={`m-[3px] ${isShuffle ? "text-[#c273ed]" : ""}`}
                      size={20}
                    />
                  </button>
                </Tippy>
                <button
                  onClick={() => {
                    if (listStateSong.pre?.length > 1) handlPreSong();
                  }}
                  className={`mx-[7px] hover:bg-active-bg ${listStateSong.pre?.length < 2 ? "cursor-not-allowed" : ""
                    } rounded-[50%] p-[0.20rem] border-none`}
                >
                  <MdSkipPrevious
                    className={`m-[3px] ${listStateSong.pre?.length < 2 ? "text-[#7e7b7b]" : ""
                      }`}
                    size={20}
                  />
                </button>
                <button
                  className="mx-[7px]  border border-white border-solid rounded-[50%] p-1"
                  onClick={() => {
                    if (loader) hanldToggleSong();
                  }}
                >
                  {loader ? (
                    isPlay ? (
                      <IoIosPause className="p-[1px]" size={20} />
                    ) : (
                      <FaPlay className="p-[3.5px]" size={20} />
                    )
                  ) : (
                    <RiLoader2Line size={20} className="loaderSong" />
                  )}
                </button>
                <span>
                  <HeadlessTippy
                    interactive="false"
                    render={(attrs) => (
                      <div className="box" tabIndex="-1" {...attrs}>
                        <ItemNextSong dataNext={listStateSong.next} />
                      </div>
                    )}
                  >
                    <button
                      onClick={() => {
                        if (listStateSong.next?.length >= 1) handlNextSong();
                      }}
                      className={`mx-[7px] hover:bg-active-bg ${listStateSong.next?.length < 1 ? "cursor-not-allowed" : ""
                        } rounded-[50%] p-[0.20rem] border-none`}
                    >
                      <MdSkipNext
                        className={`m-[3px] ${listStateSong.next?.length < 1 ? "text-[#7e7b7b]" : ""
                          }`}
                        size={20}
                      />
                    </button>
                  </HeadlessTippy>
                </span>

                <Tippy content={isRepeat ? "Tắt phát lại" : "Bật phát lại"}>
                  <button
                    onClick={handlRepeat}
                    className="mx-[7px] hover:bg-active-bg rounded-[50%] p-1 border-none"
                  >
                    <CiRepeat
                      className={`m-[3px] ${isRepeat ? "text-[#c273ed]" : ""}`}
                      size={20}
                    />
                  </button>
                </Tippy>
              </div>
              <div className="flex items-center content-center group">
                <span className="pr-2 text-[hsla(0,0%,100%,0.3)]">
                  {convertTime(currTime)}
                </span>
                <input
                  ref={thumbRef}
                  onInput={(e) => handlCalcValue(e)}
                  onMouseUp={(e) => handlMouseUpDragging(e)}
                  min={0}
                  max={100}
                  type="range"
                  className="slider-bar w-[25vw] group:h-[5px] cursor-pointer h-1 range-sm appearance-none rounded bg-[hsla(0,0%,100%,0.3)]"
                />
                <span className="pl-2">{convertTime(songInfo?.duration)}</span>
              </div>
            </div>
          </div>
        )}

        <div className={`${isActionPlay ? 'w-[50%]' : 'w-[30%]'} justify-end flex items-center`}>
          {!isActionPlay && (
            <div className="flex items-center justify-end">
              <button>
                <IoVolumeMedium />
              </button>
              <input
                ref={volumeRef}
                onInput={(e) => handlVolume(e)}
                type="range"
                min={0}
                max={10}
                className="volume w-[5rem] appearance-none rounded  h-[4px]"
              />
            </div>
          )}
          <div className={`w-auto ${isActionPlay ? 'hidden' : ''}`}>
            <div className="h-[33px] w-[1px] mx-[20px] bg-border-player"></div>
          </div>

          <div>
            <Tippy content="Danh sách phát">
              <button
                onClick={() => hanldToggleSlideRight()}
                className={
                  slideBarRight
                    ? "bg-[#9b4de0] rounded-[4px]"
                    : "bg-[hsla(0,0%,100%,.1)] rounded-[4px]"
                }
              >
                <BsMusicNoteList className="mx-[7px] my-2" size={16} />
              </button>
            </Tippy>
          </div>
        </div>
      </div>
      {isActionPlay && (
        <div className="w-full flex justify-center text-white">
          <div className={`${isActionPlay ? 'w-full' : 'w-auto'} flex items-center flex-col`}>
            <div className={`flex items-center content-center group ${isActionPlay ? 'w-full px-[10px]' : ''}`}>
              <span className="pr-2 text-[hsla(0,0%,100%,0.3)]">
                {convertTime(currTime)}
              </span>
              <input
                ref={thumbRef}
                onInput={(e) => handlCalcValue(e)}
                onMouseUp={(e) => handlMouseUpDragging(e)}
                min={0}
                max={100}
                type="range"
                className={`slider-bar ${isActionPlay ? 'w-full' : 'w-[25vw]'} group:h-[5px] cursor-pointer h-1 range-sm appearance-none rounded bg-[hsla(0,0%,100%,0.3)]`}
              />
              <span className="pl-2">{convertTime(songInfo?.duration)}</span>
            </div>
            <div className={`flex items-center content-center ${isActionPlay ? 'pb-3' : ''}`}>
              <Tippy
                content={
                  !isShuffle ? "Bật phát ngẫu nhiên" : "Tắt phát ngẫu nhiên"
                }
              >
                <button
                  onClick={handlShuffleMusic}
                  className="mx-[7px] hover:bg-active-bg rounded-[50%] p-1 border-none"
                >
                  <PiShuffle
                    className={`m-[3px] ${isShuffle ? "text-[#c273ed]" : ""}`}
                    size={20}
                  />
                </button>
              </Tippy>
              <button
                onClick={() => {
                  if (listStateSong.pre?.length > 1) handlPreSong();
                }}
                className={`mx-[7px] hover:bg-active-bg ${listStateSong.pre?.length < 2 ? "cursor-not-allowed" : ""
                  } rounded-[50%] p-[0.20rem] border-none`}
              >
                <MdSkipPrevious
                  className={`m-[3px] ${listStateSong.pre?.length < 2 ? "text-[#7e7b7b]" : ""
                    }`}
                  size={20}
                />
              </button>
              <button
                className="mx-[7px]  border border-white border-solid rounded-[50%] p-1"
                onClick={() => {
                  if (loader) hanldToggleSong();
                }}
              >
                {loader ? (
                  isPlay ? (
                    <IoIosPause className="p-[1px]" size={20} />
                  ) : (
                    <FaPlay className="p-[3.5px]" size={20} />
                  )
                ) : (
                  <RiLoader2Line size={20} className="loaderSong" />
                )}
              </button>
              <span>
                <HeadlessTippy
                  interactive="false"
                  render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                      <ItemNextSong dataNext={listStateSong.next} />
                    </div>
                  )}
                >
                  <button
                    onClick={() => {
                      if (listStateSong.next?.length >= 1) handlNextSong();
                    }}
                    className={`mx-[7px] hover:bg-active-bg ${listStateSong.next?.length < 1 ? "cursor-not-allowed" : ""
                      } rounded-[50%] p-[0.20rem] border-none`}
                  >
                    <MdSkipNext
                      className={`m-[3px] ${listStateSong.next?.length < 1 ? "text-[#7e7b7b]" : ""
                        }`}
                      size={20}
                    />
                  </button>
                </HeadlessTippy>
              </span>

              <Tippy content={isRepeat ? "Tắt phát lại" : "Bật phát lại"}>
                <button
                  onClick={handlRepeat}
                  className="mx-[7px] hover:bg-active-bg rounded-[50%] p-1 border-none"
                >
                  <CiRepeat
                    className={`m-[3px] ${isRepeat ? "text-[#c273ed]" : ""}`}
                    size={20}
                  />
                </button>
              </Tippy>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Player;
