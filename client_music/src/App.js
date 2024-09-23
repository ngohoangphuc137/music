/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { PublicRoutes } from "~/routers";
import DefaultLayout from "~/layouts/DefaultLayout";
import { genreParent } from "./services/genreAlbumServicer";
import { setGenreParent } from "./state/actions/home";

function App() {
  const dispatch = useDispatch();
  const { genre_parent } = useSelector(state => state.home)
  useEffect(() => {
    const fetchApi = async () => {
      const response = await genreParent()
      if (response.data.status === 200) {
        dispatch(setGenreParent(response.data.data))
      }
    }
    if (genre_parent === null) fetchApi()
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {
            PublicRoutes.map((route, index) => {
              const Page = route.component

              if (route.layoutChilrden) {
                return (
                  <Route key={index} path={route.path} element={<Page />}>
                    {route.layoutChilrden.map((routeChilrend, index) => {
                      const PageChilrden = routeChilrend.component
                      return (<Route key={index} path={routeChilrend.path} element={<PageChilrden />} />)
                    })}
                  </Route>
                )
              } else {
                return (
                  <Route key={index} path={route.path} element={<Page />} />
                )
              }
            })
          }
        </Route>
      </Routes>
    </div>
  );
}

export default App;
