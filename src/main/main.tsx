"use client";
import { useEffect } from "react";
import css from "./main.module.css";
import Stars from "../utils/stars/stars";
import { Link } from "react-router-dom";
import React from "react";
import { addPosts } from "../store/postsReducer";
import { plusPage } from "../store/ScrollPagereducer";
import { useAppDispatch, useAppSelector } from "../store";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { random, round } from "mathjs";

export default function Main() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.postsSlice.posts);
  const page = useAppSelector((state) => state.ScrollPageSlice.page);
  const loadNewProducts = async () => {
    try {
      const res = await axios.get(
        `https://skillfactory-task.detmir.team/products?&page=${page}&limit=15`
      );
      const newestPosts = res.data.data.filter(
        (item: { id: number }) => !posts.find((el) => el.id == item.id)
      );
      dispatch(addPosts(newestPosts));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.message);
    }
    dispatch(plusPage());
  };

  window.onscroll = function () {
    if (document.documentElement.scrollTop) {
      localStorage.setItem(
        "ScrollerHeight",
        `${document.documentElement.scrollTop}`
      );
    }
  };
  useEffect(() => {
    if (posts.length < 15) {
      loadNewProducts();
    }
    window.scrollTo(0, Number(localStorage.getItem("ScrollerHeight")));
  }, []);

  return (
    <main className={css.main}>
      <div>
        <InfiniteScroll
          dataLength={posts.length}
          next={() => {
            loadNewProducts();
          }}
          hasMore={true}
          loader={<h4 className={css.Loading}>Загрузка...</h4>}
          className={css.pictureSection}
        >
          {posts.map((post) => (
            <div
              className={css.pictureDiv}
              key={round(random(1000000, 2000000))}
            >
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
              <div className={css.StarsDiv}>{Stars(post.rating)}</div>
              <p className={css.picturePrice}>{post.price} ₽</p>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </main>
  );
}
