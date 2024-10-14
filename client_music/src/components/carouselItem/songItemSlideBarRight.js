import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Icons from "../icons";

const { FaPlay, RiLoader2Line } = Icons;

const SongItemSlideBarRight = ({
    id,
    name,
    thumbnail,
    artist,
    handlUpdataCurSong,
    isOpacity
}) => {
    const { currunSongId, isPlay, loader } = useSelector((state) => state.song);
    return (
        <div className={currunSongId === id ? "sticky top-[-0.5px] z-10" : ""}>
            <div
                className={`rounded-[4px] cursor-pointer ${currunSongId === id
                    ? "bg-[#9b4de0] active-slidebar-right"
                    : "hover:bg-border-player"
                    } group`}
            >
                <div className={`p-[8px] ${isOpacity && currunSongId !== id ? 'opacity-40 hover:opacity-[1]' : ''} flex items-center rounded-[5px] text-left select-none`}>
                    <div className="flex-grow flex-shrink flex w-[50%] mr-[10px]">
                        <div className="w-[40px] h-[40px] mr-[10px] cursor-pointer overflow-hidden rounded relative">
                            <figure className="w-[40px] h-[40px] bg-[hsla(0,0%,100%,0.1)]">
                                <img className="w-auto h-auto" src={thumbnail} alt="" />
                            </figure>
                            <div
                                className={`absolute w-[100%] h-[100%] ${currunSongId === id ? "bg-[rgba(0,0,0,0.5)]" : ""
                                    } group-hover:bg-[rgba(0,0,0,0.5)] top-0 left-0 z-0`}
                            ></div>
                            <div
                                onClick={() => handlUpdataCurSong(id)}
                                className="actionPlaying absolute hidden group-hover:block top-0 left-0 right-0 bottom-0 z-[2]"
                            >
                                <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                                    <button>
                                        {isPlay && currunSongId === id ? (
                                            loader ? (
                                                <i
                                                    className={`iconActiconPlay ${loader ? "" : "hidden"
                                                        } inline-block w-4 h-4 bg-no-repeat bg-cover m-2 pl-[5px]`}
                                                ></i>
                                            ) : (
                                                <RiLoader2Line size={24} className="loaderSong m-2" />
                                            )
                                        ) : (
                                            <FaPlay />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center">
                                <p
                                    className="block-ellipsis text-[14px] group-hover:inline-block 
                                group-hover:max-w-[160px] group-hover:overflow-hidden group-hover:text-ellipsis group-hover:whitespace-pre leading-[1.3] font-medium"
                                >
                                    {name}
                                </p>
                            </div>
                            <h3 className="text-[12px] text-color-custom mt-[3px]">
                                <p className="inline-block max-w-[150px] overflow-hidden whitespace-pre text-ellipsis">
                                    {artist
                                        .map((item) => (
                                            <Link
                                                key={item.id}
                                                to={"/nghe-si/" + item.alias}
                                                className="hover:underline hover:text-[#c273ed]"
                                            >
                                                {item.name}
                                            </Link>
                                        ))
                                        .reduce((prev, curr) => [prev, ", ", curr])}
                                </p>
                            </h3>
                        </div>
                    </div>
                    {/* <div className="hover-items hidden group-hover:block">
                        <div className="flex content-center">
                            <button className="font-normal p-[5.5px] rounded-[50%] hover:bg-active-bg">
                                <IoMdHeartEmpty size={17} />
                            </button>
                            <button className="p-[1.5px] mx-1 text-[15px] hover:bg-active-bg rounded-[50%]">
                                <RxDotsHorizontal className="p-[0.8px] m-1" size={17} />
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};
export default SongItemSlideBarRight;
