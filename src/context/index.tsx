import { combineReducers, legacy_createStore as createStore } from "redux";
import postsReducer from "./postsReducer";
import ScrollPageReducer from "./ScrollPagereducer";
import sumOfTrashcanreducer from "./trashCanListReducer";
import trashCanListreducer from "./trashCanListReducer";
import ordersReducer from "./ordersReducer";

const rootReducer = combineReducers({
  postsRed: postsReducer,
  ScrollRed: ScrollPageReducer,
  CanRed: sumOfTrashcanreducer,
  CanListRed: trashCanListreducer,
  orderRed: ordersReducer,
});

const store = createStore(rootReducer);

export default store;
