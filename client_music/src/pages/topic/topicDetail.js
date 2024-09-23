import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ItemTopic from "~/components/carouselItem/itemTopic"

import { Topic_Detail } from "~/services/topicServicer"
import PlayListSkeleton from "~/components/skeleton/playListSkeleton"

const TopicDetail = () => {
    const { id } = useParams();
    const [topicDetail, setTopicDetail] = useState();
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const getTopicDetai = async () => {
            const response = await Topic_Detail(id)
            if (response.data.status === 200) {
                setTopicDetail(response.data.data)
                setloading(true)
            }
        }
        getTopicDetai()
    }, [id])

    return (
        <div className="mt-[70px] px-[59px] absolute inset-0 text-white" >
            <div className="w-auto mt-6" >
                <>
                    {loading && <ItemTopic data={topicDetail} flag={false} />}
                    {!loading && <div className="grid md:grid-cols-5" ><PlayListSkeleton count={23} /></div>}
                </>
            </div>
        </div>
    )
}
export default TopicDetail