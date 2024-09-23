import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import hocSong from "~/components/HOC/hocSong";
import SelectItem from "~/components/carouselItem/selectItem";
import { searchType } from "~/state/actions/search";
import NoSearchData from "~/components/searchItem/noSearchData";
import Icons from "~/components/icons";
import SongSkeleton from "~/components/skeleton/songSkeleton";

const { LuMusic } = Icons

const SearchSong = ({ data, Context }) => {
  const { dataSearch, loadingSearch } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    dispatch(searchType(searchParams.get("q"), "song"));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [searchParams.get("q")]);
  console.log(loadingSearch);
  return (
    <>
      {!loadingSearch && (<SongSkeleton count={13} />)}
      {loadingSearch && (
        <>
          {dataSearch?.length <= 0 && <NoSearchData Icon={<LuMusic className="text-6xl" />} text={'Không có Bài Hát được tìm thấy'} />}
          {dataSearch?.length > 0 && (
            <div>
              <div className="w-auto mt-7">
                <h3 className="relative mb-6 flex items-center text-[22px] font-semibold text-[#fff] leading-normal">
                  Bài hát
                </h3>
                <div className="grid md:grid-cols-1">

                  {dataSearch?.map((item, index) => (
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
                  ))
                  }
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default hocSong(SearchSong);
