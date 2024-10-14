import { useEffect, useState } from "react"

import { TopicHome } from "~/services/topicServicer"
import ItemTopic from "~/components/carouselItem/itemTopic"
import PlayListSkeleton from "~/components/skeleton/playListSkeleton"
import { useMediaQuery } from 'react-responsive'
const Topic = () => {
    const [itemTopic, setItemTopic] = useState(null)
    const [loading, setloading] = useState(false);
    const maxW768 = useMediaQuery({ query: '(max-width:768px)' })
    useEffect(() => {
        const homeTopic = async () => {
            const response = await TopicHome()
            if (response.data.status === 200) {
                setItemTopic(response.data.data)
                setloading(true)
            }

        }
        homeTopic()
    }, [])

    return (
        <div className={`lg:px-[59px] sm:px-[20px] min-[300px]:px-3  ${maxW768 ? 'relative h-[calc(100vh-135px-60px)]' : 'absolute mt-[70px]'} inset-0 text-white`} >
            <div className="w-auto" >
                {loading && (itemTopic?.map(item => (<ItemTopic key={item.id} data={item} flag={true} />)))}
                {!loading && <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`} ><PlayListSkeleton count={23} /></div>}
            </div>
        </div>
    )
}
export default Topic