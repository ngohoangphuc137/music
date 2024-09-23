import { useEffect, useState } from "react"

import { TopicHome } from "~/services/topicServicer"
import ItemTopic from "~/components/carouselItem/itemTopic"
import PlayListSkeleton from "~/components/skeleton/playListSkeleton"

const Topic = () => {
    const [itemTopic, setItemTopic] = useState(null)
    const [loading, setloading] = useState(false);

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
            <div className="mt-[70px] px-[59px] absolute inset-0 text-white" >
                <div className="w-auto mt-6" >
                   {loading && (itemTopic?.map(item=>( <ItemTopic key={item.id} data={item} flag={true} />))) }
                   {!loading && <div className="grid md:grid-cols-5" ><PlayListSkeleton count={23} /></div> }
                </div>
            </div>
    )
}
export default Topic