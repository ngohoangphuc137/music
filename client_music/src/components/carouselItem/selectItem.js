import { Link } from "react-router-dom";
import HeadlessTippy from "@tippyjs/react/headless";
import { memo, useRef } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react"

import Icons from "../icons";
import convertTime from "~/utils/convertTime";
import ItemSeemore from "./itemSeeMore";

const { LuMusic, IoMdHeartEmpty, RxDotsHorizontal, FaPlay, RiLoader2Line } = Icons;

const SelectItem = memo(
  ({
    id,
    isLuMusic,
    album,
    name,
    thumbnail,
    thumbnailAlbum,
    duration,
    artist,
    composers,
    genre,
    totalListens,
    totalFavourited,
    isAlbum,
    Themecontext
  }) => {
    const myRef = useRef();
    const refItemSeeMore = useRef()
    const { loader } = useSelector((state) => state.song);
    const [handlPlayMusic, handlSeeMore, isPlay, seeMore, currunSongId] = useContext(Themecontext)

    return (
      <div
        className={
          currunSongId === id
            ? "SelectItem active-song rounded-[5px]"
            : "SelectItem hover:bg-active-bg rounded-[5px]"
        }
      >
        <div
          className={
            seeMore === false
              ? ""
              : myRef?.current?.contains(seeMore) || refItemSeeMore?.current?.contains(seeMore)
                ? "active-song rounded-[5px]"
                : ""
          }
        >
          <div className="flex items-center justify-center p-[10px] rounded-[5px] select-none group">
            <div className="flex items-center w-[50%] mr-[10px]">
              {isLuMusic
                ?
                <div className="text-[hsla(0,0%,100%,0.5)] mr-2">
                  <LuMusic />
                </div>
                : ""
              }
              <div className="mr-[10px] relative block rounded-[4px] cursor-pointer">
                <figure className="w-[40px] h-[40px]">
                  <img
                    className="w-[100%] h-auto rounded-[4px]"
                    src={isAlbum ? thumbnailAlbum : thumbnail}
                    alt=""
                  />
                </figure>
                <div className="opacity absolute w-[100%] h-[100%] rounded-[4px] group-hover:bg-[rgba(0,0,0,0.5)] top-0 left-0 z-0"></div>
                <div className="actionPlaying rounded-[4px] absolute hidden group-hover:block top-0 left-0 right-0 bottom-0 z-[2]">
                  <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <button
                      onClick={() => handlPlayMusic(id) }
                    >
                      {
                        isPlay && currunSongId === id ? (
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
              <div className="w-[75%] flex flex-col">
                <div className="text-sm font-medium leading-[1.3] max-w-[100%] inline-block overflow-hidden whitespace-pre text-ellipsis">{name}</div>
                <h3 className="text-[hsla(0,0%,100%,0.5)] leading-[1.3] text-[14px] mt-[2.5px] items-center max-w-[100%] inline-block overflow-hidden whitespace-pre text-ellipsis">
                  {artist?.map((item) => (
                      <Link
                        key={item.id}
                        to={'/nghe-si/'+item.alias}
                        className="hover:underline hover:text-[#c273ed]"
                      >
                        {item.name}
                      </Link>
                    ))
                    .reduce((prev, curr) => [prev, ", ", curr])}
                </h3>
              </div>
            </div>
            <div className="flex-auto flex-grow flex-shrink text-left self-center w-0 ml-[-10px]">
              <div className="text-[hsla(0,0%,100%,0.5)] text-[15px] flex items-center">
                {album !== null ? (
                  !isAlbum || !isLuMusic ? (
                    <Link
                      to={"/album/" + album?.aliasTitle + "/" + album?.id}
                      className="hover:underline hover:text-[#c273ed] max-w-[100%] inline-block cursor-pointer overflow-hidden whitespace-pre text-ellipsis"
                    >
                      {album?.title}
                    </Link>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
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
                        <div ref={refItemSeeMore} onMouseDown={() => handlSeeMore(myRef)} className="w-auto" tabIndex="-1" {...attrs}>
                          <ItemSeemore id={id} name={name} artist={artist} composers={composers} genre={genre} image={thumbnail} totalListens={totalListens} totalFavourited={totalFavourited} />
                        </div>
                      )}
                    >
                      <button
                        ref={myRef}
                        onMouseDown={() => handlSeeMore(myRef)}
                        id={"song_" + id}
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
                    {convertTime(duration)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
export default SelectItem;
