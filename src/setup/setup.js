import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import { reducer as formReducer } from "redux-form";
import regionsReducer from "../store/reducers/regions";
import territoriesReducer from "../store/reducers/territories";
import graphsReducer from "../store/reducers/graphs";
import initReducer from "../store/reducers/init";
import categoriesReducer from "../store/reducers/categories";
import dealsReducer from "../store/reducers/deals";
import rootSaga from "../store/sagas";

const rootReducer = combineReducers({
  form: formReducer,
  graphs: graphsReducer,
  regions: regionsReducer,
  territories: territoriesReducer,
  init: initReducer,
  categories: categoriesReducer,
  deals: dealsReducer
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

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, sagaMiddleware, thunk))
);
sagaMiddleware.run(rootSaga);

export { store };
