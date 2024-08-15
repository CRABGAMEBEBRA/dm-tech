import { createSlice } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";

interface OrderInt {
  trashCanList: {
    id: number;
    title: string;
    image: string;
    quantity: number;
    price: number;
  }[];
}
const initialState: OrderInt = {
  trashCanList: [],
};

export const trashCanListSlice = createSlice({
  name: "CanListSlice",
  initialState,
  reducers: {
    plusCanList(state, action) {
      const vr: WritableDraft<{
        id: number;
        title: string;
        image: string;
        quantity: number;
        price: number;
      }>[] = [];
      state.trashCanList.map((trashCanListElement) => {
        if (Number(trashCanListElement.id) != Number(action.payload[0].id)) {
          vr.push(trashCanListElement);
        } else {
          vr.push({
            id: trashCanListElement.id,
            title: trashCanListElement.title,
            image: trashCanListElement.image,
            quantity: action.payload[1],
            price: trashCanListElement.price,
          });
        }
      });
      state.trashCanList = vr;
    },
    minusCanList(state, action) {
      const vr: WritableDraft<{
        id: number;
        title: string;
        image: string;
        quantity: number;
        price: number;
      }>[] = [];
      state.trashCanList.map((trashCanListElement) => {
        if (Number(trashCanListElement.id) != Number(action.payload[0].id)) {
          vr.push(trashCanListElement);
        } else {
          vr.push({
            id: trashCanListElement.id,
            title: trashCanListElement.title,
            image: trashCanListElement.image,
            quantity: action.payload[1],
            price: trashCanListElement.price,
          });
        }
      });
      state.trashCanList = vr;
    },
    nulLCanList(state) {
      state.trashCanList = [];
    },
    addCanList(state, action) {
      state.trashCanList = [
        ...state.trashCanList,
        {
          id: action.payload.id,
          title: action.payload.title,
          image: action.payload.picture,
          quantity: 1,
          price: action.payload.price,
        },
      ];
    },
    deleteCanList(state, action) {
      const vr = state.trashCanList.filter(
        (trashCanListEl) => trashCanListEl.id != action.payload
      );
      state.trashCanList = vr;
    },
  },
});

export default trashCanListSlice.reducer;
export const {
  plusCanList,
  minusCanList,
  addCanList,
  nulLCanList,
  deleteCanList,
} = trashCanListSlice.actions;
