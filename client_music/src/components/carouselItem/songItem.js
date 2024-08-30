import { Link } from "react-router-dom";
import { useContext } from "react";
import { Homecontext } from "~/pages/Home";

import Icons from "../icons";

const { RxDotsHorizontal, FaPlay,RiLoader2Line } = Icons;

const SongItem = ({ id,thumb, name, artist,selectSongId }) => {
  const [isPlay,loader,handlPlaying] = useContext(Homecontext)
  return (
    <div className={
      selectSongId === id ?'mx-2 rounded-[1px] active-song mt-1 group':'mx-2 rounded-[1px] hover:bg-border-player mt-1 group'
    }>
      <div className="flex items-center p-[10px] text-left">
        <div className="flex-shrink-[1] flex-grow-[1] flex">
          <div className="song-thumb cursor-pointer relative overflow-hidden rounded-[4px] mr-[10px] flex-shrink-0 w-[60px] h-[60px]">
            <img className="w-auto" src={thumb} alt="" />
            <div className="absolute w-[100%] h-[100%] group-hover:bg-[rgba(0,0,0,0.5)] top-0 left-0 z-0"></div>
            <div className="actionPlaying absolute hidden group-hover:block top-0 left-0 right-0 bottom-0 z-[2]">
              <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                <button onClick={()=>handlPlaying(id)}>
                {
                        isPlay && selectSongId === id ? (
                          loader ? (
                            <i
                              className={`iconActiconPlay ${loader ? "" : "hidden"
                                } inline-block w-4 h-4 bg-no-repeat bg-cover m-2 pl-[5px]`}
                            ></i>
                          ) : (
                            <RiLoader2Line
                              size={24}
                              className="loaderSong m-2"
                            />
                          )
                        ) : (
                          <FaPlay />
                        )
                      }
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="max-w-[100%]">
              <Link to={"/"} className="text-[16px] leading-[1.3] font-medium">
                {name}
              </Link>
            </div>
            <h3 className="text-[13.5px] text-color-custom">
              {artist
                .map((item) => (
                  <Link
                    key={item.id}
                    to={'nghe-si/'+item.alias}
                    className="hover:underline hover:text-[#c273ed]"
                  >
                    {item.name}
                  </Link>
                ))
                .reduce((prev, curr) => [prev, ", ", curr])}
            </h3>
          </div>
        </div>
        <div className="hover-items hidden group-hover:block">
          <div className="flex content-center">
            <button className="p-1 mx-1 text-[15px] hover:bg-active-bg rounded-[50%]">
              <RxDotsHorizontal className="p-[0.8px] m-1" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SongItem;
