import MenuItem from "./MenuItem"
import Icons from "~/components/icons"


const { Library,Home,TbMusicHeart,TitleMusic } = Icons
const Menu = ()=>{
    return(
        <nav>
            <MenuItem title='Thư viện' to={'mymusic'} icon={<Library/>} />
            <MenuItem title='Khám phá' to={''} icon={<Home/>} />
            <MenuItem title='BXH Nhạc Yêu Thích' to={'BXH-nha-yeu-thich'} icon={<TbMusicHeart size={24} className="opacity-[0.8]"/>} />
            <MenuItem title='Chủ Đề' to={'chu-de'} icon={<TitleMusic/>} />
        </nav>
    )
}
export default Menu