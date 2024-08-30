import Icons from "~/components/icons"

const { GoSearch } = Icons

const Search = () => {
    return (
       <div className="relative w-[100%] max-w-[440px]">
         <div className="bg-active-bg h-[40px] relative rounded-[20px]">
            <button className="flex items-center" ><GoSearch size={20} className="absolute top-[10px] left-[10px] text-[#dadada]" /></button>
            <div className="absolute top-0 left-[38px] right-[10px] bottom-0" >
                <input type="text" 
                className="w-[95%] top-[2px] text-[14.5px] py-[5px] bg-clip-padding outline-none leading-[34px] inline-block bg-transparent text-[#eee] h-[34px] relative border-0"
                placeholder="Tìm kiếm bài hát"
                />
            </div>
        </div>
       </div>
    )
}
export default Search