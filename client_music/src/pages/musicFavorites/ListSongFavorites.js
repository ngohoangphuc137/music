import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ItemFavorites from "~/components/carouselItem/itemFavorites";
import { setPlay, setCurSong } from "~/state/actions/song";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import { setTitleKey, setSongDataSlideBarRight, setSection } from "~/state/actions/song"
import musicSections from "~/utils/musicSections"

const ListSongFavoties = ({ songs }) => {
    const dispatch = useDispatch();
    const { currunSongId, isPlay, loader } = useSelector((state) => state.song);
    const [ref, setRef] = useState(null);
    const [seeMore, setSeeMore] = useState(false);
    const [selectSongId, setSelectSongId] = useState(null);
    let isDispatched = false;

    const handlPlayMusic = (id) => {
        setSelectSongId(id);
        if (selectSongId === null) dispatch(setPlay(true))

        if (currunSongId !== id) {
            dispatch(setCurSong(id));
            dispatch(setPlay(true));
            if (!isDispatched) {
                dispatch(setTitleKey('BXH nhạc yêu thích', '/BXH-nha-yeu-thich'))
                dispatch(setSongDataSlideBarRight(songs))
                dispatch(setSection(null, musicSections.FAVORITE_MUSIC))
                isDispatched = true
            }
        }
        
        if (selectSongId === id && loader) {
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


    return (
        <div>
            {songs?.map((item, index) => (
                <div key={index}>
                    <ItemFavorites
                        number={index + 1}
                        item={item}
                        handlPlayMusic={handlPlayMusic}
                        isPlay={isPlay}
                        loader={loader}
                        currunSongId={currunSongId}
                        selectSongId={selectSongId}
                        handlSeeMore={handlSeeMore}
                        seeMore={seeMore}
                    />
                </div>
            ))}
        </div>
    );
};
export default ListSongFavoties;
