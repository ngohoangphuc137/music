
const NoSearchData = ({Icon,text})=>{
 return(
    <div className="w-full relative" >
     <div className="text-[hsla(0,0%,100%,0.5)] w-full mt-7" >
        <div className="w-full py-[30px] min-h-[220px] bg-[hsla(0,0%,100%,0.1)] flex justify-center flex-col items-center" >
            {Icon}
            <span className="text-[16px] leading-normal">{text}</span>
        </div>
     </div>
    </div>
 )
}
export default NoSearchData