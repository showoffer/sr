import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import regionsReducer from "../store/reducers/regions";
import territoriesReducer from "../store/reducers/territories";
import graphsReducer from "../store/reducers/graphs";
import initReducer from "../store/reducers/init";

const rootReducer = combineReducers({
  form: formReducer,
  graphs: graphsReducer,
  regions: regionsReducer,
  territories: territoriesReducer,
  init: initReducer
});

const logger = store => {
  return next => {
    return action => {
      // console.log('[Middleware] Dispatching', action);
      const result = next(action);
      // console.log('[Middleware] next state', store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);
