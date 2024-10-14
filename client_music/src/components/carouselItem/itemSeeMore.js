import Icons from "../icons";
import Button from "../button";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css"; // optional
import InformationSong from "../itemInformation/informationSong";
import InfomationPlaylist from "../itemInformation/infomationPlaylist";
import { useSelector } from "react-redux";
import { addToPlaylistServicer } from "~/services/authServicer";
import { toast } from "react-toastify";

const {
    IoMdHeartEmpty,
    SlEarphones,
    PiMicrophoneStage,
    HiOutlineInformationCircle,
    IoAddCircleOutline,
    GrNext,
} = Icons;
const ItemSeemore = ({ id, name, image, artist, album, genre, composers, totalListens, totalFavourited }) => {
    
    const { bearer_token } = useSelector(
        (state) => state.user
    );

    const handAddToPlaylist = async(idPlaylist)=>{
        const add = await addToPlaylistServicer(bearer_token,idPlaylist,id)
        if(add.data.status === 200){
            toast.success(`Đã thêm bài hát ${name} vào playlist thành công`)
        }else{
            toast.error(`Đã có lỗi sảy ra trong quá trình thêm`)
        }
    }
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
                    offset={[-15, 0]}
                    render={attrs => (
                        <div className="w-auto" tabIndex="-1" {...attrs}>
                            <InformationSong album={null} composers={composers} genre={genre} artist={artist} />
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
                <Tippy
                    interactive='true'
                    hideOnClick='false'
                    trigger='mouseenter'
                    appendTo='parent'
                    placement='auto'
                    offset={[-15, 0]}
                    render={attrs => (
                        <div className="w-auto" tabIndex="-1" {...attrs}>
                             {bearer_token !== null && (<InfomationPlaylist handAddToPlaylist={handAddToPlaylist} />)}
                        </div>
                    )}
                >
                    <li className="hover:bg-border-player text-[#fff]">
                        <Button
                            value={"Thêm vào playlist"}
                            icon={<IoAddCircleOutline />}
                            iconNext={bearer_token !== null ? <GrNext /> : ""}
                        />
                    </li>
                </Tippy>
            </ul>
        </div>
    );
};
export default ItemSeemore;
