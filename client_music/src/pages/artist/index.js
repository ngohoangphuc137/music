import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Icons from "~/components/icons";
import { ArtistServicer } from "~/services/artistServicer";
import SelectItem from "~/components/carouselItem/selectItem";
import Album from "~/components/carouselItem/itemAlbum";
import { setInfoSongArtist } from "~/state/actions/artist";
import { setTemporaryDataRight } from "~/state/actions/song";
import hocSong from "~/components/HOC/hocSong";
import NoSearchData from "~/components/searchItem/noSearchData";

const { TbUserPlus, FaPlay, GrNext,GiMicrophone } = Icons;

const Artist = ({ Context }) => {
  const { alias } = useParams();
  const dispatch = useDispatch();
  const [songs, setSongs] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [InfoArtist, SetInfoArtist] = useState({
    id: null,
    name: null,
    national: null,
    thumbnail: null,
    totalFollow: null,
  });

  useEffect(() => {
    const infoArtist = async () => {
      const response = await ArtistServicer(alias);
      if (response.data.status === 200) {
        const info = response.data.data;
        dispatch(setInfoSongArtist(info.id, info.name));
        dispatch(
          setTemporaryDataRight(
            info.sections.find((item) => item.sectionId === "songs").item
          )
        );
        setSongs(() =>
          info.sections.find((item) => item.sectionId === "songs")
        );
        setAlbums(() =>
          info.sections.find((item) => item.sectionId === "album")
        );
        SetInfoArtist(() => ({
          id: info.id,
          name: info.name,
          national: info.national,
          thumbnail: info.thumbnail,
          totalFollow: info.totalFollow,
        }));
      }
    };
    infoArtist();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [alias]);

  return (
    <>
      <div className="absolute inset-0 text-white">     
        <div className="artist-page">
          <div className="artist-hero relative w-auto mt-[-70px] mb-[30px] pt-32 overflow-hidden">
            <div className="absolute inset-0 w-full h-auto right-0">
              <div
                className="blur filterCustom block bg-cover h-full absolute inset-0 bg-no-repeat"
                style={{
                  backgroundImage: `url(${InfoArtist?.thumbnail})`,
                }}
              ></div>
              <div className="bg-[rgba(41,21,71,0.7)] h-full absolute inset-0 block"></div>
            </div>
            <div className="w-full mt-[70px] px-[59px] h-full relative pb-6">
              <div className="flex flex-shrink flex-grow">
                <figure className="w-[140px] h-[140px] overflow-hidden rounded-full mr-8">
                  <img
                    className="w-full h-auto"
                    src={InfoArtist?.thumbnail}
                    alt=""
                  />
                </figure>
                <div className="flex flex-col">
                  <div className="flex items-center mb-3">
                    <h3 className="text-[55px] font-bold">
                      {InfoArtist?.name}
                    </h3>
                    <button className="w-[50px] h-[50px] ml-3 bg-[#9b4de0] rounded-full cursor-pointer border-[#9b4de0] text-white p-0 lineNormal flex items-center justify-center">
                      <FaPlay className="ml-1 mr-0 inline-block" size={23} />
                    </button>
                  </div>
                  <div>
                    <span>Quốc gia: {InfoArtist?.national}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-6 text-[16px] text-white font-normal">
                      {InfoArtist?.totalFollow} người quan tâm
                    </span>
                    <button className="bg-transparent lineNormal py-[4px] uppercase px-6 border-[1px] border-solid border-[hsla(0,0%,100%,0.1)] text-[#fff] rounded-[100px] m-0 flex justify-center items-center font-normal">
                      <TbUserPlus className="mr-1" size={16} />
                      <span className="text-[13.5px] font-normal">
                        Quan tâm
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-[59px] h-full">
          {songs?.item.length <= 0 && albums?.item.length <= 0 && <NoSearchData Icon={<GiMicrophone className="text-6xl" />} text={'Dữ liệu của ca sĩ này chưa cập nhật'} />}
            <div className="w-auto">
              {songs?.item.length > 0 && (
                <div className="w-auto">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-[22px] font-semibold">
                      {songs?.title}
                    </h3>
                    <Link
                      to={"/nghe-si/" + alias + "/bai-hat"}
                      className="text-[13px] font-medium cursor-pointer uppercase flex hover:text-[#c273ed] items-center text-[hsla(0,0%,100%,0.5)]"
                    >
                      Tất cả <GrNext size={13} className="font-semibold" />
                    </Link>
                  </div>
                  <div className="grid md:grid-cols-2">
                    {songs?.item
                      ?.filter((item, index) => index < 6)
                      .map((item) => (
                        <SelectItem
                          key={item.id}
                          id={item.id}
                          isLuMusic={false}
                          thumbnail={item.thumbnail}
                          name={item.name}
                          artist={item.artist}
                          album={item.album}
                          thumbnailAlbum={item.album?.thumbnail}
                          duration={item.duration}
                          composers={item.composers}
                          genre={item.genre}
                          totalListens={item.totalListens}
                          totalFavourited={item.totalFavourited}
                          isAlbum={item.album?.isAlbum}
                          Themecontext={Context}
                        />
                      ))}
                  </div>
                </div>
              )}
              {albums?.item.length > 0 && (
                <div className="w-auto mt-9">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-[22px] font-semibold">
                      {albums?.title}
                    </h3>
                    <Link
                      to={"/nghe-si/" + alias + "/album"}
                      className="text-[13px] font-medium uppercase flex hover:text-[#c273ed] items-center text-[hsla(0,0%,100%,0.5)]"
                    >
                      Tất cả <GrNext size={13} className="font-semibold" />
                    </Link>
                  </div>
                  <div className="grid md:grid-cols-5">
                    {albums?.item
                      .filter((item, index) => index < 5)
                      .map((item) => (
                        <Album
                          key={item.id}
                          id={item.id}
                          title={item.title}
                          aliasTitle={item.aliasTitle}
                          thumbnail={item.thumbnail}
                          description={item.description}
                          isAlbum={item.isAlbum}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default hocSong(Artist, true, "ARTIST_SONGS");
