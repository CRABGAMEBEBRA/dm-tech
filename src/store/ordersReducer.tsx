import { random, round } from "mathjs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderInt {
  orders: {
    id: number;
    images: string[];
    data: string;
    orderSum: number;
  }[];
}
const initialState: OrderInt = {
  orders: [],
};

export const orderSlice = createSlice({
  name: "ordersSlice",
  initialState,
  reducers: {
    addOrders(
      state,
      action: PayloadAction<
        [
          {
            id: number;
            title: string;
            image: string;
            quantity: number;
            price: number;
          }[],
          number
        ]
      >
    ) {
      const vr: string[] = [];
      action.payload[0].map((trashCanListElement) =>
        vr.push(trashCanListElement.image)
      );
      state.orders.push({
        id: round(random(1000000, 2000000)),
        images: vr,
        data: new Date().toISOString().slice(0, 10),
        orderSum: action.payload[1],
      });
    },
  },
});

export default orderSlice.reducer;
export const { addOrders } = orderSlice.actions;
