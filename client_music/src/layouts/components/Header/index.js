import { memo } from "react"

import Icons from "~/components/icons"
import Search from "../search"
import image from "~/assets/images"


const { GoArrowLeft, GoArrowRight } = Icons

const Header = () => {    
    return (
        <header
            className="zm-header h-[70px] flex items-center sticky top-0 right-0 min-[660px] z-[100] left-[240px] px-[59px]">
            <div className="text-white z-20 flex justify-between items-center w-[100%]">
                <div className="flex items-center flex-1">
                    <button><GoArrowLeft size={24} className="mr-[20px]" /></button>
                    <button><GoArrowRight size={24} className="mr-[20px]" /></button>

                    <Search />
                </div>
                <div>
                    <button>
                        <figure className="w-[38px] h-[38px] rounded-[999px] overflow-hidden">
                            <img className="h-auto w-[100%] inline-block align-top" src={image.use} alt="ImageUser"></img>
                        </figure>
                    </button>
                </div>
            </div>
        </header>
    )
}
export default memo(Header)