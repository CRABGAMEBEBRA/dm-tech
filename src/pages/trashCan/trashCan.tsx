import css from "./trashCan.module.css";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { orderSlice } from "../../store/ordersReducer";
import { trashCanListSlice } from "../../store/trashCanListReducer";
import { sumOfTrashcanSlice } from "../../store/sumOfTrashcanReducer";
const { deleteCanList, minusCanList, plusCanList } = trashCanListSlice.actions;
const { minusCan, plusCan } = sumOfTrashcanSlice.actions;
import notImage from "./notImage.jpg";
import { Link } from "react-router-dom";

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
      dispatch(minusCan(post.price));
      dispatch(deleteCanList(post.id));
      dispatch(minusCanList([post, productsQuantity]));
    } else {
      dispatch(minusCan(post.price));
      dispatch(minusCanList([post, productsQuantity]));
    }
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
  useEffect(() => {
    localStorage.setItem("trashCan", JSON.stringify(trashCanList));
    localStorage.setItem("trashCanSum", JSON.stringify(sumOfTrashcan));
  }, [trashCanList]);
  return (
    <div className={css.trashCanDiv}>
      {trashCanList.map((post) => (
        <div className={css.itemDiv} key={post.id}>
          <Link to={`/product/${post.id}`}>
            <img
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = notImage;
              }}
              className={css.image}
              src={post.image}
              alt="elementImage"
            />
          </Link>
          <Link to={`/product/${post.id}`} className={css.pictureTitle}>
            {post.title}
          </Link>
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
            if (trashCanList.length != 0) {
              dispatch(addOrders([trashCanList, sumOfTrashcan]));
              dispatch(nulLCanList());
              dispatch(nulLCan());
            }
          }}
        >
          Оформить заказ
        </div>
      )}
    </div>
  );
}
