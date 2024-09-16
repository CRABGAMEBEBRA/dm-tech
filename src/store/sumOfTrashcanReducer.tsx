import { createSlice } from "@reduxjs/toolkit";

interface OrderInt {
  sumOfTrashcan: number;
}
const initialState: OrderInt = {
  sumOfTrashcan: 0,
};

export const sumOfTrashcanSlice = createSlice({
  name: "sumCanSlice",
  initialState,
  reducers: {
    localGetSum(state) {
      state.sumOfTrashcan = JSON.parse(
        localStorage.getItem("trashCanSum") || "0"
      );
    },
    plusCan(state, action) {
      state.sumOfTrashcan = state.sumOfTrashcan + action.payload;
    },
    minusCan(state, action) {
      state.sumOfTrashcan = state.sumOfTrashcan - action.payload;
    },
    nulLCan(state) {
      state.sumOfTrashcan = 0;
    },
  },
});

export default sumOfTrashcanSlice.reducer;
export const { plusCan, minusCan, nulLCan, localGetSum } =
  sumOfTrashcanSlice.actions;
