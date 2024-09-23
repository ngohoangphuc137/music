import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { searchType } from "~/state/actions/search";
import Album from "~/components/carouselItem/itemAlbum";
import NoSearchData from "~/components/searchItem/noSearchData";
import Icons from "~/components/icons";
import PlayListSkeleton from "~/components/skeleton/playListSkeleton";

const { RiDiscLine } = Icons

const SearchPlaylist = () => {
  const { dataSearch, loadingSearch } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    dispatch(searchType(searchParams.get("q"), "playlist"));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [searchParams.get("q")]);

  return (
    <>
      {!loadingSearch && <div className="grid md:grid-cols-5" ><PlayListSkeleton count={20} /></div>}
      {loadingSearch && (
        <>
          {dataSearch?.length <= 0 && <NoSearchData Icon={<RiDiscLine className="text-6xl" />} text={'Không có Playlist/Album được tìm thấy'} />}
          {dataSearch?.length > 0 && (
            <div>
              <div className="w-auto mt-7">
                <h3 className="relative flex items-center text-[22px] font-semibold text-[#fff] leading-normal">
                  Playlist/Album
                </h3>
                <div className="grid md:grid-cols-4 lg:grid-cols-5">
                  {dataSearch?.map((item, index) => (
                    <Album
                      key={index}
                      id={item.id}
                      aliasTitle={item.aliasTitle}
                      title={item.title}
                      thumbnail={item.thumbnail}
                      description={item.description}
                      isAlbum={item.isAlbum}
                      artist={item.artist}
                    />
                  ))}

                </div>

              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default SearchPlaylist;
