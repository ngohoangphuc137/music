/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive'

import { SongItem } from "~/components/carouselItem";
import { getHome } from "~/services/homeServicer";
import { actionHome } from "~/state/actions/home";
import Album from "~/components/carouselItem/itemAlbum";
import { setCurSong, setPlay } from "~/state/actions/song";
import HomeSkeleton from "~/components/skeleton/homeSkelaton";
import { setSongDataSlideBarRight, setTitleKey, setSection, setSongChanged } from "~/state/actions/song";
import musicSections from "~/utils/musicSections";

export const Homecontext = createContext();

const Home = () => {
  const dispatch = useDispatch();
  const { favoriteMusic, topic1, topic2, album } = useSelector((state) => state.home);
  const { currunSongId, isPlay, loader } = useSelector((state) => state.song);
  const [selectSongId, setSelectSongId] = useState(null);
  const [loading, setloading] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false)
  const maxW768 = useMediaQuery({ query: '(max-width:768px)' })

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
      dispatch(setSongChanged(false))
      if (!isDispatched) {
        setIsDispatched(false)
        dispatch(setSongDataSlideBarRight(favoriteMusic?.item))
        dispatch(setTitleKey('BXH nhạc yêu thích', '/BXH-nha-yeu-thich'))
        dispatch(setSection(null, musicSections.FAVORITE_MUSIC))
      }
    }
    if (selectSongId === id) {
      isPlay ? dispatch(setPlay(false)) : dispatch(setPlay(true))
      dispatch(setSongChanged(false))
    }
  }

  return (
    <Homecontext.Provider value={[isPlay, loader, handlPlaying]}>
      <div className={`lg:px-[59px] sm:px-[20px] min-[300px]:px-3 ${maxW768 ? 'relative h-[calc(100vh-135px-60px)]' : 'absolute lg:mt-[70px] sm:mt-[40px] min-[300px]:mt-[30px]'} inset-0`} >
        {loading && (
          <div className="container">
            <div className="pt-[32px] text-white">
              <div>
                <h3 className={`${maxW768 ? 'mb-[0px]' : 'mb-[20px]'} text-[20px] font-bold`}>
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
                <h3 className={`${maxW768 ? 'mb-[0px]' : 'mb-[20px]'} text-[20px] font-bold`}>{topic1?.title}</h3>
                <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`}>
                  {Object.keys(topic1).length > 0
                    && topic1.item.filter((_, index) => (maxW768 ? index < 3 : index < 5))
                      .map((item) => (
                        <Album
                          key={item.id}
                          id={item.id}
                          title={item.title}
                          aliasTitle={item.aliasTitle}
                          thumbnail={item.thumbnail}
                          description={item.description}
                          isAlbum={item.isAlbum}
                          userType={item.userType}
                        />
                      ))}
                </div>
              </div>
              <div className="w-auto mt-8">
                <h3 className={`${maxW768 ? 'mb-[0px]' : 'mb-[20px]'} text-[20px] font-bold`}>{topic2?.title}</h3>
                <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`}>
                  {Object.keys(topic2).length > 0
                    && topic2.item.filter((_, index) => (maxW768 ? index < 3 : index < 5))
                      .map((item) => (
                        <Album
                          key={item.id}
                          id={item.id}
                          title={item.title}
                          aliasTitle={item.aliasTitle}
                          thumbnail={item.thumbnail}
                          description={item.description}
                          isAlbum={item.isAlbum}
                          userType={item.userType}
                        />
                      ))}
                </div>
              </div>
              <div className="w-auto mt-8">
                <h3 className={`${maxW768 ? 'mb-[0px]' : 'mb-[20px]'} text-[20px] font-bold`}>{album?.title}</h3>
                <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`}>
                  {Object.keys(album).length > 0
                    && album.item.filter((_, index) => (maxW768 ? index < 3 : index < 5))
                      .map((item) => (
                        <Album
                          key={item.id}
                          id={item.id}
                          aliasTitle={item.aliasTitle}
                          title={item.title}
                          thumbnail={item.thumbnail}
                          description={item.description}
                          isAlbum={item.isAlbum}
                          artist={item.artist}
                          userType={item.userType}
                        />
                      ))}
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
