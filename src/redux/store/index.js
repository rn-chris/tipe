import { createStore } from "redux";
import rootReducer from "../reducers/index";
// import { forbiddenWordsMiddleware } from "../middleware";
// const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  
);
export default store;