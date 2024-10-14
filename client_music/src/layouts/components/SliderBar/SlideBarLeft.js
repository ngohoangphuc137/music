import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive";

import image from "~/assets/images"
import Menu from "./menu/Menu"

const SlideBarLeft = () => {
    const { currunSongId } = useSelector((state) => state.song);
    const maxW556px = useMediaQuery({ query: '(max-width:556px)' })
    return (
        <div className={`bg-custom-bg ${currunSongId !== null ? 'h-[calc(100vh-85px)]' : 'h-[calc(100vh)]'}`}>
            {/* logo */}
            <div className="lg:w-auto sm:w-full flex items-center lg:justify-start min-[300px]:justify-start sm:justify-center h-[70px] lg:pl-[28px] lg:pr-[25px] sm:pl[0px] sm:pr-[0px]">
                <img className={`w-[120px] h-[40px] ${maxW556px ? 'pl-3 block' : 'lg:block sm:hidden min-[300px]:hidden'} inline-block`} src={image.logo.default} alt="Logo" />
                <div className={`${maxW556px ? 'hidden' : 'lg:hidden sm:block min-[300px]:block'} w-[46px] h-[46px]`} style={{ backgroundImage: `url(${image.logoSm.default})` }} ></div>
            </div>
            {/* menu slibarLeft */}
            <Menu />
        </div>
    )
}
export default SlideBarLeft