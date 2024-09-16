import { useState, useEffect } from "react";
import css from "./pageElement.module.css";
import backArrow from "./Shape.svg";
import React from "react";
import Stars from "../../utils/stars/stars.tsx";
import { useAppDispatch, useAppSelector } from "../../store";
import { trashCanListSlice } from "../../store/trashCanListReducer";
import { sumOfTrashcanSlice } from "../../store/sumOfTrashcanReducer";
import notImage from "./notImage.jpg";
const { addCanList, deleteCanList, minusCanList, plusCanList } =
  trashCanListSlice.actions;
const { minusCan, plusCan } = sumOfTrashcanSlice.actions;

export default function PageElement(props: { indexOfPost: number }) {
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

  const handleAdd = (post: { price: number }) => {
    dispatch(addCanList(post));
    //setproductsQuantity((productsQuantity) => productsQuantity + 1);
    dispatch(plusCan(post.price));
  };

  const trashCanList = useAppSelector(
    (state) => state.trashCanListSlice.trashCanList
  );
  const sumOfTrashcan = useAppSelector(
    (state) => state.sumOfTrashcanSlice.sumOfTrashcan
  );
  const indexOfPost = props.indexOfPost;
  useEffect(() => {
    if (
      trashCanList.find(
        (trashCanListElement: { id: number }) =>
          Number(trashCanListElement.id) == Number(post.id)
      )
    ) {
      setproductsQuantity(
        trashCanList.find(
          (trashCanListElement: { id: number }) =>
            Number(trashCanListElement.id) == Number(post.id)
        ).quantity
      );
    } else {
      setproductsQuantity(0);
    }
  }, [trashCanList]);
  const [productsQuantity, setproductsQuantity] = useState(0);
  const posts = useAppSelector((state) => state.postsSlice.posts);

  const post: {
    description: string;
    picture: string;
    title: string;
    rating: number;
    price: number;
    id: number;
  } = posts[indexOfPost];
  useEffect(() => {
    localStorage.setItem("trashCan", JSON.stringify(trashCanList));
    localStorage.setItem("trashCanSum", JSON.stringify(sumOfTrashcan));
  }, [trashCanList]);
  return (
    <div className={css.uppestDiv}>
      <div className={css.mainObject}>
        <img
          className={css.loadPicture}
          src={post.picture}
          alt={`${post.title}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = notImage;
          }}
        />
        <div className={css.bigDiv}>
          <p className={css.pictureTitle}>{post.title}</p>
          {Stars(post.rating)}
          <p className={css.picturePrice}>{post.price} ₽</p>
          {!productsQuantity ? (
            <button
              onClick={() => {
                handleAdd(post);
                setproductsQuantity((productsQuantity) => productsQuantity + 1);
              }}
              className={css.trashCan}
            >
              <p className={css.trashCanText}>Добавить в корзину</p>
            </button>
          ) : (
            <div className={css.quantityDiv}>
              <div
                className={css.minus}
                onClick={() => {
                  if (
                    trashCanList.find(
                      (trashCanListEl) => trashCanListEl.id == post.id
                    ).quantity == 1
                  ) {
                    dispatch(deleteCanList(post.id));
                    dispatch(minusCan(post.price));
                    setproductsQuantity(0);
                  } else {
                    handleClickMinus(trashCanList, post, productsQuantity - 1);
                    setproductsQuantity(
                      (productsQuantity) => productsQuantity - 1
                    );
                  }
                }}
              >
                -
              </div>
              <div className={css.quantityP}>{productsQuantity}</div>
              <div
                className={css.plus}
                onClick={() => {
                  setproductsQuantity(
                    (productsQuantity) => productsQuantity + 1
                  );
                  handleClickPlus(post, productsQuantity + 1);
                }}
              >
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
    </div>
  );
}
