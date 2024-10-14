import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ItemTopic from "~/components/carouselItem/itemTopic"

import { Topic_Detail } from "~/services/topicServicer"
import PlayListSkeleton from "~/components/skeleton/playListSkeleton"
import { useMediaQuery } from 'react-responsive'
const TopicDetail = () => {
    const { id } = useParams();
    const [topicDetail, setTopicDetail] = useState();
    const [loading, setloading] = useState(false);
    const maxW768 = useMediaQuery({ query: '(max-width:768px)' })
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
        <div className={`lg:px-[59px] sm:px-[20px] min-[300px]:px-3 ${maxW768 ? 'relative h-[calc(100vh-135px-60px)]' : 'absolute mt-[70px]'} inset-0 text-white`} >
            <div className="w-auto" >
                <>
                    {loading && <ItemTopic data={topicDetail} flag={false} />}
                    {!loading && <div className={`grid ${maxW768 ? 'grid-cols-3' : 'md:grid-cols-5'}`} ><PlayListSkeleton count={23} /></div>}
                </>
            </div>
        </div>
    )
}
export default TopicDetail