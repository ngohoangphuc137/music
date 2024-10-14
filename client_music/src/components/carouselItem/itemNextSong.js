const ItemNextSong = ({ dataNext }) => {
  return (
    <div>
      {dataNext?.length > 0 ? (
        <div className="w-[265px]  bg-[#25272B] rounded-2xl">
          <div className="p-3 py-[3.5px]">
            <h2 className="text-[14px] text-color-custom font-normal py-1">
              Phát tiếp theo
            </h2>
            <div className="flex items-center flex-shrink flex-grow py-[3px] w-full">
              <div className="w-[40px] h-[40px] rounded overflow-hidden mr-2 flex-shrink-0 flex-grow-0">
                <img
                  className="w-full h-full"
                  src={dataNext[0].thumbnail}
                  alt=""
                />
              </div>
              <div className="flex flex-col flex-1 w-full">
                <h3
                  className="text-[15px]  inline-block max-w-[75%] 
                  overflow-hidden text-ellipsis whitespace-pre leading-[1.3] font-semibold"
                >
                  {dataNext[0].name}    
                </h3>
                <div className="max-w-[70%] inline-block overflow-hidden whitespace-pre text-ellipsis">
                  <h3 className="text-[13px] text-color-custom font-medium flex">
                    {dataNext[0]?.artist
                      ?.map((item, index) => <p key={index}>{item.name}</p>)
                      .reduce((prev, curr) => [prev, ", ", curr])}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default ItemNextSong;
