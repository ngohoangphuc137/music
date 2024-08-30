/* eslint-disable no-unused-vars */
import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import RootReducer from './reducers/rootReducer'
import {persistStore} from 'redux-persist'

const StoreConfig = () => {
    const store = createStore(
        RootReducer,
        applyMiddleware(thunk)
    )
    let persistor = persistStore(store)

    return { store, persistor }
}
export default StoreConfig