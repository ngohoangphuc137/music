/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

import { infoSong, linkSong } from "~/services/musicServicer";
import Icons from "~/components/icons";
import { setPlay } from "~/state/actions/song";
import { useDebounce } from "~/hooks";
import { setLoader } from "~/state/actions/song";

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

const Player = () => {
  const dispatch = useDispatch();
  const audioPlayer = useRef(new Audio())
  const { currunSongId, isPlay, loader } = useSelector((state) => state.song);
  const [songInfo, setSonginfo] = useState(null);
  const [source, setSource] = useState(null)
  const debounceInfo = useDebounce(currunSongId, 0)
  useEffect(() => {
    const detaiSong = async () => {
      dispatch(setLoader(false))
      audioPlayer.current.muted = true
      // audioPlayer.current.pause()
      audioPlayer.current.currentTime = 0
      if (currunSongId !== null) {
        const [info, linkMusic] = await Promise.all([
          infoSong(currunSongId),
          linkSong(currunSongId)
        ])
        if (info.status === 200) {
          setSonginfo(info.data.data);
        }
        if (linkMusic.status === 200) {
          setSource(linkMusic.data.data.linkSong)
        }
      }
    };
    detaiSong();
  }, [debounceInfo]);

  useEffect(() => {
    dispatch(setLoader(true))
    if (source === null) return
    audioPlayer.current.muted = false
    if (audioPlayer.current.src !== source) {
      audioPlayer.current.load()
      audioPlayer.current.src = source
    }
    if (isPlay) audioPlayer.current.play();
  }, [source])

  useEffect(() => {
    if (audioPlayer.current.src === source) {
      audioPlayer.current.muted = false
      isPlay ? audioPlayer.current.play() : audioPlayer.current.pause();
    } else {
      audioPlayer.current.muted = true
    }
  }, [isPlay]);

  const hanldToggleSong = async () => {
    if (isPlay) {
     // audioPlayer.current.pause();
      dispatch(setPlay(false));
    } else {
     // audioPlayer.current.play();
      dispatch(setPlay(true));
    }
  };

  return (
    <div className="fixed bottom-0 w-[100%] z-[2] cursor-pointer bg-[#170f23]">
      <div className="h-[85px] flex items-center justify-between min-w-[768px] px-[20px] active-bg border-t-[1px] border-solid border-custom-border-top text-[#faf6f6]">
        <div className="w-[30%]">
          <div className="flex items-center grid-cols-4">
            <div className="mr-[10px]">
              <a href="j/">
                <div className="w-[64px] h-[64px] rounded-[4px] overflow-hidden">
                  <img
                    className="w-[100%] h-auto"
                    src={songInfo?.thumbnail}
                    alt=""
                  ></img>
                </div>
              </a>
            </div>
            <div className="max-w-[155px]">
              <div className="pr-[10px]">
                <a href="/">
                  <span className="text-[15px] font-medium leading-[1.36] overflow-visible">
                    {songInfo?.name}
                  </span>
                </a>
              </div>
              <h3 className="text-[13.5px] text-color-custom">
                {songInfo?.artist
                  .map((artist) => (
                    <Link key={artist.id} to="/">
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
                <div>
                  <Tippy content="Xem thêm" arrow={true}>
                    <button className="mx-[3px] p-1 hover:bg-active-bg rounded-[50%] flex items-center justify-center">
                      <RxDotsHorizontal size={18} className="m-[3px]" />
                    </button>
                  </Tippy>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[40vw] flex justify-center">
          <div className="w-auto flex items-center flex-col">
            <div className="flex items-center content-center">
              <Tippy content="Bật phát ngẫu nhiên">
                <button className="mx-[7px] hover:bg-active-bg rounded-[50%] p-1 border-none">
                  <PiShuffle className="m-[3px]" size={20} />
                </button>
              </Tippy>
              <button className="mx-[7px] hover:bg-active-bg rounded-[50%] p-[0.20rem] border-none">
                <MdSkipPrevious className="m-[3px]" size={20} />
              </button>
              <button
                className="mx-[7px]  border border-white border-solid rounded-[50%] p-1"
                onClick={()=>{if(loader)hanldToggleSong()}}
              >
                {loader ? (isPlay ? (
                  <IoIosPause className="p-[1px]" size={20} />
                ) : (
                  <FaPlay className="p-[3.5px]" size={20} />
                )) : <RiLoader2Line size={20} className="loaderSong" />}

              </button>
              <button className="mx-[7px] hover:bg-active-bg rounded-[50%] p-[0.20rem] border-none">
                <MdSkipNext className="m-[3px]" size={20} />
              </button>
              <Tippy content="Bật phát lại">
                <button className="mx-[7px] hover:bg-active-bg rounded-[50%] p-1 border-none">
                  <CiRepeat className="m-[3px]" size={20} />
                </button>
              </Tippy>
            </div>
            <div className="flex items-center content-center">
              <span className="pr-2">00:00</span>
              <div className="flex items-center">
                <input
                  type="range"
                  min={0}
                  max={100}
                  className="w-[20vw] h-[4px]"
                />
              </div>
              <span className="pl-2">2:55</span>
            </div>
          </div>
        </div>
        <div className="w-[30%] flex items-center justify-end">
          <div className="flex items-center justify-end">
            <button>
              <IoVolumeMedium />
            </button>
            <input type="range" min={0} max={10} className="w-[5rem] h-[4px]" />
          </div>
          <div className="w-auto">
            <div className="h-[33px] w-[1px] mx-[20px] bg-border-player"></div>
          </div>
          <div>
            <button className="bg-[#9b4de0] rounded-[4px]">
              <BsMusicNoteList className="mx-[7px] my-2" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Player;
