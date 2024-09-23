/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SongItem } from "~/components/carouselItem";
import { getHome } from "~/services/homeServicer";
import { actionHome } from "~/state/actions/home";
import Album from "~/components/carouselItem/itemAlbum";
import { setCurSong, setPlay } from "~/state/actions/song";
import HomeSkeleton from "~/components/skeleton/homeSkelaton";

export const Homecontext = createContext();

const Home = () => {
  const dispatch = useDispatch();
  const { favoriteMusic, topic1, topic2, album } = useSelector((state) => state.home);
  const { currunSongId, isPlay, loader } = useSelector((state) => state.song);
  const [selectSongId, setSelectSongId] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const homeMusic = async () => {
      const response = await getHome();
      if (response.status === 200) {
        setloading(true)
        dispatch(actionHome(response.data.data));
      }
    };
    homeMusic();
  }, []);

  const handlPlaying = (id) => {
    setSelectSongId(id);
    if (currunSongId !== id) {
      dispatch(setCurSong(id))
      dispatch(setPlay(true));
    }
    if (selectSongId === id) {
      isPlay ? dispatch(setPlay(false)) : dispatch(setPlay(true))
    }
  }

  return (
    <Homecontext.Provider value={[isPlay, loader, handlPlaying]}>
        <div className="mt-[70px] px-[59px] absolute inset-0" >
          {loading && (
            <div className="container">
            <div className="pt-[32px] text-white">
              <div>
                <h3 className="mb-[20px] text-[20px] font-bold">
                  {favoriteMusic?.title}
                </h3>
                <div className="grid md:grid-cols-3">
                  {Object.keys(favoriteMusic).length > 0
                    ? favoriteMusic.item.map((item) => (
                      <SongItem
                        key={item.id}
                        id={item.id}
                        thumb={item.thumbnail}
                        name={item.name}
                        artist={item.artist}
                        context={Homecontext}
                      />
                    ))
                    : ""}
                </div>
              </div>
              <div className="w-auto mt-8">
                <h3 className="mb-[20px] text-[20px] font-bold">{topic1?.title}</h3>
                <div className="flex">
                  {Object.keys(topic1).length > 0
                    ? topic1.item.map((item) => (
                      <Album
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        aliasTitle={item.aliasTitle}
                        thumbnail={item.thumbnail}
                        description={item.description}
                        isAlbum={item.isAlbum}
                      />
                    ))
                    : ""}
                </div>
              </div>
              <div className="w-auto mt-8">
                <h3 className="mb-[20px] text-[20px] font-bold">{topic2?.title}</h3>
                <div className="flex">
                  {Object.keys(topic2).length > 0
                    ? topic2.item.map((item) => (
                      <Album
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        aliasTitle={item.aliasTitle}
                        thumbnail={item.thumbnail}
                        description={item.description}
                        isAlbum={item.isAlbum}
                      />
                    ))
                    : ""}
                </div>
              </div>
              <div className="w-auto mt-8">
                <h3 className="text-[20px] font-bold">{album?.title}</h3>
                <div className="flex">
                  {Object.keys(album).length > 0
                    ? album.item.map((item) => (
                      <Album
                        key={item.id}
                        id={item.id}
                        aliasTitle={item.aliasTitle}
                        title={item.title}
                        thumbnail={item.thumbnail}
                        description={item.description}
                        isAlbum={item.isAlbum}
                        artist={item.artist}
                      />
                    ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
          )}
          {!loading && (<HomeSkeleton />)}
        </div>
    </Homecontext.Provider>
  );
};
export default Home;
