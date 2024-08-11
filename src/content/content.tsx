import { Route, Routes } from "react-router-dom";
import Main from "../main/main.tsx";
import pageElement from "../pageElement/pageElement.tsx";
import React from "react";
import Orders from "../orders";
import { useSelector } from "react-redux";

export default function Content() {
  const posts = useSelector((state) => state.postsRed.posts);
  return (
    <Routes>
      <Route path="/orders" element={Orders()} />
      <Route path="/product/*" element={<p>This task is not existing</p>} />
      {posts.map((post, index) => (
        <Route
          key={post.id}
          path={`/product/${post.id}`}
          element={pageElement(index)}
        />
      ))}
      <Route path="*" element={<Main />} />
    </Routes>
  );
}
