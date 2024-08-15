import postsSlice from "./postsReducer";
import ScrollPageSlice from "./ScrollPagereducer";
import sumOfTrashcanSlice from "./sumOfTrashcanReducer";
import trashCanListSlice from "./trashCanListReducer";
import orderSlice from "./ordersReducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  orderSlice,
  postsSlice,
  ScrollPageSlice,
  sumOfTrashcanSlice,
  trashCanListSlice,
});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
export const store = configureStore({
  reducer: {
    orderSlice,
    postsSlice,
    ScrollPageSlice,
    sumOfTrashcanSlice,
    trashCanListSlice,
  },
});

export const useAppDispatch = () =>
  useDispatch<ReturnType<typeof setupStore>["dispatch"]>();
export const useAppSelector =
  useSelector.withTypes<ReturnType<typeof store.getState>>();
