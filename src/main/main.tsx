"use client";
import { useEffect, useState } from "react";
import css from "./main.module.css";
import Stars from "../utils/stars/stars";
import { Link } from "react-router-dom";
import React from "react";
import { addPosts, nullPosts } from "../store/postsReducer";
import { plusPage, nullPage, minusPage } from "../store/ScrollPagereducer";
import { localGetList } from "../store/trashCanListReducer";
import { useAppDispatch, useAppSelector } from "../store";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { random, round } from "mathjs";
import notImage from "./notImage.jpg";
import { localGetSum } from "../store/sumOfTrashcanReducer";
import { localGetOrders } from "../store/ordersReducer";
import orders from "../pages/orders/orders";
import Filter from "../filter/filter";
import defaultValue from "./defaultValue";

export default function Main() {
  const [name, setName] = useState("");
  const [costFrom, setcostFrom] = useState(0);
  const [costTo, setcostTo] = useState(0);
  const [ratingFrom, setRatingFrom] = useState(0);
  const [ratingTo, setRatingTo] = useState(0);
  const [categoriesList, setCategoriesList] = useState(defaultValue);
  const dispatch = useAppDispatch();
  const [inLoad, setinLoad] = useState(true);
  const posts = useAppSelector((state) => state.postsSlice.posts);
  const page = useAppSelector((state) => state.ScrollPageSlice.page);
  const [flag, setFlag] = useState(true);
  const [figna, setFigna] = useState(false);
  const loadNewProducts = async () => {
    try {
      setFigna(true);
      console.log(
        (
          `https://skillfactory-task.detmir.team/products?&page=${page}&limit=15` +
          categoriesList.map((categoriesListEl) => {
            return `&categoryNames${categoriesListEl}`;
          })
        )
          .replace(/,/g, "")
          .replace(/ /g, "%20")
      );
      setFlag(false);
      const res = await axios.get(
        (
          `https://skillfactory-task.detmir.team/products?&page=${page}&limit=15` +
          categoriesList.map((categoriesListEl) => {
            return `&categoryNames${categoriesListEl}`;
          })
        )
          .replace(/,/g, "")
          .replace(/ /g, "%20")
      );
      const newestPosts = res.data.data.filter(
        (item: { id: number }) => !posts.find((el) => el.id == item.id)
      );
      if (newestPosts.length == 0) {
        setinLoad(false);
        return;
      } else {
        dispatch(addPosts(newestPosts));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    if (flag == false) {
      console.log(2);
      dispatch(nullPosts());
      if (page == 1) {
        dispatch(minusPage());
      } else {
        dispatch(nullPage());
      }
    }
  }, [categoriesList]);
  useEffect(() => {
    console.log(1);
    if (figna) {
      if (page == 0) {
        dispatch(plusPage());
      } else {
        loadNewProducts();
      }
    }
  }, [page]);
  function checkImage(url: string) {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onload = function () {
      if (request.status == 200) {
        //if(statusText == OK)
        console.log("image exists");
        return 1;
      } else {
        console.log("image doesn't exist");
        return 0;
      }
    };
    request.send();
  }
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
    dispatch(localGetList());
    dispatch(localGetSum());
    dispatch(localGetOrders());
  }, []);
  useEffect(() => {
    if (orders.length != 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);
  return (
    <main className={css.main}>
      <Filter
        setName={setName}
        setcostTo={setcostTo}
        setcostFrom={setcostFrom}
        setratingFrom={setRatingFrom}
        setratingTo={setRatingTo}
        categoriesList={categoriesList}
        setcategoriesList={setCategoriesList}
      />
      <div className={css.AlMain}>
        <InfiniteScroll
          dataLength={posts.length}
          next={() => {
            dispatch(plusPage());
          }}
          hasMore={inLoad}
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
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = notImage;
                  }}
                />
              </Link>
              <Link to={`/product/${post.id}`} className={css.pictureTitle}>
                {post.title}
              </Link>
              <div
                className={css.StarsDiv}
                onClick={() => checkImage(post.picture)}
              >
                {Stars(post.rating)}
              </div>
              <p className={css.picturePrice}>{post.price} ₽</p>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </main>
  );
}
