import { Route, Routes } from "react-router-dom";
import Main from "../main/main";
import PageElement from "../pages/pageElement/pageElement";
import React from "react";
import Orders from "../pages/orders/orders";
import { useAppSelector } from "../store/index";
import { random, round } from "mathjs";

export default function Content() {
  const posts = useAppSelector((state) => state.postsSlice.posts);
  return (
    <Routes>
      <Route path="/orders" element={Orders()} />
      <Route path="/product/*" element={<p>This task is not existing</p>} />
      {posts.map((post, index) => (
        <Route
          key={round(random(1000000, 2000000))}
          path={`/product/${post.id}`}
          element={<PageElement indexOfPost={index} />}
        />
      ))}
      <Route path="*" element={<Main />} />
    </Routes>
  );
}
