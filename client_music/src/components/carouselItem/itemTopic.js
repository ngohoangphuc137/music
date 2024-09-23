import { Link } from "react-router-dom"
import Icons from "../icons"
import Album from "./itemAlbum"

const { GrNext } = Icons

const ItemTopic = ({ data, flag }) => {

    return (
        <div className="w-auto">
            <div className="mt-6 flex items-center justify-between">
                <h3 className="text-[22px] font-semibold">{data?.title}</h3>
                {flag
                    ?
                    <Link
                        to={`/chu-de/${data?.aliasTitle}/${data?.id}`}
                        className="text-[13px] font-medium cursor-pointer uppercase flex hover:text-[#c273ed] items-center text-[hsla(0,0%,100%,0.5)]">
                        Tất cả <GrNext size={13} className="font-semibold" />
                    </Link>
                    : ""}
            </div>
            <div className="grid md:grid-cols-5" >
                {flag
                    ?
                    (data?.item_Topic.filter((item, index) => index < 5).map(item => (
                        <Album
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            aliasTitle={item.aliasTitle}
                            thumbnail={item.thumbnail}
                            description={item.description}
                            isAlbum={item.isAlbum}
                        />
                    )))
                    :
                    (data?.item_Topic.map(item => (
                        <Album
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            aliasTitle={item.aliasTitle}
                            thumbnail={item.thumbnail}
                            description={item.description}
                            isAlbum={item.isAlbum}
                        />
                    )))
                }
            </div>
        </div>
    )
}
export default ItemTopic