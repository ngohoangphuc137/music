import { Link } from "react-router-dom"
import Icons from "../icons"
import Album from "./itemAlbum"
import { useMediaQuery } from 'react-responsive'
const { GrNext } = Icons

const ItemTopic = ({ data, flag }) => {
    const maxW768 = useMediaQuery({ query: '(max-width:768px)' })
    return (
        <div className="w-auto">
            <div className={`${maxW768 ? 'mt-3' : 'mt-6'} flex items-center justify-between`}>
                <h3 className={`font-semibold ${maxW768 ? 'text-[17px]' : 'text-[22px]'}`}>{data?.title}</h3>
                {flag
                    ?
                    <Link
                        to={`/chu-de/${data?.aliasTitle}/${data?.id}`}
                        className="text-[13px] font-medium cursor-pointer uppercase flex hover:text-[#c273ed] items-center text-[hsla(0,0%,100%,0.5)]">
                        Tất cả <GrNext size={13} className="font-semibold" />
                    </Link>
                    : ""}
            </div>
            <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`} >
                {flag
                    ?
                    (data?.item_Topic.filter((_, index) => (maxW768 ? index < 3 : index < 5)).map(item => (
                        <Album
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            aliasTitle={item.aliasTitle}
                            thumbnail={item.thumbnail}
                            description={item.description}
                            isAlbum={item.isAlbum}
                            userType={item.userType}
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
                            userType={item.userType}
                        />
                    )))
                }
            </div>
        </div>
    )
}
export default ItemTopic