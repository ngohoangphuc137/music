import { useState, memo,createContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import SelectItem from "~/components/carouselItem/selectItem"
import { setPlay, setCurSong } from "~/state/actions/song";
import useOnClickOutside from "~/hooks/useOnClickOutside";

export const Themecontext = createContext();

const TableListSong = ({ playList }) => {
  const dispatch = useDispatch();
  const { currunSongId, isPlay } = useSelector((state) => state.song);
  const [selectSongId, setSelectSongId] = useState(null);
  const [ref, setRef] = useState(null);
  const [seeMore, setSeeMore] = useState(false);

  const handlPlayMusic = (id) => {
    setSelectSongId(id);
    if (currunSongId !== id) {
      dispatch(setCurSong(id))
      dispatch(setPlay(true));
    }
    if (selectSongId === id) {
      isPlay ? dispatch(setPlay(false)) : dispatch(setPlay(true))
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
    <Themecontext.Provider value={[handlPlayMusic,handlSeeMore,isPlay,seeMore,currunSongId,selectSongId]}>
      <div>
        <div>
          <div className="h-11 flex items-center justify-center p-[10px] rounded-[5px] border-b border-solid border-[hsla(0,0%,100%,0.05)]">
            <div className="flex-auto flex-shrink-0 flex-grow-0 w-[50%] ml-[10px]">
              <div>
                <div className="text-[14px] font-medium text-[hsla(0,0%,100%,0.5)]">
                  Bài hát
                </div>
              </div>
            </div>
            <div className="flex-auto flex-shrink flex-grow text-left self-center w-0 ml-[-10px]">
              <div>
                <div className="text-[14px] font-medium text-[hsla(0,0%,100%,0.5)]">
                  {!playList?.isAlbum ? "Album" : ""}
                </div>
              </div>
            </div>
            <div className="flex-auto flex-shrink-0 flex-grow-0 ml-[10px]">
              <div>
                <div className="text-[14px] font-medium text-[hsla(0,0%,100%,0.5)]">
                  Thời lượng
                </div>
              </div>
            </div>
          </div>

          <div>
            {playList?.song.map((item) => (
              <SelectItem
                key={item.id}
                id={item.id}
                album={item.album}
                name={item.name}
                thumbnail={item.thumbnail}
                thumbnailAlbum={playList?.thumbnail}
                duration={item.duration}
                artist={item.artist}
                composers={item.composers}
                genre={item.genre}
                totalListens={item.totalListens}
                totalFavourited={item.totalFavourited}
                isAlbum={playList?.isAlbum}
              />
            ))}
          </div>
        </div>
      </div>
    </Themecontext.Provider>
  )
}
export default memo(TableListSong)