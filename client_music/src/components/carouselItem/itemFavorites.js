import Icons from "../icons"

const {MdHorizontalRule,FaPlay, IoMdHeartEmpty, RxDotsHorizontal, RiLoader2Line} = Icons
const ItemFavorites = () => {
    return (
        <div className="w-auto rounded overflow-hidden hover:bg-active-bg">
            <div className="SelectItem rounded" >
                <div className="rounded flex items-center text-left p-2 group">
                    <div className="flex items-center w-[50%] mr-[10px] flex-auto flex-shrink-0 flex-grow-0">
                        <div className="text-[hsla(0,0%,100%,0.5)] mr-[15px] flex justify-center items-center text-[12px] font-bold">
                           <span className="min-w-12 number">1</span>
                           <div>
                            <MdHorizontalRule size={23}/>
                           </div>
                        </div>
                        <div className="mr-[10px] relative block rounded-[4px] overflow-hidden cursor-pointer">
                            <figure className="w-[40px] h-[40px]">
                                <img
                                    className="w-[100%] h-auto"
                                    src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/a/5/1/0/a5105d2e742c6d2485399b6141719383.jpg"
                                    alt=""
                                />
                            </figure>
                            <div className="opacity absolute w-[100%] h-[100%] group-hover:bg-[rgba(0,0,0,0.5)] top-0 left-0 z-0"></div>
                            <div className="actionPlaying absolute hidden group-hover:block top-0 left-0 right-0 bottom-0 z-[2]">
                                <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                                    <button>
                                    <FaPlay />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium leading-[1.3]">âsasas</div>
                            <h3 className="text-[hsla(0,0%,100%,0.5)] leading-[1.3] text-[14px] mt-[2.5px]">
                                sáas
                            </h3>
                        </div>
                    </div>
                    <div className="flex-auto flex-grow flex-shrink text-left self-center w-0 ml-[-10px]">
                        <div className="text-[hsla(0,0%,100%,0.5)] text-[15px] max-w-[100%]">
                            âsasaa
                        </div>
                    </div>
                    <div className="ml-[10px] flex-auto flex-shrink flex-grow w-0">
                        <div className="hover-items hidden group-hover:block">
                            <div className="flex items-center justify-end">
                                <div className="flex items-center justify-end mr-1">
                                    <button className="font-normal p-[6.5px] rounded-[50%] hover:bg-active-bg">
                                    <IoMdHeartEmpty size={20} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-end ml-1">

                                    <button className="font-normal p-[6.5px] rounded-[50%] hover:bg-active-bg">
                                         <RxDotsHorizontal size={20} />
                                    </button>

                                </div>
                            </div>
                        </div>
                        <div className="active-item group-hover:hidden">
                            <div className="flex items-center justify-end">
                                <div className="text-[hsla(0,0%,100%,0.5)] text-[15px]">
                                    2:30
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemFavorites