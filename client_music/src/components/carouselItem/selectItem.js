import { Link } from "react-router-dom";
import HeadlessTippy from "@tippyjs/react/headless";
import { memo, useRef } from "react";
import { useSelector } from "react-redux";

import Icons from "../icons";
import convertTime from "~/utils/convertTime";
import ItemSeemore from "./itemSeeMore";
import { useContext } from "react"
import { Themecontext } from "~/pages/album/tableListSong"

const { LuMusic, IoMdHeartEmpty, RxDotsHorizontal, FaPlay, RiLoader2Line } =Icons;

const SelectItem = memo(
  ({
    id,
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
  }) => {
    const myRef = useRef();
    const refItemSeeMore = useRef()
    const { loader } = useSelector((state) => state.song);
    const [handlPlayMusic,handlSeeMore,isPlay,seeMore,currunSongId,selectSongId] = useContext(Themecontext)
    
    return (
      <div
        className={
          selectSongId === id || currunSongId === id
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
            <div className="flex items-center w-[50%] mr-[10px] flex-auto flex-shrink-0 flex-grow-0">
              <div className="text-[hsla(0,0%,100%,0.5)] mr-2">
                <LuMusic />
              </div>
              <div className="mr-[10px] relative block rounded-[4px] overflow-hidden cursor-pointer">
                <figure className="w-[40px] h-[40px]">
                  <img
                    className="w-[100%] h-auto"
                    src={isAlbum ? thumbnailAlbum : thumbnail}
                    alt=""
                  />
                </figure>
                <div className="opacity absolute w-[100%] h-[100%] group-hover:bg-[rgba(0,0,0,0.5)] top-0 left-0 z-0"></div>
                <div className="actionPlaying absolute hidden group-hover:block top-0 left-0 right-0 bottom-0 z-[2]">
                  <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <button
                      onClick={() => {
                        if (loader) handlPlayMusic(id);
                      }}
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
              <div>
                <div className="text-sm font-medium leading-[1.3]">{name}</div>
                <h3 className="text-[hsla(0,0%,100%,0.5)] leading-[1.3] text-[14px] mt-[2.5px]">
                  {artist
                    .map((item) => (
                      <Link
                        key={item.id}
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
              <div className="text-[hsla(0,0%,100%,0.5)] text-[15px] max-w-[100%]">
                {album !== null ? (
                  !isAlbum ? (
                    <Link
                      to={"/album/" + album.aliasTitle + "/" + album.id}
                      className="hover:underline hover:text-[#c273ed] cursor-pointer"
                    >
                      {album.title}
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
                        <div ref={refItemSeeMore} onMouseDown={() => handlSeeMore(myRef)}  className="w-auto" tabIndex="-1" {...attrs}>
                         <ItemSeemore  id={id} name={name} artist={artist} composers={composers} genre={genre} image={thumbnail} totalListens={totalListens} totalFavourited={totalFavourited} />
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
