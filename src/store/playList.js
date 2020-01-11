import {SET_PLAY_INDEX, SET_PLAY_LIST} from "./action";

function playList(state = {data:[],source:'',ids:[],playIndex:0}, action) {
  switch (action.type) {
    case SET_PLAY_LIST:
      return {
        ...state,
        data: action.data,
        source: action.source,
        ids:action.ids,
      };
      case SET_PLAY_INDEX:
      return {
        ...state,
        playIndex: action.index,
      };
    default:
      return state
  }
}

export default playList