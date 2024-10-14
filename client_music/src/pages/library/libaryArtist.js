import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive'

import { listArtistService } from "~/services/authServicer";
import ArtistItem from "~/components/carouselItem/artistItem";
import ArtistSkeleton from "~/components/skeleton/artistSkeleton";

const LibaryArtist = () => {
    const [artist, setArtist] = useState([]);
    const [loading, setLoading] = useState(false);
    const { bearer_token } = useSelector((state) => state.user);
    const maxW768 = useMediaQuery({ query: '(max-width:768px)' })
    useEffect(() => {
        const fetch = async () => {
            const response = await listArtistService(bearer_token);
            response.data.status === 200
                ? setArtist(response.data.data)
                : setArtist([]);
            setLoading(true);
        };
        fetch();
        setLoading(false);
        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    return (
        <div className={`lg:px-[59px] sm:px-[20px] min-[300px]:px-3 ${maxW768 ? 'relative h-[calc(100vh-135px-60px)]' : 'absolute h-[calc(100vh-85px)] mt-[70px]'} inset-0 text-white flex flex-col`}>
            <div className="border-b-[1px] border-[hsla(0,0%,100%,0.1)] mx-[calc(59px*-1)] pl-[59px] mb-7">
                <div className="flex items-center min-h-[32px]">
                    <h3 className="text-[25px] font-semibold m-0 pr-5 border-r-[1px] border-[hsla(0,0%,100%,0.1)] leading-normal">
                        NGHỆ SĨ
                    </h3>
                    <ul className="flex items-center flex-wrap text-[14.5px] font-medium">
                        <li className="flex select-none items-center justify-center uppercase relative text-[#dadada] mx-[20px] leading-normal">
                            <span className=" text-white cursor-pointer">
                                <p className="py-[15px]">Tất cả</p>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`}>
                {loading ? (
                    artist?.map((item, index) => (
                        <ArtistItem
                            key={index}
                            id={item.id}
                            name={item.name}
                            alias={item.alias}
                            thumbnail={item.thumbnail}
                            totalFollow={item.totalFollow}
                            isButtonFollow={true}
                        />
                    ))
                ) : (<ArtistSkeleton count={5} />)}
            </div>
        </div>
    );
};
export default LibaryArtist;
