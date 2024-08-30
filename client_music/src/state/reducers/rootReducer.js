/* eslint-disable no-unused-vars */
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import HomeReducer from "./homeReducer";
import SongReducer from "./songReducer";

const Config = {
    storage: storage,
    stateReconciler:autoMergeLevel2 
}
const persistConfigSong = {
    key: 'songId',
    ...Config,
    whitelist: ['currunSongId'], //Các reducer cần lưu trữ
  };

const RootReducer = combineReducers({
    home: HomeReducer,
    song:persistReducer(persistConfigSong,SongReducer)
})
export default RootReducer