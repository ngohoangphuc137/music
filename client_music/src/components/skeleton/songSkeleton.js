const SongSkeleton = ({count}) => {
    return Array(count).fill(0).map((_,index)=>(
        <div key={index} className="w-auto rounded">
            <div className="flex items-center text-left rounded select-none p-3">
                <div className="flex w-1/2 mr-[10px] flex-shrink-0 flex-grow-0">
                    <div className="mr-2">
                        <span className="animate-pulse block w-[35px] h-[35px] rounded bg-[hsla(0,0%,100%,0.1)]"></span>
                    </div>
                    <div className="flex flex-col w-full overflow-hidden" >
                        <span className="animate-pulse bg-imgCustom pb-3 w-4/5 rounded bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                        <span className="animate-pulse bg-imgCustom pb-3 mt-2 w-2/5 rounded bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                    </div>
                </div>
                <div className="flex-grow flex-shrink text-left self-center w-0" >
                    <span className="animate-pulse bg-imgCustom pb-3 w-[30px] rounded bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                </div>
                <div className="ml-[10px] flex-shrink-0 flex-grow-0" >
                    <span className="animate-pulse mr-1 bg-imgCustom h-[20px] w-[20px] rounded-[50%] bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                    <span className="animate-pulse mr-1 bg-imgCustom h-[20px] w-[20px] rounded-[50%] bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                    <span className="animate-pulse mr-1 bg-imgCustom h-[20px] w-[20px] rounded-[50%] bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                    <span className="animate-pulse mr-1 bg-imgCustom h-[20px] w-[20px] rounded-[50%] bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                </div>
            </div>
        </div>
    ))
};
export default SongSkeleton;
