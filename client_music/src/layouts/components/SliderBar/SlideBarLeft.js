import { useSelector } from "react-redux"

import image from "~/assets/images"
import Menu from "./menu/Menu"

const SlideBarLeft = () => {
    const { currunSongId } = useSelector((state) => state.song);
    return (
        <div className={`bg-custom-bg ${currunSongId!==null?'h-[calc(100vh-85px)]':'h-[calc(100vh)]'}`}>
            {/* logo */}
            <div className="w-auto flex items-center h-[70px] pl-[28px] pr-[25px]">
                <img className="w-[120px] h-[40px] inline-block" src={image.logo.default} alt="Logo"/>
            </div>
            {/* menu slibarLeft */}
           <Menu/>
        </div>
    )
}
export default SlideBarLeft