import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { auth } from "./auth";
import { notes } from "./notes";

const combinedReducers = combineReducers({ auth, notes });

export const store = createStore(
  combinedReducers,
  compose(
    applyMiddleware(ReduxThunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
