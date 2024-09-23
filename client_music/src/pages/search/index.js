import { Outlet, useLocation, useNavigate, NavLink, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { menuSearch } from "~/utils/menu";
import { loadingSearch } from "~/state/actions/search";
import actionType from "~/state/actions/actionType";

const PageSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkPath, setCheckpath] = useState(null)
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const locationSearch = location.pathname.split("/").filter(Boolean);

    if (!searchParams.get('q')) {
      navigate("/");
      dispatch({
        type: actionType.SEARCH_TYPE,
        data: null
      })
    }
    if (locationSearch.length <= 1 && locationSearch[1] === undefined) {
      navigate("/");
      dispatch({
        type: actionType.SEARCH_TYPE,
        data: null
      })
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [location]);
  
  const handlCheckPath = (pathName) => {
    setCheckpath(pathName)
    if (pathName === checkPath) return
    dispatch(loadingSearch(false))
  }

  return (
    <div className="mt-[60px] px-[59px] absolute inset-0">
      <div className="text-[#fff] pt-5">
        <div className="border-b-[1px] border-[hsla(0,0%,100%,0.1)] mx-[calc(59px*-1)] pl-[59px] mb-7">
          <div className="flex items-center min-h-[32px]">
            <h3 className="text-[25px] font-semibold m-0 pr-5 border-r-[1px] border-[hsla(0,0%,100%,0.1)] leading-normal">
              Kết quả tìm kiếm
            </h3>
            <ul className="flex items-center flex-wrap text-[14.5px] font-medium">
              {menuSearch.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center uppercase relative text-[#dadada] mx-[20px] leading-normal	"
                >
                  <NavLink
                    onClick={() => handlCheckPath(item.path)}
                    className={({ isActive }) =>
                      isActive ? "border-b-[2px] border-[#9b4de0] text-white" : ""
                    }
                    to={`${item.path}?q=${searchParams?.get('q')?.toString()}`}
                  >
                    <p className="py-[15px]">{item.name}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default PageSearch;
