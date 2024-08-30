import { Outlet } from "react-router-dom"

import { SlideBarLeft, SlideBarRight } from "../components";
import Header from "../components/Header";
import Player from "../components/player";
import './defaultLayout.css'

const DefaultLayout = () => {
    return (
        <div className="w-full flex relative bg-[#2a1a41]">
            <aside className="w-[240px] z-[100] bg-[#2a1a41]">
                <SlideBarLeft />
            </aside>

            <main className="main-page flex-1 relative overflow-y-auto overflow-hidden scrollbar-hidden z-[90]">
                {/* Header */}
                <Header/>
                <div
                    className="mt-[70px] px-[59px] absolute inset-0">
                    <Outlet />
                </div>
            </main>
          <div className="fixed left-0 bottom-0 z-[100]">
            <div className="overflow-hidden w-auto z-100">
                <SlideBarRight />
            </div>

            <div className="fixed bottom-0 w-[100%] max-h-[70px] z-[100]">
                <Player/>
            </div>
            </div>
        </div>

    )
}
export default DefaultLayout