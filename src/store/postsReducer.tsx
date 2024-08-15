import { createSlice } from "@reduxjs/toolkit";
interface OrderInt {
  posts: {
    id: number;
    picture: string;
    title: string;
    rating: number;
    price: number;
    description: string;
  }[];
}
const initialState: OrderInt = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {
    addPosts(state, action) {
      state.posts = [...state.posts, ...action.payload];
    },
  },
});

export default postsSlice.reducer;
export const { addPosts } = postsSlice.actions;
