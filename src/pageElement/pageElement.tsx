import { useState, useEffect } from "react";
import css from "./pageElement.module.css";
import backArrow from "./Shape.svg";
import backX from "./cancel.png";
import { Link } from "react-router-dom";
import React from "react";
import Stars from "../Stars/stars";
import { useDispatch, useSelector } from "react-redux";

export default function pageElement(indexOfPost: string | number) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsRed.posts);
  const trashCanList = useSelector((state) => state.CanListRed.trashCanList);
  const [productsQuantity, setproductsQuantity] = useState(0);

  useEffect(() => {
    if (
      trashCanList.find(
        (trashCanListElement) =>
          Number(trashCanListElement.index) == Number(post.id)
      )
    ) {
      setproductsQuantity(
        trashCanList.find(
          (trashCanListElement) =>
            Number(trashCanListElement.index) == Number(post.id)
        ).quantity
      );
    } else {
      setproductsQuantity(0);
    }
  }, [trashCanList]);

  const post = posts[indexOfPost];
  const handleClickPlus = () => {
    dispatch({
      type: "PLUS_ITEM",
      post: post,
      productsQuantity: productsQuantity,
    });
    dispatch({
      type: "PLUS_CAN",
      newsumOfTrashcan: post.price,
    });

    setproductsQuantity((productsQuantity) => productsQuantity + 1);
  };

  const handleClickMinus = () => {
    if (
      trashCanList.find(
        (trashCanListElement) =>
          Number(trashCanListElement.index) == Number(post.id)
      ).quantity == 1
    ) {
      dispatch({
        type: "DELETE_ITEM",
        post: post,
      });
    } else {
      dispatch({
        type: "MINUS_ITEM",
        post: post,
        productsQuantity: productsQuantity,
      });
    }
    dispatch({
      type: "MINUS_CAN",
      newsumOfTrashcan: post.price,
    });
    setproductsQuantity((productsQuantity) => productsQuantity - 1);
  };

  const handleAdd = () => {
    dispatch({
      type: "ADD_ITEMS",
      post: post,
    });
    setproductsQuantity((productsQuantity) => productsQuantity + 1);
    dispatch({
      type: "PLUS_CAN",
      newsumOfTrashcan: post.price,
    });
  };

  return (
    <main>
      <Link to={`/`} className={css.LinkBack}>
        <img
          className={css.backX}
          src={backX}
          width="40"
          height="40"
          alt="backX"
        />
      </Link>
      <div className={css.mainObject}>
        <img
          className={css.loadPicture}
          src={post.picture}
          width="374"
          height="374"
          alt={`${post.title}`}
        />
        <div className={css.bigDiv}>
          <p className={css.pictureTitle}>{post.title}</p>
          {Stars(post.rating)}
          <p className={css.picturePrice}>{post.price} ₽</p>
          {!productsQuantity ? (
            <button onClick={() => handleAdd()} className={css.trashCan}>
              Добавить в корзину
            </button>
          ) : (
            <div className={css.quantityDiv}>
              <div className={css.minus} onClick={() => handleClickMinus()}>
                -
              </div>
              <div className={css.quantityP}>{productsQuantity}</div>
              <div className={css.plus} onClick={() => handleClickPlus()}>
                +
              </div>
            </div>
          )}
          <div className={css.mediumDiv}>
            <img
              className={css.backArrow}
              src={backArrow}
              width="17"
              height="15"
              alt="backArrow"
            />
            <p>Условия возврата</p>
          </div>
          <p className={css.warning}>
            Обменять или вернуть товар надлежащего качества можно в течение 14
            дней с момента покупки.
          </p>
          <p className={css.secondWarning}>
            Цены в интернет-магазине могут отличаться от розничных магазинов.
          </p>
        </div>
      </div>
      <div className={css.descriptionDiv}>
        <p className={css.description}>Описание</p>
        <p className={css.postDescription}>{post.description}</p>
      </div>
    </main>
  );
}
