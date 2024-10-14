import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

import { searchType } from "~/state/actions/search";
import SelectItem from "~/components/carouselItem/selectItem";
import Album from "~/components/carouselItem/itemAlbum";
import ArtistItem from "~/components/carouselItem/artistItem";
import hocSong from "~/components/HOC/hocSong";
import NoSearchData from "~/components/searchItem/noSearchData";
import Icons from "~/components/icons";
import SongSkeleton from "~/components/skeleton/songSkeleton";
import PlayListSkeleton from "~/components/skeleton/playListSkeleton";

const { RiDiscLine } = Icons

const SearchAll = ({ Context }) => {
  const type = "all";
  const location = useLocation();
  const dispatch = useDispatch();
  const { dataSearch, loadingSearch } = useSelector((state) => state.search);
  const [searchParams] = useSearchParams();
  const maxW768 = useMediaQuery({ query: '(max-width:768px)' })

  useEffect(() => {
    dispatch(searchType(searchParams.get("q"), type));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [searchParams.get("q"), location]);


  return (
    <>
      {!loadingSearch && (
        <>
          <div className="animate-pulse mb-1 w-[300px] h-[30px] rounded bg-[hsla(0,0%,100%,0.1)]"></div>
          <SongSkeleton count={5} />
          <div className="animate-pulse mb-1 mt-4 w-[300px] h-[30px] rounded bg-[hsla(0,0%,100%,0.1)]"></div>
          <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`} ><PlayListSkeleton count={5} /></div>
          <div className="animate-pulse mb-1 mt-4 w-[300px] h-[30px] rounded bg-[hsla(0,0%,100%,0.1)]"></div>
          <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`} ><PlayListSkeleton count={5} /></div>
        </>
      )}

      {loadingSearch && (
        <>
          {dataSearch?.artists?.length <= 0 && dataSearch?.songs?.length <= 0 && dataSearch?.playlists?.length <= 0 && (<NoSearchData Icon={<RiDiscLine className="text-6xl" />} text={'Không có kết quả được tìm thấy'} />)}
          <div>
            {dataSearch?.songs?.length > 0 && (
              <div className="w-auto mt-5">

                <h3 className="relative flex items-center text-[22px] font-semibold text-[#fff] leading-normal">
                  Bài hát
                </h3>
                <div className="grid md:grid-cols-1 lg:grid-cols-2">
                  {dataSearch?.songs
                    ?.filter((_, index) => index < 6)
                    .map((item, index) => (
                      <SelectItem
                        key={index}
                        id={item.id}
                        isLuMusic={false}
                        thumbnail={item.thumbnail}
                        name={item.name}
                        artist={item.artist}
                        album={item.album}
                        thumbnailAlbum={item.album?.thumbnail}
                        duration={item.duration}
                        composers={item.composers}
                        genre={item.genre}
                        totalListens={item.totalListens}
                        totalFavourited={item.totalFavourited}
                        isAlbum={item.album?.isAlbum}
                        Themecontext={Context}
                      />
                    ))}
                </div>
              </div>
            )}
            {dataSearch?.playlists?.length > 0 && (
              <div className="w-auto mt-7">
                <h3 className="relative mb-6 flex items-center text-[22px] font-semibold text-[#fff] leading-normal">
                  Playlist/Album
                </h3>
                <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`}>
                  {dataSearch?.playlists
                    ?.filter((_, index) => index < 5)
                    .map((item, index) => (
                      <Album
                        key={index}
                        id={item.id}
                        aliasTitle={item.aliasTitle}
                        title={item.title}
                        thumbnail={item.thumbnail}
                        description={item.description}
                        isAlbum={item.isAlbum}
                        artist={item.artist}
                        userType={item.userType}
                      />
                    ))}
                </div>
              </div>
            )}
            {dataSearch?.artists?.length > 0 && (
              <div className="w-auto mt-7">
                <h3 className="relative mb-6 flex items-center text-[22px] font-semibold text-[#fff] leading-normal">
                  Nghệ sĩ
                </h3>
                <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`}>
                  {dataSearch?.artists
                    ?.filter((_, index) => (maxW768 ? index < 3 : index < 5))
                    .map((item, index) => (
                      <ArtistItem
                        key={index}
                        id={item.id}
                        name={item.name}
                        alias={item.alias}
                        thumbnail={item.thumbnail}
                        totalFollow={item.totalFollow}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

    </>
  );
};
export default hocSong(SearchAll);
