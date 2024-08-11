"use client";
import { useEffect, useState } from "react";
import css from "./main.module.css";
import Stars from "../Stars/stars";
import { Link } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Main() {
  const [flag, setFlag] = useState(0);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsRed.posts);
  const page = useSelector((state) => state.ScrollRed.page);

  const loadNewProducts = async () => {
    try {
      console.log(page);
      const res = await fetch(
        `https://skillfactory-task.detmir.team/products?&page=${page}&limit=15`,
        { credentials: "include" }
      );
      const data = await res.json();
      const newestPosts = data.data.filter(
        (item) => !posts.some((post) => post.id === item.id)
      );
      dispatch({ type: "ADD_POSTS", newPosts: newestPosts });
    } catch (err) {
      console.error(err.message);
    }
    dispatch({ type: "PLUS_PAGE" });
    if (flag === 0) {
      dispatch({ type: "MINUS_PAGE" });
      setFlag(1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, Number(localStorage.getItem("ScrollerHeight")));
    loadNewProducts();
  }, []);

  window.onscroll = function () {
    if (document.documentElement.scrollTop) {
      localStorage.setItem(
        "ScrollerHeight",
        `${document.documentElement.scrollTop}`
      );
    }
  };

  return (
    <main className={css.main}>
      <section className={css.pictureSection}>
        {posts.map((post) => (
          // eslint-disable-next-line react/jsx-key
          <div className={css.pictureDiv} key={post.id}>
            <Link to={`/product/${post.id}`} className={css.pictureLink}>
              <img
                className={css.loadPicture}
                src={post.picture}
                width="250"
                height="250"
                alt={`${post.title}`}
              />
            </Link>
            <Link to={`/product/${post.id}`} className={css.pictureTitle}>
              {post.title}
            </Link>
            <div className={css.StarsDiv}>{Stars(post.rating, post.id)}</div>
            <p className={css.picturePrice}>{post.price} ₽</p>
          </div>
        ))}
      </section>

      {<h4 className={css.Loading}>Загрузка...</h4>}
    </main>
  );
}
