import { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

import {
    setCurSong,
    setPlay,
    setIsSlidebarRight,
    setTitleKey,
    setSongDataSlideBarRight,
    setSection,
    setTemporaryDataRight,
    setSongChanged,
} from "~/state/actions/song";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import musicSections from "~/utils/musicSections";
import { userFavourite } from "~/services/authServicer";
import { setFavouriteSong, setFavouriteSongRemove } from "~/state/actions/user";
import { removeToPlaylistServicer } from "~/services/authServicer";

const ThemeContext = createContext();

const hocSong = (Component, isDispatched = false, typeSong = null) => {
    return (props) => {
        const dispatch = useDispatch();
        const { currunSongId, isPlay, loader, temporaryDataRight } = useSelector(
            (state) => state.song
        );
        const { bearer_token } = useSelector(state => state.user)
        const { infoArtist } = useSelector(state => state.artist)
        const [seeMore, setSeeMore] = useState(false);
        const [ref, setRef] = useState(null);
        const [isSetslideRight, setIsSetslideRight] = useState(false);

        const dispatchData = () => {            
            //dispatch(setIsSlidebarRight(false));
            setIsSetslideRight(true);
            dispatch(
                setTitleKey(
                    temporaryDataRight?.title,
                    `/album/${temporaryDataRight?.aliasTitle}/${temporaryDataRight?.id}`
                )
            );
            dispatch(setSongDataSlideBarRight(temporaryDataRight?.song ?? temporaryDataRight));
            if (typeSong === musicSections.ALBUM) {
                dispatch(setSection(temporaryDataRight?.id, musicSections.ALBUM))
            } else if (typeSong === musicSections.ARTIST_SONGS) {
                dispatch(setSection(infoArtist?.idArtist, musicSections.ARTIST_SONGS));
            }
            dispatch(setTemporaryDataRight([]))
        };

        const handlPlayMusic = (id) => {
            if (currunSongId !== id) {
                dispatch(setCurSong(id));
                dispatch(setPlay(true));
                dispatch(setSongChanged(true))
                dispatch(setIsSlidebarRight(true))
            }
            if (currunSongId === id && loader) {
                isPlay ? dispatch(setPlay(false)) : dispatch(setPlay(true));
                dispatch(setSongChanged(false))

            }
            if (!isSetslideRight && isDispatched && typeSong !== null) dispatchData();
        };

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

        const handlSeeMore = (ref) => {
            setRef(ref);
        };
        const handl = (e) => {
            setSeeMore(e);
        };
        useOnClickOutside(ref, handl);
        const handlRemoveToPlatlist = async(idSong,idPlaylist)=>{
            const remove = await removeToPlaylistServicer(bearer_token,idPlaylist,idSong)
            if(remove.data.status === 200){
              toast.success('Xoá bài hát ra khỏi playlist thành công')
            }else{
              toast.error("Lỗi")
            }
        }

        return (
            <ThemeContext.Provider
                value={[
                    handlPlayMusic,
                    handlSeeMore,
                    isPlay,
                    seeMore,
                    currunSongId,
                    handlFavourite
                ]}
            >
                <Component {...props} Context={ThemeContext} handlRemoveToPlatlist={handlRemoveToPlatlist} />
            </ThemeContext.Provider>
        );
    };
};
export default hocSong;
