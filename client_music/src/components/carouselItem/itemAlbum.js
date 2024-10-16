import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
const Album = ({ id, title, aliasTitle, thumbnail, description, isAlbum, artist, userName = null, userType }) => {
  const maxW768 = useMediaQuery({ query: '(max-width:768px)' })
  return (
    <div className={`lg:w-[88%] group mx-[14px] mt-4`} title={title}>
      <div>
        <div>
          <Link to={`/${userType === 2 ? 'playlist' : 'album'}/${aliasTitle}/${id}`} className="z-[1]" draggable="false">
            <div className="rounded-[4px] w-[100%] h-[100%] overflow-hidden block relative">
              <img
                className="w-auto h-[100%] duration-[0.7s] ease-out group-hover:scale-[1.1]"
                src={thumbnail}
                alt=""
              />
              <div className="absolute w-[100%] h-[100%] group-hover:bg-[rgba(0,0,0,0.5)] top-0 left-0 z-[8]"></div>
              {/* <div className="absolute items-center hidden group-hover:block group-hover:z-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex items-center content-center">
                  <button className="rounded-[50%] hover:bg-active-bg flex items-start justify-center">
                    <IoMdHeartEmpty size={25} className="m-2" />
                  </button>
                  <button className="rounded-[50%] border-[#ffff] border-[1px] mx-5 border-solid flex items-start justify-center">
                    <FaPlay size={25} className="m-2 pl-[5.5px]" />
                  </button>
                  <button className="rounded-[50%] hover:bg-active-bg flex items-start justify-center">
                    <RxDotsHorizontal size={25} className="m-2" />
                  </button>
                </div>
              </div> */}
            </div>
          </Link>
        </div>
        <div className="mt-3">
          <h3 className="text-[15px] font-normal leading-[1.33] text-[hsla(0,0%,100%,0.5)]">
            <span className={`text-white ${maxW768 ? 'text-[12.5px]' : 'text-[15px]'} font-medium w-[100%] inline-block max-w-[100%] overflow-hidden whitespace-pre text-ellipsis`}>
              {isAlbum ? (
                <span className="font-semibold text-[#f6f5f5] w-[80%] inline-block max-w-[100%] overflow-hidden whitespace-pre text-ellipsis">{title}</span>
              ) : description == null ? (
                title
              ) : (
                description
              )}
            </span>
          </h3>
          <>
            {isAlbum && artist !== undefined ? (
              <h4 className="limit-text text-[hsla(0,0%,100%,0.5)] text-[14px]">
                {artist
                  .map((item) => <Link to={`/nghe-si/${item.name}`} key={item.id} className="hover:underline" >{item.name}</Link>)
                  .reduce((prev, curr) => [prev, ", ", curr])}
              </h4>
            ) : (
              ""
            )}
            {userName !== null && (<h4 className="limit-text text-[hsla(0,0%,100%,0.5)] font-medium text-[14px]">{userName}</h4>)}
          </>
        </div>
      </div>
    </div>
  );
};
export default Album;
