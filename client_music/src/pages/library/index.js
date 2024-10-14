import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive'

import Icons from "~/components/icons";
import { libaryService } from "~/services/authServicer";
import NoSearchData from "~/components/searchItem/noSearchData";
import SelectItem from "~/components/carouselItem/selectItem";
import Album from "~/components/carouselItem/itemAlbum";
import hocSong from "~/components/HOC/hocSong";
import PlayListSkeleton from "~/components/skeleton/playListSkeleton";
import ArtistSkeleton from "~/components/skeleton/artistSkeleton";


const { GrLinkNext } = Icons;

const Library = ({ Context }) => {
    const navigate = useNavigate()
    const [isMenu, setIsMenu] = useState(false);
    const [libary, setLibary] = useState(null);
    const [loading, setLoading] = useState(false)
    const { bearer_token } = useSelector((state) => state.user);
    const maxW768 = useMediaQuery({ query: '(max-width:768px)' })
    useEffect(() => {
        const fetch = async () => {
            const response = await libaryService(bearer_token);
            if (response.data.status === 200) {
                setLibary(response.data.data);
            }
            setLoading(true)
        };
        bearer_token !== null ? fetch() : navigate('/')
        setLoading(false)
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [bearer_token]);
    return (
        <div className={`lg:px-[59px] sm:px-[20px] min-[300px]:px-3 ${maxW768 ? 'relative h-[calc(100vh-135px-60px)]' : 'absolute h-[calc(100vh-85px)] mt-[70px]'} inset-0 text-white `}>
            {!loading && (
                <>
                    <div className="animate-pulse pb-8 mb-5 mt-6 w-[250px] h-[30px] rounded bg-[hsla(0,0%,100%,0.1)]"></div>
                    <div className="flex flex-wrap"> <ArtistSkeleton count={maxW768 ? 3 : 5} /></div>
                    <div className="animate-pulse pb-8 mb-1 mt-6 w-[250px] h-[30px] rounded bg-[hsla(0,0%,100%,0.1)]"></div>
                    <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`} ><PlayListSkeleton count={5} /></div>
                </>
            )}
            {loading && (
                <div className="flex flex-col">
                    <header className="flex items-center mt-2">
                        <p className="font-bold text-[36px] leading-[48px]">Thư viện</p>
                    </header>
                    {libary?.artist.length > 0 && (
                        <div className="mymusic-artist mt-8 w-full">
                            <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`} >
                                {libary?.artist
                                    .filter((_, index) => maxW768 ? index < 2 : index < 4)
                                    .map((item, index) => (
                                        <div
                                            key={index}
                                            className="lg:w-[88%] relative group px-4 min-h-[1px] float-left mb-7"
                                        >
                                            <div className="w-full text-center">
                                                <div className="relative">
                                                    <div className="overflow-hidden rounded-full">
                                                        <Link to={`/nghe-si/${item.alias}`}>
                                                            <figure className="h-0 overflow-hidden rounded-[5px] pb-[100%] leading-[0]">
                                                                <img
                                                                    className="h-auto w-full duration-[0.7s] ease-out group-hover:scale-[1.1]"
                                                                    src={item.thumbnail}
                                                                    alt=""
                                                                />
                                                                <div className="absolute rounded-full w-[100%] h-[100%] group-hover:bg-[rgba(0,0,0,0.3)] top-0 left-0 z-[8]"></div>
                                                            </figure>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="min-h-12">
                                                    <div className="text-[16px] font-medium leading-tight text-[#fff] overflow-hidden text-ellipsis">
                                                        <p className="hover:underline hover:text-[#c273ed] mt-4 whitespace-normal overflow-hidden text-ellipsis block transform-none leading-6">
                                                            {item.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                <div className="lg:w-[88%] relative group px-4 min-h-[1px] float-left mb-7 cursor-pointer">
                                    <div className="w-full text-center">
                                        <div className="relative">
                                            <div className="overflow-hidden rounded-full border-[hsla(0,0%,100%,0.1)] border-[1px]">
                                                <Link to={'/mymusic/libary/artist'}>
                                                    <div className="h-0 overflow-hidden rounded-[5px] pb-[100%] leading-[0]">
                                                        <GrLinkNext
                                                            className="absolute group-hover:text-[#c273ed] top-[50%] left-[50%] z-[8] translate-x-[-50%] translate-y-[-50%]"
                                                            size={30}
                                                        />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="min-h-12">
                                            <div className="text-[16px] font-medium leading-tight text-[#fff] overflow-hidden text-ellipsis">
                                                <p className="mt-4 whitespace-normal group-hover:text-[#c273ed] overflow-hidden text-ellipsis block transform-none leading-6">
                                                    Xem tất cả
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {libary?.playlist.length > 0 && (
                        <div className="mymusic-album-playlist">
                            <header className="flex items-center mt-2 justify-between">
                                <div>
                                    <p className="font-bold text-[20px]">PLAYLIST</p>
                                </div>
                                <Link
                                    to={'/mymusic/libary/playlist'}
                                    className="text-[13px] font-medium uppercase flex items-center text-[hsla(0,0%,100%,0.5)]">
                                    Tất cả
                                </Link>
                            </header>
                            <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`}>
                                {libary?.playlist
                                    .filter((_, index) => maxW768 ? index < 3 : index < 5)
                                    .map((item, index) => (
                                        <Album
                                            key={index}
                                            id={item.id}
                                            title={item.title}
                                            aliasTitle={item.aliasTitle}
                                            thumbnail={item.thumbnail}
                                            userName={item.userName}
                                            userType={item.userType}
                                        />
                                    ))}
                            </div>
                        </div>
                    )}

                    <div className="mymusic-songs mt-9 pb-9">
                        <div className="flex min-h-[32px] w-full border-[1px] border-b-[hsla(0,0%,100%,0.1)] border-transparent">
                            <ul className="flex items-center text-[14px] font-medium">
                                <li
                                    onClick={() => setIsMenu(false)}
                                    className={`${isMenu ? "" : "border-b-[#c273ed]"
                                        } flex cursor-pointer items-center justify-center uppercase border-transparent leading-normal mr-10 border-[2px]`}
                                >
                                    <p className="block py-[15px]">Bài hát</p>
                                </li>
                                <li
                                    onClick={() => setIsMenu(true)}
                                    className={`${!isMenu ? "" : "border-b-[#c273ed]"
                                        } flex cursor-pointer items-center justify-center uppercase border-transparent leading-normal mr-10 border-[2px]`}
                                >
                                    <p className="block py-[15px]">Album</p>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-4">
                            {!isMenu ? (
                                <>
                                    {libary?.song.length <= 0 && (
                                        <NoSearchData text={"Chưa có bài hát nào trong thư viện"} />
                                    )}
                                    {libary?.song.length > 0 && (
                                        <>
                                            <div className="h-11 uppercase flex items-center justify-center p-[10px] rounded-[5px] border-b border-solid border-[hsla(0,0%,100%,0.05)]">
                                                <div className="flex-auto flex-shrink-0 flex-grow-0 w-[50%] ml-[10px]">
                                                    <div>
                                                        <div className="text-[13px] font-medium text-[hsla(0,0%,100%,0.5)]">
                                                            Bài hát
                                                        </div>
                                                    </div>
                                                </div>
                                                {!maxW768 && (
                                                    <div className="flex-auto flex-shrink flex-grow text-left self-center w-0 ml-[-10px]">
                                                        <div>
                                                            <div className="text-[13px] font-medium text-[hsla(0,0%,100%,0.5)]">
                                                                Album
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex-auto flex-shrink-0 flex-grow-0 ml-[10px]">
                                                    <div>
                                                        <div className="text-[13px] font-medium text-[hsla(0,0%,100%,0.5)]">
                                                            Thời lượng
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {libary?.song.map((item, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        id={item.id}
                                                        isLuMusic={true}
                                                        album={item.album}
                                                        name={item.name}
                                                        thumbnail={item.thumbnail}
                                                        duration={item.duration}
                                                        artist={item.artist}
                                                        composers={item.composers}
                                                        genre={item.genre}
                                                        totalListens={item.totalListens}
                                                        totalFavourited={item.totalFavourited}
                                                        isAlbum={item.isAlbum}
                                                        Themecontext={Context}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    {libary?.album.length <= 0 && (
                                        <NoSearchData text={"Không có album nào trong thư viện"} />
                                    )}
                                    {libary?.album.length > 0 && (
                                        <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`}>
                                            {libary?.album
                                                .filter((_, index) => index < 5)
                                                .map((item, index) => (
                                                    <Album
                                                        key={index}
                                                        id={item.id}
                                                        title={item.title}
                                                        aliasTitle={item.aliasTitle}
                                                        thumbnail={item.thumbnail}
                                                    />
                                                ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default hocSong(Library);
