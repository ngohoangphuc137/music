const PlayListSkeleton = ({ count }) => {
    return Array(count).fill(0).map((_, index) => (
        <div key={index} className="w-full relative mt-5 px-3">
            <div className="block relative overflow-hidden rounded">
                <div>
                    <span className="animate-pulse bg-imgCustom w-full bg-no-repeat inline-block h-0 pb-[100%] bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                </div>
                <div>
                    <span className="animate-pulse bg-imgCustom pb-3 w-full rounded bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                    <span className="animate-pulse bg-imgCustom pb-3 w-3/5 rounded bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                </div>
            </div>
        </div>
    ))
};
export default PlayListSkeleton;
