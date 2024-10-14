import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import ItemFavorites from "~/components/carouselItem/itemFavorites";
import { setPlay, setCurSong, setIsSlidebarRight } from "~/state/actions/song";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import { setTitleKey, setSongDataSlideBarRight, setSection, setSongChanged } from "~/state/actions/song"
import musicSections from "~/utils/musicSections"
import { userFavourite } from "~/services/authServicer";
import { setFavouriteSong,setFavouriteSongRemove } from "~/state/actions/user";

const ListSongFavoties = ({ songs }) => {
    const dispatch = useDispatch();
    const { currunSongId, isPlay, loader } = useSelector((state) => state.song);
    const { bearer_token } = useSelector(state => state.user)
    const [ref, setRef] = useState(null);
    const [seeMore, setSeeMore] = useState(false);
    const [selectSongId, setSelectSongId] = useState(null);
    const [isDispatched,setIsDispatched] = useState(false)

    const handlPlayMusic = (id) => {
        setSelectSongId(id);
        
        if (selectSongId === null) dispatch(setPlay(true))

        if (currunSongId !== id) {
            dispatch(setCurSong(id));
            dispatch(setPlay(true));
            dispatch(setSongChanged(false))
            dispatch(setIsSlidebarRight(true))
            if (!isDispatched) {
                dispatch(setTitleKey('BXH nhạc yêu thích', '/BXH-nha-yeu-thich'))
                dispatch(setSongDataSlideBarRight(songs))
                dispatch(setSection(null, musicSections.FAVORITE_MUSIC))
                setIsDispatched(true)
            }
        }
        
        if (selectSongId === id && loader) {
            dispatch(setSongChanged(false))
            isPlay ? dispatch(setPlay(false)) : dispatch(setPlay(true));
        }
    };
    const handlSeeMore = (ref) => {
        setRef(ref)
    }
    const handl = (e) => {
        setSeeMore(e)
    }
    useOnClickOutside(ref, handl)

    const handlFavourite = async(id)=>{
        if(bearer_token !== null){
            const response = await userFavourite('song',id,bearer_token)
            if(response.data.status === 200){
                if(response.data.data.favourited){
                    dispatch(setFavouriteSong(id))
                    toast.success("Đã thêm bài hát vào thư viên");
                }else{                  
                    dispatch(setFavouriteSongRemove(id))
                    toast.success("Đã gỡ bài hát khỏi thư viên");
                }
            }else{
                toast.success("Lỗi server!");
            }
        }else{
            toast.warning("Bạn cần đăng nhập tài khoản!");
        }
    }


    return (
        <div>
            {songs?.map((item, index) => (
                <div key={index}>
                    <ItemFavorites
                        number={index + 1}
                        id={item.id}
                        item={item}
                        handlPlayMusic={handlPlayMusic}
                        isPlay={isPlay}
                        loader={loader}
                        currunSongId={currunSongId}
                        selectSongId={selectSongId}
                        handlSeeMore={handlSeeMore}
                        seeMore={seeMore}
                        handlFavourite={handlFavourite}
                    />
                </div>
            ))}
        </div>
    );
};
export default ListSongFavoties;
