/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

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
    <GoogleOAuthProvider clientId="810261128693-p9ugv8tnitlt8647ntao7k210nhpucqi.apps.googleusercontent.com">
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
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
