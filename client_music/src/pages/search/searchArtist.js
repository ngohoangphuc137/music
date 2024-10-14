import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive'

import { searchType } from "~/state/actions/search";
import ArtistItem from "~/components/carouselItem/artistItem";
import NoSearchData from "~/components/searchItem/noSearchData";
import Icons from "~/components/icons";
import ArtistSkeleton from "~/components/skeleton/artistSkeleton";

const { GiMicrophone } = Icons

const SearchArtist = () => {
    const type = "artist";
    const dispatch = useDispatch();
    const { dataSearch, loadingSearch } = useSelector((state) => state.search);
    const maxW768 = useMediaQuery({ query: '(max-width:768px)' })
    const [searchParams] = useSearchParams();

    useEffect(() => {
        dispatch(searchType(searchParams.get("q"), type));
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [searchParams.get("q")]);
    return (
        <>
            {!loadingSearch && (<div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`} ><ArtistSkeleton count={10} /></div>)}
            {loadingSearch && (
                <>
                    {dataSearch?.length <= 0 && <NoSearchData Icon={<GiMicrophone className="text-6xl" />} text={'Không có Nghệ sĩ được tìm thấy'} />}
                    {dataSearch?.length > 0 && (
                        <div className="w-auto mt-5">
                            <h3 className="relative mb-6 flex items-center text-[22px] font-semibold text-[#fff] leading-normal">
                                Nghệ sĩ
                            </h3>
                            <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`}>

                                {dataSearch?.map((item, index) => (
                                    <ArtistItem
                                        key={index}
                                        id={item.id}
                                        name={item.name}
                                        alias={item.alias}
                                        thumbnail={item.thumbnail}
                                        totalFollow={item.totalFollow}
                                    />
                                ))
                                }

                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}
export default SearchArtist