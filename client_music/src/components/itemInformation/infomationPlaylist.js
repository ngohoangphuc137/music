import { useSelector } from "react-redux";
import Icons from "../icons";

const { PiPlaylistDuotone } = Icons
const InfomationPlaylist = ({handAddToPlaylist}) => {
    const { info_user } = useSelector(
        (state) => state.user
    );    

    return (
        <div className="bg-[#34224f] w-[200px] h-auto shadow-[0_0_5px_0_rgba(0,0,0,.2)] rounded-lg py-2" >
            <div className="pb-[12px] pt-[12px] w-full" >
                {info_user.createdPlaylists?.map((item, index) => (
                    <button 
                    onClick={()=>handAddToPlaylist(item.id)}
                    key={index} 
                    className="text-[hsla(0,0%,100%,0.5)] px-2 py-2 text-white w-full items-center flex justify-start hover:bg-border-player text-[14px]">
                        <PiPlaylistDuotone size={18} className="mr-1" />
                        {item.title}
                    </button>
                ))}
            </div>
        </div>
    )
}
export default InfomationPlaylist