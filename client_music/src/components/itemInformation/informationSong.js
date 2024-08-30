import { Link } from "react-router-dom"

const InformationSong = ({ artist, album, composers, genre }) => {    
    return (
        <div className="bg-[#34224f] w-[220px] h-auto shadow-[0_0_5px_0_rgba(0,0,0,.2)] rounded-lg py-2" >
            <div className="p-[15px]">
                <div className="item" >
                    <h3 className="text-[hsla(0,0%,100%,0.5)] uppercase text-[13.5px]">Nghệ sĩ</h3>
                    <div>
                        {artist.map(item => (
                            <Link key={item.id} className="not-italic text-white hover:text-[#c273ed]" to={'/'}>{item.name}</Link>
                        )).reduce((prev, curr) => [prev, ", ", curr])}
                    </div>
                </div>
                {album !== null ? (
                    <div className="item" >
                        <h3 className="text-[hsla(0,0%,100%,0.5)] uppercase text-[13.5px]">Album</h3>
                        <div>
                            <Link  className="not-italic text-white hover:text-[#c273ed]" to={`/album/${album.aliasTitle}/${album.id}`}>{album.title}</Link>
                        </div>
                    </div>
                ) : ''}
                <div className="item" >
                    <h3 className="text-[hsla(0,0%,100%,0.5)] uppercase text-[13.5px]">Sáng tác</h3>
                    <div>
                        {composers.map(item => (<Link key={item.id} className="not-italic text-white hover:text-[#c273ed]" to={'/'}>{item.name}</Link>)).reduce((prev, curr) => [prev, ", ", curr])}
                    </div>
                </div>
                <div className="item" >
                    <h3 className="text-[hsla(0,0%,100%,0.5)] uppercase text-[13.5px]">Thể loại</h3>
                    <div>
                        {genre.map(item=>(<Link key={item.id} className="not-italic text-white hover:text-[#c273ed]" to={'/'}>{item.name}</Link>)).reduce((prev, curr) => [prev, ", ", curr])}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InformationSong