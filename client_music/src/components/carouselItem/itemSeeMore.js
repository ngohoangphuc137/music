import { memo } from "react";
import Icons from "../icons";
import Button from "../button";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css"; // optional
import InformationSong from "../itemInformation/informationSong";
const {
    IoMdHeartEmpty,
    SlEarphones,
    PiMicrophoneStage,
    HiOutlineInformationCircle,
    IoAddCircleOutline,
    GrNext,
} = Icons;
const ItemSeemore = ({ id, name, image,artist,album, genre,composers,totalListens, totalFavourited }) => {
    
    return (
        <div className="w-[250px] h-auto bg-[#34224f] rounded-[8px]">
            <ul>
                <div className="pt-[12px] px-[12px] flex text-left">
                    <div className="mr-2">
                        <figure className="w-[40px] h-[40px] rounded-[4px] overflow-hidden">
                            <img className="w-full h-auto" src={image} alt="" />
                        </figure>
                    </div>
                    <div className="flex-1 text-[#a0a0a0] relative">
                        <div className="flex items-center">
                            <span className="font-medium text-slate-50 cursor-pointer">
                                {name}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center mr-2">
                                <IoMdHeartEmpty size={14} className="mr-[2px]" />
                                <span className="text-[13px] leading-[0.5]">
                                    {totalFavourited}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <SlEarphones size={13} className="mr-[2px]" />
                                <span className="text-[13px] leading-[0.5]">
                                    {totalListens}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
            <ul className="text-[#dadada] py-[8px]">
                <li
                    onClick={() => alert(id)}
                    className="hover:bg-border-player text-[#fff]"
                >
                    <Button value={"Lời bài hát"} icon={<PiMicrophoneStage />} />
                </li>
                <Tippy
                    interactive='true'
                    hideOnClick='false'
                    trigger='mouseenter'
                    appendTo='parent'
                    placement='auto'
                    offset={[-15,0]}
                    render={attrs => (
                        <div className="w-auto" tabIndex="-1" {...attrs}>
                            <InformationSong album={null} composers={composers} genre={genre} artist={artist}/>
                        </div>
                    )}
                >
                    <li className="hover:bg-border-player text-[#fff]">
                        <Button
                            value={"Thông tin liên quan"}
                            icon={<HiOutlineInformationCircle />}
                            iconNext={<GrNext />}
                        />
                    </li>
                </Tippy>
                <li className="hover:bg-border-player text-[#fff]">
                    <Button value={"Thêm vào thư viện"} icon={<IoMdHeartEmpty />} />
                </li>
                <li className="hover:bg-border-player text-[#fff]">
                    <Button
                        value={"Thêm vào playlist"}
                        icon={<IoAddCircleOutline />}
                        iconNext={<GrNext />}
                    />
                </li>
            </ul>
        </div>
    );
};
export default memo(ItemSeemore);
