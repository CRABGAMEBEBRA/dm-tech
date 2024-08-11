import css from "./trashCan.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TrashCan() {
  const dispatch = useDispatch();
  const trashCanList = useSelector((state) => state.CanListRed.trashCanList);
  const sumOfTrashcan = useSelector((state) => state.CanRed.sumOfTrashcan);

  const handleClickMinus = (post) => {
    if (
      trashCanList.find(
        (trashCanListElement) =>
          Number(trashCanListElement.index) == Number(post.index)
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
        productsQuantity: post.quantity,
      });
    }
    dispatch({
      type: "MINUS_CAN",
      newsumOfTrashcan: post.price,
    });
  };

  const handleClickPlus = (post) => {
    dispatch({
      type: "PLUS_ITEM",
      post: post,
      productsQuantity: post.quantity,
    });
    dispatch({
      type: "PLUS_CAN",
      newsumOfTrashcan: post.price,
    });
  };

  return (
    <div className={css.trashCanDiv}>
      {trashCanList.map((post) => (
        <div className={css.itemDiv} key={post.id}>
          <img className={css.image} src={post.image} alt="elementImage" />
          <p className={css.pictureTitle}>{post.title}</p>
          <div className={css.quantityDiv}>
            <div className={css.minus} onClick={() => handleClickMinus(post)}>
              -
            </div>
            <div className={css.quantityP}>{post.quantity}</div>
            <div className={css.plus} onClick={() => handleClickPlus(post)}>
              +
            </div>
          </div>
          <div className={css.MainSumDiv}>
            <p className={css.singlePrice}>{post.price} ₽ за шт.</p>
            <p className={css.MainSum}>{post.price * post.quantity} ₽</p>
          </div>
        </div>
      ))}
      <div className={css.Itogo}>
        <p className={css.costItog}>Итого</p>
        <p className={css.sumItog}>{sumOfTrashcan} ₽</p>
      </div>
      {sumOfTrashcan > 10000 ||
      trashCanList.includes(
        (trashCanListElement) => trashCanListElement.quantity >= 10
      ) ? (
        <div className={css.tooMuch}>Вы выбрали слишком много товара</div>
      ) : (
        <div
          className={css.zakaz}
          onClick={() => {
            dispatch({
              type: "ADD_ORDER",
              trashCanList: trashCanList,
              sumOfTrashcan: sumOfTrashcan,
            });
            dispatch({
              type: "NULL_ITEMS",
            });
            dispatch({
              type: "NULL_CAN",
            });
          }}
        >
          Оформить заказ
        </div>
      )}
    </div>
  );
}
