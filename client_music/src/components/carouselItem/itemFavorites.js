import { Link } from "react-router-dom"
import HeadlessTippy from "@tippyjs/react/headless";
import { useRef } from "react";
import { useDispatch } from "react-redux";

import Icons from "../icons"
import convertTime from "~/utils/convertTime"
import ItemSeemore from "~/components/carouselItem/itemSeeMore"
import { setIsSlidebarRight } from "~/state/actions/song";

const { MdHorizontalRule, FaPlay, IoMdHeartEmpty, RxDotsHorizontal, RiLoader2Line } = Icons
const ItemFavorites = ({ number, item, handlPlayMusic, isPlay, loader, currunSongId,selectSongId,handlSeeMore,seeMore }) => {
    const dispatch = useDispatch()
    const myRef = useRef();
    const refItemSeeMore = useRef()
    return (
        <div 
        className={
            selectSongId === item.id || currunSongId === item.id
              ? "SelectItem active-song rounded-[5px]"
              : "SelectItem hover:bg-active-bg rounded-[5px]"
          }>
            <div  className={
            seeMore === false
              ? ""
              : myRef?.current?.contains(seeMore) || refItemSeeMore?.current?.contains(seeMore)
                ? "active-song rounded-[5px]"
                : ""
          } >
                <div className="rounded flex items-center text-left p-2 group">
                    <div className="flex items-center w-[50%] mr-[10px] flex-auto flex-shrink-0 flex-grow-0">
                        <div className="text-[hsla(0,0%,100%,0.5)] mr-[15px] flex justify-center items-center text-[12px] font-bold">
                            <span className="min-w-12 number">{number}</span>
                            <div>
                                <MdHorizontalRule size={23} />
                            </div>
                        </div>
                        <div className="mr-[10px] relative block rounded-[4px] overflow-hidden cursor-pointer">
                            <figure className="w-[40px] h-[40px]">
                                <img
                                    className="w-[100%] h-auto"
                                    src={item.thumbnail}
                                    alt=""
                                />
                            </figure>
                            <div className="opacity absolute w-[100%] h-[100%] group-hover:bg-[rgba(0,0,0,0.5)] top-0 left-0 z-0"></div>
                            <div className="actionPlaying absolute hidden group-hover:block top-0 left-0 right-0 bottom-0 z-[2]">
                                <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                                    <button
                                        onClick={() =>{
                                            handlPlayMusic(item.id)
                                            dispatch(setIsSlidebarRight(false))
                                        }}
                                    >
                                        {
                                            isPlay && currunSongId === item.id ? (
                                                loader ? (
                                                    <i
                                                        className={`iconActiconPlay ${loader ? "" : "hidden"
                                                            } inline-block w-4 h-4 bg-no-repeat bg-cover m-2 pl-[5px]`}
                                                    ></i>
                                                ) : (
                                                    <RiLoader2Line
                                                        size={24}
                                                        className="loaderSong m-2"
                                                    />
                                                )
                                            ) : (
                                                <FaPlay />
                                            )
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium leading-[1.3]">{item.name}</div>
                            <h3 className="text-[hsla(0,0%,100%,0.5)] leading-[1.3] text-[14px] mt-[2.5px]">
                                {item.artist.map((item) => (
                                    <Link
                                        key={item.id}
                                        className="hover:underline hover:text-[#c273ed]"
                                        to={'/nghe-si/'+item.alias}
                                    >
                                        {item.name}
                                    </Link>
                                ))
                                    .reduce((prev, curr) => [prev, ", ", curr])}
                            </h3>
                        </div>
                    </div>
                    <div className="flex-auto flex-grow flex-shrink text-left self-center w-0 ml-[-10px]">
                        <div className="text-[hsla(0,0%,100%,0.5)] text-[15px] max-w-[100%]">
                            {item.album !== null ? (
                                <Link
                                    to={"/album/" + item.album.aliasTitle + "/" + item.album.id}
                                    className="hover:underline hover:text-[#c273ed] cursor-pointer"
                                >
                                    {item.album.title}
                                </Link>)
                                : ""}
                        </div>
                    </div>
                    <div className="ml-[10px] flex-auto flex-shrink flex-grow w-0">
                        <div className="hover-items hidden group-hover:block">
                            <div className="flex items-center justify-end">
                                <div className="flex items-center justify-end mr-1">
                                    <button className="font-normal p-[6.5px] rounded-[50%] hover:bg-active-bg">
                                        <IoMdHeartEmpty size={20} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-end ml-1">

                                <HeadlessTippy    
                      interactive="true"
                      trigger="click"
                      render={(attrs) => (
                        <div ref={refItemSeeMore} onMouseDown={() => handlSeeMore(myRef)}  className="w-auto" tabIndex="-1" {...attrs}>
                         <ItemSeemore  id={item.id} name={item.name} artist={item.artist} composers={item.composers} genre={item.genre} image={item.thumbnail} totalListens={item.totalListens} totalFavourited={item.totalFavourited} />
                        </div>
                      )}
                    >
                      <button
                        ref={myRef}
                        onMouseDown={() => handlSeeMore(myRef)}
                        id={"song_" + item.id}
                        className="font-normal p-[6.5px] rounded-[50%] hover:bg-active-bg"
                      >
                        <RxDotsHorizontal size={20} />
                      </button>
                    </HeadlessTippy>

                                </div>
                            </div>
                        </div>
                        <div className="active-item group-hover:hidden">
                            <div className="flex items-center justify-end">
                                <div className="text-[hsla(0,0%,100%,0.5)] text-[15px]">
                                    {convertTime(item.duration)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemFavorites