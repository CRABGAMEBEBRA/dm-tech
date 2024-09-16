import { createSlice } from "@reduxjs/toolkit";

interface OrderInt {
  page: number;
}
const initialState: OrderInt = {
  page: 1,
};

const ScrollpageSlice = createSlice({
  name: "pageSlice",
  initialState,
  reducers: {
    plusPage(state) {
      state.page++;
    },
    minusPage(state) {
      state.page--;
    },
    nullPage(state) {
      state.page = 1;
    },
  },
});

export default ScrollpageSlice.reducer;
export const { plusPage, minusPage, nullPage } = ScrollpageSlice.actions;
