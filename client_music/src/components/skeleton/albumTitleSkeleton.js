import { useMediaQuery } from 'react-responsive'
const AlbumTitleSkeleton = () => {
    const maxW768 = useMediaQuery({ query: '(max-width:768px)' })
    return (
        <div className="flex relative w-full mt-[35px]" >
            <span className={`animate-pulse bg-imgCustom ${maxW768 ? 'w-[150px] h-[150px]' : 'w-[200px] h-[200px]'} mr-5 rounded-lg bg-[hsla(0,0%,100%,0.1)]`}></span>
            <div className="flex flex-col flex-1" >
                <span className="animate-pulse h-5 w-4/5 mt-4 rounded bg-[hsla(0,0%,100%,0.1)]"></span>
                <span className="animate-pulse h-3 w-[65%] mt-4 rounded-xl bg-[hsla(0,0%,100%,0.1)]"></span>
                <span className="animate-pulse h-3 w-[65%] mt-2 rounded-xl bg-[hsla(0,0%,100%,0.1)]"></span>
                <div className="mt-5 flex items-center" >
                    <span className="animate-pulse bg-imgCustom h-[35px] w-[150px] rounded-full bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                    <span className="animate-pulse mr-1 bg-imgCustom mx-2 h-[35px] w-[35px] rounded-[50%] bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                    <span className="animate-pulse mr-1 bg-imgCustom mx-2 h-[35px] w-[35px] rounded-[50%] bg-no-repeat inline-block bg-[hsla(0,0%,100%,0.1)] bg-[length:190px_100%]"></span>
                </div>
            </div>
        </div>
    )
}
export default AlbumTitleSkeleton