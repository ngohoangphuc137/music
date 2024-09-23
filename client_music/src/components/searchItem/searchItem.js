import { Link, useNavigate } from "react-router-dom";

import { formatter } from "~/utils/numberFormat";
import Icons from "../icons";

const { RxDotFilled } = Icons;

const SearchItem = ({ data,setSearchResult,setSearchValue }) => {
    const navigate = useNavigate();
    const onNavigateToItem = (e) => {
        if(e.target.tagName === 'A'){
            setSearchResult([])
            setSearchValue("")
        }else{    
            data.type==='artist'&& navigate(`/nghe-si/${data?.alias}`)
            data.type==='song' && navigate(`/bai-hat/${data?.alias}/${data?.id}`)
            data.type==='album' && navigate(`/album/${data?.aliasTitle}/${data?.id}`)

            setSearchResult([])
            setSearchValue("")
        }
    };

    return (
        <div className="py-[8px] px-[10px] hover:bg-active-bg flex items-center overflow-hidden text-ellipsis whitespace-normal cursor-pointer relative rounded">
            <div
                onClick={(e) => onNavigateToItem(e)}
                className="flex items-center text-left flex-1">
                <div className="mr-[10px]">
                    <figure
                        className={`w-[50px] h-[50px] overflow-hidden ${data.type === "artist" ? "rounded-full" : "rounded  "
                            }`}
                    >
                        <img className="w-auto h-auto" src={data?.thumbnail} alt="" />
                    </figure>
                </div>
                <div className="flex-grow flex-shrink text-left">
                    <h3 className="text-[14.5px] font-semibold text-white">
                        {data.name}
                    </h3>
                    <h3 className="text-[12px] font-semibold text-[hsla(0,0%,100%,0.5)]">
                        {data.type === "album" ? (
                            data.isAlbum ? (
                                "Album"
                            ) : (
                                "Playlist"
                            )
                        ) : data.type === "artist" ? (
                            <span className="flex items-center">
                                Nghệ sĩ <RxDotFilled /> {formatter.format(data.totalFollow)}{" "}
                                quan tâm
                            </span>
                        ) : (
                            data.artist
                                ?.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={"/nghe-si/" + item.alias}
                                        className="hover:underline hover:text-[#c273ed]"
                                    >
                                        {item.name}
                                    </Link>
                                ))
                                .reduce((prev, curr) => [prev, ", ", curr])
                        )}
                    </h3>
                </div>
            </div>
        </div>
    );
};
export default SearchItem;
