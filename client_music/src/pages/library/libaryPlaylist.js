import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Modal } from "antd"
import { toast } from "react-toastify"
import { useMediaQuery } from 'react-responsive'

import Icons from "~/components/icons"
import Album from "~/components/carouselItem/itemAlbum"
import { listPlaylistService, createPlaylist } from "~/services/authServicer"
import PlayListSkeleton from "~/components/skeleton/playListSkeleton"
import { setCreatePlaylistPush } from "~/state/actions/user"

const { IoAddCircleOutline } = Icons

const LibaryPlaylist = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [titlePlaylist, setTitlePlaylist] = useState("")
    const { bearer_token } = useSelector((state) => state.user);
    const [playlist, setPlaylist] = useState([])
    const [loading, setLoading] = useState(false)
    const playlist_all = 'all';
    const playlist_owner = 'owner';
    const maxW768 = useMediaQuery({ query: '(max-width:768px)' })

    useEffect(() => {
        const fetchListPlaylist = async () => {
            const type = !isOwner ? playlist_all : playlist_owner
            const response = await listPlaylistService(bearer_token, type)
            response.data.status === 200 ? setPlaylist(response.data.data) : setPlaylist([])
            setLoading(true)
        }
        fetchListPlaylist()
        setLoading(false)
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [isOwner])

    const handleCancel = () => {
        setOpenModal(false)
        setTitlePlaylist("")
    }
    const handlSetTitle = (e) => {
        const text = e.target.value
        if (!text.startsWith(" ")) {
            setTitlePlaylist(e.target.value)
        }
    }
    const clickNavigate = (value) => {
        if (isOwner !== value) {
            setIsOwner(value)
        }
    }
    const handlSubmit = async () => {
        const create = await createPlaylist(bearer_token, titlePlaylist)
        if (create.data.status === 200) {
            const data = create.data.data
            const datacreatePlaylist = { id: data.id, title: data.title, aliasTitle: data.aliasTitle }
            dispatch(setCreatePlaylistPush(datacreatePlaylist))
            navigate(`/playlist/${data.aliasTitle}/${data.id}`)
        } else {
            toast.error("Lỗi")
        }
    }

    return (
        <div className={`lg:px-[59px] sm:px-[20px] min-[300px]:px-3 ${maxW768 ? 'relative h-[calc(100vh-135px-60px)]' : 'absolute h-[calc(100vh-85px)] mt-[70px]'} inset-0 text-white flex flex-col`}>
            <div className={`border-b-[1px] border-[hsla(0,0%,100%,0.1)] mx-[calc(59px*-1)] pl-[59px] ${maxW768 ? 'mb-0' : 'mb-7'}`}>
                <div className="flex items-center min-h-[32px]">
                    <h3 className="text-[25px] font-semibold m-0 pr-5 border-r-[1px] border-[hsla(0,0%,100%,0.1)] leading-normal">
                        PLAYLIST
                    </h3>
                    <ul className="flex items-center flex-wrap text-[14.5px] font-medium">
                        <li
                            onClick={() => clickNavigate(false)}
                            className="flex select-none items-center justify-center uppercase relative text-[#dadada] mx-[20px] leading-normal"
                        >
                            <span
                                className={`${!isOwner ? 'border-[#9b4de0]' : "border-none"} border-b-[2px] text-white cursor-pointer`}
                            >
                                <p className="py-[15px]">Tất cả</p>
                            </span>
                        </li>
                        <li
                            onClick={() => clickNavigate(true)}
                            className="flex select-none items-center justify-center uppercase relative text-[#dadada] mx-[20px] leading-normal"
                        >
                            <span
                                className={`${isOwner ? 'border-[#9b4de0]' : "border-none"} border-b-[2px] text-white cursor-pointer`}
                            >
                                <p className="py-[15px]">Của tôi</p>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`}>
                    <div className="lg:w-[88%] group mx-[14px] mt-7">
                        <div
                            onClick={() => setOpenModal(true)}
                            className="w-full cursor-pointer pb-[calc(100%+45px)] relative rounded border-[hsla(0,0%,100%,0.1)] border-[1px]">
                            <div className="w-full flex flex-col items-center justify-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                                <IoAddCircleOutline className={`${maxW768 ? 'text-[40px]' : 'text-[60px]'}`} />
                                <span className={`font-normal ${maxW768 ? 'text-[10px]' : 'text-[16px]'}`}>Tạo playlist mới</span>
                            </div>
                        </div>
                    </div>
                    {loading ?
                        (playlist?.map((item, index) => (
                            <Album
                                key={index}
                                id={item.id}
                                title={item.title}
                                aliasTitle={item.aliasTitle}
                                thumbnail={item.thumbnail}
                                userName={item.userName}
                                userType={item.userType}
                            />
                        )))
                        : (<PlayListSkeleton count={4} />)
                    }
                </div>
            </div>
            <Modal
                title="Tạo playlist mới"
                open={openModal}
                onCancel={handleCancel}
                footer={null}
                width={340}
                maskClosable={false}
                className="custom-modal"
            >
                <div className="flex flex-col w-full mt-5">
                    <input
                        onChange={(e) => handlSetTitle(e)}
                        value={titlePlaylist}
                        className="h-[44px] w-full px-[15px] outline-none text-[15px] rounded-full border-[hsla(0,0%,100%,0.1)] border-[1px] bg-[hsla(0,0%,100%,0.1)]" type="text" placeholder="Nhập tên playlist" />
                    <div className="relative w-full mt-6">
                        <button
                            onClick={() => {
                                handlSubmit()
                                setTitlePlaylist("")
                            }}
                            className="w-full text-[15.5px] select-none bg-[#9b4de0] rounded-full text-white py-[7px] font-normal flex justify-center items-center">
                            Tạo mới
                        </button>
                        {titlePlaylist === "" && (<div className="w-full absolute h-full top-0 left-0 opacity-20 bg-white cursor-not-allowed rounded-full"></div>)}
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default LibaryPlaylist