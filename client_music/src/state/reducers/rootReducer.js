/* eslint-disable no-unused-vars */
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import HomeReducer from "./homeReducer";
import SongReducer from "./songReducer";
import ArtistReducer from "./artistReducer";
import searchReducer from "./searchReducer";
import UserReducer from "./userReducer";

const Config = {
  storage: storage,
  stateReconciler: autoMergeLevel2
}
const persistConfigHome = {
  key: 'home',
  ...Config,
  whitelist: ['slideBarRight', 'genre_parent'], //Các reducer cần lưu trữ
};
const persistConfigUse = {
  key: 'user',
  ...Config,
  whitelist: ['bearer_token','info_user','favourites'], //Các reducer cần lưu trữ
};
const persistConfigSong = {
  key: 'song',
  ...Config,
  whitelist: ['currunSongId', 'musicSection', 'TITLE_KEY', 'songInfo', 'isShuffle', 'isRepeat','dataSongRecentlyHeard'], //Các reducer cần lưu trữ
};
const persistConfigAstist = {
  key: 'infoArtist',
  ...Config,
  whitelist: ['infoArtist'], //Các reducer cần lưu trữ
};


const RootReducer = combineReducers({
  home: persistReducer(persistConfigHome, HomeReducer),
  song: persistReducer(persistConfigSong, SongReducer),
  artist: persistReducer(persistConfigAstist, ArtistReducer),
  search: searchReducer,
  user: persistReducer(persistConfigUse, UserReducer),
})
export default RootReducer