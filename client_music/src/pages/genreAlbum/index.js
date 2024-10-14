import { useEffect, useState, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMediaQuery } from 'react-responsive'

import Album from "~/components/carouselItem/itemAlbum";
import { genre, albumGenre } from "~/services/genreAlbumServicer";
import Icons from "~/components/icons";
import PlayListSkeleton from "~/components/skeleton/playListSkeleton";

const { LuMusic } = Icons;

const GenreAlbum = () => {
  const { genre_parent } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const [currentGenre, setCurrentGenre] = useState({
    id: null,
    name: null,
    alias: null,
  });
  const [childs, setChilds] = useState([]);
  const [idParent, setIdParent] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setloading] = useState(false);
  const { id } = useParams();
  const maxW768 = useMediaQuery({ query: '(max-width:768px)' })

  useEffect(() => {
    const fetchApi = async () => {
      const [getGenre, getAlbums] = await Promise.all([
        genre(id),
        albumGenre(id, page),
      ]);
      if (getGenre.data.status === 200) {
        setCurrentGenre({
          id: getGenre.data.data.id,
          name: getGenre.data.data.name_genre,
          alias: getGenre.data.data.alias,
        });
        setChilds(getGenre.data.data.childs);
        setIdParent(getGenre.data.data.parent.id);
      }
      if (getAlbums.data.status === 200) {
        setAlbums(getAlbums.data.data.item);
        setPage(page + 1);
        setTotal(getAlbums.data.data.total);
      }
      setloading(true);
    };
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handlNavigate = (idGenreParent, alias) => {
    if (currentGenre.id === idGenreParent || id === idGenreParent) return;
    setPage(1);
    setHasMore(true);
    setloading(false);
    navigate(`/the-loai-album/${alias}/${idGenreParent}`);
  };
  const handlNavigateChilds = (idGenreChild, alias) => {
    if (currentGenre.id === idGenreChild) return;
    setPage(1);
    setHasMore(true);
    setloading(false);
    navigate(`/the-loai-album/${alias}/${idGenreChild}`);
  };
  const fetchData = () => {
    if (albums.length < total) {
      setPage(page + 1);
      const listSong = async () => {
        const response = await albumGenre(id, page);
        if (response.status === 200) {
          setAlbums(albums.concat(response.data.data.item));
        }
      };
      listSong();
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="overflow-y-auto">
      <InfiniteScroll
        dataLength={albums.length}
        loader={<div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`} ><PlayListSkeleton count={10} /></div>}
        hasMore={hasMore && albums.length !== total}
        next={fetchData}
        style={{ height: "calc(100vh-85px)",overflowX:'hidden' }}
        height={"calc(100vh-85px)"}
        className={` lg:px-[59px] sm:px-[20px] min-[300px]:px-3 
           ${maxW768 ? 'relative h-[calc(100vh-135px-60px)]' : 'absolute lg:mt-[70px] sm:mt-[45px] min-[300px]:mt-[45px]'} inset-0 main-page`}
      >
        <div className="">
          <div className="text-[#fff] pt-2">
            <div className="border-b-[1px] border-[hsla(0,0%,100%,0.1)] mx-[calc(59px*-1)] pl-[59px] mb-7">
              <div className="flex items-center min-h-[32px]">
                <h3 className="textAlbumGenre  font-semibold m-0 pr-5 border-r-[1px] border-[hsla(0,0%,100%,0.1)] leading-normal">
                  ALBUM
                </h3>
                <ul className="flex items-center flex-wrap linkGenre font-medium">
                  {genre_parent?.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-center uppercase relative text-[#dadada] leading-normal"
                    >
                      <span
                        onClick={() => handlNavigate(item.id, item.alias)}
                        className={
                          item.id === idParent
                            ? "border-[#9b4de0] border-b-[2px] text-white cursor-pointer"
                            : "cursor-pointer"
                        }
                      >
                        <p className="py-[15px]">{item.name_genre}</p>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              {loading ? (
                <Menu as="div" className="relative inline-block text-right">
                  <div>
                    <MenuButton className="px-[18px] min-w-[120px] py-[6px] justify-between bg-[hsla(0,0%,100%,0.1)] flex items-center rounded-full">
                      <LuMusic className="mr-1" size={16} />
                      <div className="flex items-center justify-center">
                        <span className="mr-5">
                          {parseInt(id) === parseInt(idParent)
                            ? "Tất cả"
                            : currentGenre.name}
                        </span>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="-mr-1 h-5 w-5 text-white text-[13px]"
                        />
                      </div>
                    </MenuButton>
                  </div>

                  <div>
                    <MenuItems
                      transition
                      className="absolute z-10 mt-2 w-56 origin-top-right rounded-lg shadow-lg ring-1
               ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform
                data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1 flex flex-wrap w-[400px] bg-[#34224f] p-1 shadow-[0_2px_8px_0rgba(0,0,0,.2)] min-w-full rounded-lg left-0">
                        {childs?.map((item, index) => (
                          <div
                            key={index}
                            onClick={() =>
                              handlNavigateChilds(item.id, item.alias)
                            }
                            className="w-1/2 text-[13px] rounded p-2 text-left cursor-pointer hover:bg-border-player"
                          >
                            {item.name_genre}
                          </div>
                        ))}
                      </div>
                    </MenuItems>
                  </div>
                </Menu>
              ) : (
                <div className="animate-pulse w-[300px] h-[30px] rounded bg-[hsla(0,0%,100%,0.1)]"></div>
              )}

              <div>
                <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`}>
                  {loading && (albums?.map((item) => (
                    <Album
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      aliasTitle={item.aliasTitle}
                      thumbnail={item.thumbnail}
                      description={item.description}
                      isAlbum={item.isAlbum}
                      artist={item.artist}
                    />
                  )))}
                </div>
                {!loading && <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`} ><PlayListSkeleton count={10} /></div>}
              </div>
            </div>
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};
export default memo(GenreAlbum);
