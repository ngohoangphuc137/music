import { memo } from "react";

import SelectItem from "~/components/carouselItem/selectItem"
import hocSong from "~/components/HOC/hocSong";


const TableListSong = ({ playList, isSong = false, Context }) => {

  return (
    <>
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
                  {!isSong && !playList?.isAlbum ? "Album" : ""}
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
            {!isSong
              ? (playList?.song.map((item) => (
                <SelectItem
                  key={item.id}
                  id={item.id}
                  isLuMusic={true}
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
                  Themecontext={Context}
                />
              )))
              : (<SelectItem
                id={playList?.id}
                isLuMusic={true}
                album={playList?.album}
                name={playList?.name}
                thumbnail={playList?.thumbnail}
                thumbnailAlbum={playList?.album?.thumbnail}
                duration={playList?.duration}
                artist={playList?.artist}
                composers={playList?.composers}
                genre={playList?.genre}
                totalListens={playList?.totalListens}
                totalFavourited={playList?.totalFavourited}
                isAlbum={playList?.album?.isAlbum}
                Themecontext={Context}
              />)
            }
          </div>
        </div>
      </div>
    </>
  )
}
export default hocSong(memo(TableListSong), true,'ALBUM')