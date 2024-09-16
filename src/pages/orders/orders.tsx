import React, { useEffect } from "react";
import { random } from "mathjs";
import css from "./orders.module.css";
import { useAppDispatch, useAppSelector } from "../../store";
import notImage from "./notImage.jpg";
import { localGetList } from "../../store/trashCanListReducer";
import { localGetSum } from "../../store/sumOfTrashcanReducer";
import { localGetOrders } from "../../store/ordersReducer";

export default function Orders() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orderSlice.orders);
  useEffect(() => {
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
    <main>
      <div className={css.ordersMainDiv}>
        {orders.map((order) => (
          <div className={css.ordersDiv} key={random(1000000, 2000000)}>
            <div className={css.flexOrderDiv}>
              <p className={css.order}>Заказ</p>
              <p className={css.orderId}>№{order.id}</p>
            </div>
            <div className={css.ordersPicture} key={random(1000000, 2000000)}>
              {order.images.map((image) => (
                <img
                  key={random(1000000, 2000000)}
                  className={css.loadPicture}
                  src={String(image)}
                  width="48"
                  height="48"
                  alt="ordersImage"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = notImage;
                  }}
                />
              ))}
            </div>
            <div className={css.orderBigDiv}>
              <div className={css.orderDivData}>
                <p className={css.oformlenoData}>Оформлено</p>
                <p className={css.orderData}>{order.data}</p>
              </div>
              <div className={css.orderDivSum}>
                <p className={css.orderNaSum}>На сумму</p>
                <p className={css.orderSum}>{order.orderSum} ₽</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
