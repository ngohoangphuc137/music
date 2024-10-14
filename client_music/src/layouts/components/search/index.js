import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import HeadlessTippy from "@tippyjs/react/headless";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Icons from "~/components/icons";
import WrapperSearch from "~/components/popper/wrapperSearch";
import { searchSuggestions } from "~/services/searchSevicer";
import { useDebounce } from "~/hooks";
import SearchItem from "~/components/searchItem/searchItem";
import path from "~/utils/path";
import actionType from "~/state/actions/actionType";
import { loadingSearch } from "~/state/actions/search";

const { GoSearch, IoCloseOutline, RiLoader2Line } = Icons;

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounce = useDebounce(searchValue, 500);
  const isSearch = useMediaQuery({ query: '(max-width:630px)' })

  const location = useLocation()
  useEffect(() => {
    const pathUrl = location.pathname.split('/').filter(Boolean)
    if (pathUrl.length < 1 || pathUrl[0] !== path.SEARCH) {
      setSearchValue("")
      setSearchResult([])
      dispatch({
        type: actionType.SEARCH_TYPE,
        data: null
      })
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [location])

  useEffect(() => {
    if (!debounce.trim()) {
      setSearchResult([]);
      return;
    }

    const getSearchApi = async () => {
      setLoading(true);
      const response = await searchSuggestions(debounce);
      if (response.data.status === 200) {
        setSearchResult(response.data.data);
        setLoading(false);
      }
    };
    getSearchApi();
  }, [debounce]);

  const hanldShowResult = () => {
    setShowResult(false);
  };

  const handlClear = () => {
    setSearchValue("");
    setShowResult(false);
    setSearchResult([]);
  };

  const hanldOnchangeInput = (e) => {
    const seachValue = e.target.value;
    if (!seachValue.startsWith(" ")) {
      setSearchValue(seachValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.currentTarget.tagName === 'BUTTON') {
      setShowResult(false)
      setSearchValue(searchValue.trim())
      e.target.blur()
      dispatch(loadingSearch(false))
      navigate({
        pathname: `/${path.SEARCH}/${path.SEARCH_ALL}`,
        search: createSearchParams({
          q: searchValue.trim()
        }).toString().replace(/\+/g, '%20')
      })
    }
  }

  return (
    <div className={`relative w-[100%] lg:max-w-[440px] sm:max-w-[400px] ${isSearch ? 'max-w-[300px] mr-1' : ''}`}>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        offset={[0, 0]}
        placement="bottom"
        render={(attrs) => (
          <div className="" tabIndex="-1" {...attrs}>
            {!isSearch && (
              <WrapperSearch>
                <div className="font-bold px-[10px] pb-2 text-[14px]">
                  Gợi ý kết quả
                </div>
                {searchResult?.map((item, index) => (
                  <SearchItem
                    key={index}
                    data={item}
                    setSearchResult={setSearchResult}
                    setSearchValue={setSearchValue}
                  />
                ))}
              </WrapperSearch>
            )}
          </div>
        )}
        onClickOutside={hanldShowResult}
      >
        <div
          className={`h-[40px] relative ${showResult && searchResult.length > 0 && !isSearch
            ? "rounded-t-[20px] bg-[#34224f]"
            : "rounded-[20px] bg-active-bg"
            }`}
        >
          <button
            onClick={handleKeyDown}
            className="flex items-center">
            <GoSearch
              size={20}
              className="absolute top-[10px] left-[10px] text-[#dadada]"
            />
          </button>
          <div className="absolute top-0 left-[38px] right-[10px] bottom-0">
            <input
              value={searchValue}
              onChange={(e) => hanldOnchangeInput(e)}
              onFocus={() => setShowResult(true)}
              spellCheck={false}
              onKeyUp={handleKeyDown}
              type="text"
              className="w-[95%] top-[2px] text-[14.5px] py-[5px] bg-clip-padding outline-none leading-[34px] inline-block bg-transparent text-[#eee] h-[34px] relative border-0"
              placeholder="Tìm kiếm bài hát"
            />
          </div>
          {showResult && searchValue !== "" && !loading && (
            <button onClick={() => handlClear()} className="flex items-center">
              <IoCloseOutline
                size={20}
                className="absolute top-[10px] right-[10px] text-[#dadada]"
              />
            </button>
          )}
          {loading && !isSearch && (
            <button className="absolute top-[10px] right-[10px] text-[#dadada]">
              <RiLoader2Line size={20} className="loaderSong" />
            </button>
          )}
        </div>
      </HeadlessTippy>
    </div>
  );
};
export default Search;
