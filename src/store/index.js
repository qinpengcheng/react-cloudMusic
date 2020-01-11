import {createStore,combineReducers} from 'redux'
import playList from './playList'
const storeArr = combineReducers({
  playList:playList
})

export default createStore(storeArr)