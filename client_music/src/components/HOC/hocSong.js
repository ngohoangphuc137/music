import { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    setCurSong,
    setPlay,
    setIsSlidebarRight,
    setTitleKey,
    setSongDataSlideBarRight,
    setSection,
    setTemporaryDataRight,
} from "~/state/actions/song";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import musicSections from "~/utils/musicSections";

const ThemeContext = createContext();

const hocSong = (Component, isDispatched = false, typeSong = null) => {
    return (props) => {
        const dispatch = useDispatch();
        const { currunSongId, isPlay, loader, temporaryDataRight } = useSelector(
            (state) => state.song
        );
        const { infoArtist } = useSelector(state => state.artist)
        const [seeMore, setSeeMore] = useState(false);
        const [ref, setRef] = useState(null);
        const [isSetslideRight, setIsSetslideRight] = useState(false);

        const dispatchData = () => {            
            dispatch(setIsSlidebarRight(false));
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
            }
            if (currunSongId === id && loader) {
                isPlay ? dispatch(setPlay(false)) : dispatch(setPlay(true));
            }
            if (!isSetslideRight && isDispatched && typeSong !== null) dispatchData();
        };
        const handlSeeMore = (ref) => {
            setRef(ref);
        };
        const handl = (e) => {
            setSeeMore(e);
        };
        useOnClickOutside(ref, handl);

        return (
            <ThemeContext.Provider
                value={[
                    handlPlayMusic,
                    handlSeeMore,
                    isPlay,
                    seeMore,
                    currunSongId,
                ]}
            >
                <Component {...props} Context={ThemeContext} />
            </ThemeContext.Provider>
        );
    };
};
export default hocSong;
