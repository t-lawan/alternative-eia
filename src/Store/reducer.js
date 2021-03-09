import { LOADING, HAS_LOADED,IS_LOADING, STOP_LOADING } from "./action";

const initalState = {
  has_loaded: false,
  is_loading: false,
  loaded: 0.0,
  total: 1.0,
};


export const reducer = (state = initalState, action) => {
    switch (action.type) {
      case HAS_LOADED:
        return {
          ...state,
          has_loaded: true,
          loaded: 0.0,
          total: 1.0,
          is_loading: false,
        };
      case STOP_LOADING:
        return {
          ...state,
          has_loaded: false,
          loaded: 0.0,
          total: 1.0,
          is_loading: false,
        };
      case IS_LOADING:
        return {
          ...state,
          is_loading: true,
        };
      case LOADING:
        return {
          ...state,
          loaded: action.loaded,
          total: action.total
        };
      default:
        return state;
    }
  };
  
