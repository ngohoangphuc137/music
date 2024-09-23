const ArtistSkeleton = ({ count }) => {
    return Array(count).fill(0).map((_, index) => (
        <div key={index} className="w-1/5 relative mt-1 px-3 mb-3">
            <div className="block relative overflow-hidden">
                <div>
                    <span className="animate-pulse bg-imgCustom rounded-[50%] w-full bg-no-repeat inline-block h-0 pb-[100%] bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                </div>
                <div className="flex items-center flex-col">
                    <span className="animate-pulse mt-2 bg-imgCustom pb-3 w-full rounded-lg bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                    <span className="animate-pulse my-[7px] bg-imgCustom pb-2 w-3/5 rounded-lg bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                    <span className="animate-pulse bg-imgCustom h-[30px] w-[112px] rounded-full bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                </div>
            </div>
        </div>
    ))
};
export default ArtistSkeleton;
