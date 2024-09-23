import { Link } from "react-router-dom";

import Icons from "../icons";
import { formatter } from "~/utils/numberFormat";

const { PiShuffle, TbUserPlus } = Icons;

const ArtistItem = ({id,name,alias,thumbnail,totalFollow}) => {
    return (
        <div className="lg:w-[20%] relative group px-4 min-h-[1px] float-left mb-7">
            <div className="w-full text-center">
                <div className="relative">
                    <div className="overflow-hidden rounded-full">
                        <Link to={`/nghe-si/${alias}`} >
                            <figure className="h-0 overflow-hidden rounded-[5px] pb-[100%] leading-[0]">
                                <img
                                    className="h-auto w-full duration-[0.7s] ease-out group-hover:scale-[1.1]"
                                    src={thumbnail}
                                    alt=""
                                />
                                <div className="absolute rounded-full w-[100%] h-[100%] group-hover:bg-[rgba(0,0,0,0.3)] top-0 left-0 z-[8]"></div>
                                <div className="absolute items-center hidden group-hover:block group-hover:z-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                                    <button className="flex items-start justify-center">
                                        <PiShuffle size={30} />
                                    </button>
                                </div>
                            </figure>
                        </Link>
                    </div>
                </div>
                <div className="min-h-12">
                    <div className="text-[16px] font-medium leading-tight text-[#fff] overflow-hidden text-ellipsis">
                        <Link to={`/nghe-si/${alias}`} className="hover:underline hover:text-[#c273ed] mt-4 whitespace-normal overflow-hidden text-ellipsis block transform-none leading-6">
                            {name}
                        </Link>
                    </div>
                    <div className="text-[14px] font-medium leading-tight text-[hsla(0,0%,100%,0.5)]" >
                        <span>{formatter.format(totalFollow)} quan tâm</span>
                    </div>
                </div>
                <div>
                    <button
                        className="bg-[#9b4de0] uppercase border-[#9b4de0] text-white rounded-full leading-normal text-center m-auto mt-4 mb-5 flex justify-center items-center text-[13px] py-[6px] px-[29px]" >
                        <TbUserPlus size={16} className="mr-[5px]" />
                        <span>Quan tâm</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ArtistItem;
