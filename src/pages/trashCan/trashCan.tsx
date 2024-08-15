import css from "./trashCan.module.css";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { orderSlice } from "../../store/ordersReducer";
import { trashCanListSlice } from "../../store/trashCanListReducer";
import { sumOfTrashcanSlice } from "../../store/sumOfTrashcanReducer";
const { deleteCanList, minusCanList, plusCanList } = trashCanListSlice.actions;
const { minusCan, plusCan } = sumOfTrashcanSlice.actions;

export default function TrashCan() {
  const dispatch = useAppDispatch();
  const handleClickPlus = (
    post: { price: number },
    productsQuantity: number
  ) => {
    dispatch(plusCanList([post, productsQuantity]));
    dispatch(plusCan(post.price));

    //setproductsQuantity((productsQuantity) => productsQuantity + 1);
  };

  const handleClickMinus = (
    trashCanList: { id: number; quantity: number }[],
    post: { price: number; id: number },
    productsQuantity: number
  ) => {
    if (
      trashCanList.find(
        (trashCanListElement) =>
          Number(trashCanListElement.id) == Number(post.id)
      ).quantity == 1
    ) {
      dispatch(deleteCanList(post));
    } else {
      dispatch(minusCanList([post, productsQuantity]));
    }
    dispatch(minusCan(post.price));
    //setproductsQuantity((productsQuantity) => productsQuantity - 1);
  };
  const { addOrders } = orderSlice.actions;
  const { nulLCanList } = trashCanListSlice.actions;
  const { nulLCan } = sumOfTrashcanSlice.actions;
  const trashCanList = useAppSelector(
    (state) => state.trashCanListSlice.trashCanList
  );
  const sumOfTrashcan = useAppSelector(
    (state) => state.sumOfTrashcanSlice.sumOfTrashcan
  );

  return (
    <div className={css.trashCanDiv}>
      {trashCanList.map((post) => (
        <div className={css.itemDiv} key={post.id}>
          <img className={css.image} src={post.image} alt="elementImage" />
          <p className={css.pictureTitle}>{post.title}</p>
          <div className={css.quantityDiv}>
            <div
              className={css.minus}
              onClick={() =>
                handleClickMinus(trashCanList, post, post.quantity - 1)
              }
            >
              -
            </div>
            <div className={css.quantityP}>{post.quantity}</div>
            <div
              className={css.plus}
              onClick={() => handleClickPlus(post, post.quantity + 1)}
            >
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
      trashCanList.includes((trashCanListElement) => {
        trashCanListElement.quantity >= 10;
      }) ? (
        <div className={css.tooMuch}>Вы выбрали слишком много товара</div>
      ) : (
        <div
          className={css.zakaz}
          onClick={() => {
            dispatch(addOrders([trashCanList, sumOfTrashcan]));
            dispatch(nulLCanList());
            dispatch(nulLCan());
          }}
        >
          Оформить заказ
        </div>
      )}
    </div>
  );
}
