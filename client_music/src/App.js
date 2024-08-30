/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";

import { PublicRoutes } from "~/routers";
import DefaultLayout from "~/layouts/DefaultLayout";
import { getIdSong } from "./services/musicServicer";
import { setCurSong } from "./state/actions/song";
import { setLoader } from "./state/actions/song";


function App() {
  const dispatch = useDispatch()
  const { currunSongId } = useSelector(state => state.song)

  useEffect(() => {
    dispatch(setLoader(false))
    if (currunSongId == null) {
      const songId = async () => {
        const response = await getIdSong()
        const id = response.data.data.idSong;
        if (response.status === 200) {
          dispatch(setLoader(true))
          dispatch(setCurSong(id))
        }
      }
      songId()
    }
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {
            PublicRoutes.map((route, index) => {
              const Page = route.component
              return (
                <Route key={index} path={route.path} element={<Page />} />
              )
            })
          }
        </Route>
      </Routes>
    </div>
  );
}

export default App;
