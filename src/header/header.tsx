import css from "./header.module.css";
import logo from "./Logo.svg";
import trashCan from "./trashCan.svg";
import TrashCan from "../pages/trashCan/trashCan";
import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store";
import sign from "./Sign.svg";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const trashCanList = useAppSelector(
    (state) => state.trashCanListSlice.trashCanList
  );
  const [openTrashCan, setopenTrashCan] = useState(false);
  const [activeSection, setActiveSection] = useState(1);
  useEffect(() => {
    if (location.pathname == "/orders") {
      setActiveSection(0);
    }
  }, []);
  return (
    <header className={css.header}>
      <Link
        to={``}
        onClick={() => setActiveSection(1)}
        className={css.logoSign}
      >
        <img className={css.logoSign} src={sign} alt="logo" />
      </Link>
      <Link to={``} onClick={() => setActiveSection(1)} className={css.logoImg}>
        <img className={css.logoImg} src={logo} alt="logo" />
      </Link>
      <section className={css.middleSection}>
        <Link
          to={``}
          onClick={() => setActiveSection(1)}
          className={activeSection ? css.activeEl : css.notActiveEl}
        >
          Товары
        </Link>
        <Link
          to={`/orders`}
          onClick={() => setActiveSection(0)}
          className={!activeSection ? css.activeEl : css.notActiveEl}
        >
          Заказы
        </Link>
      </section>
      <div
        className={css.lastSection}
        onClick={() => setopenTrashCan(!openTrashCan)}
      >
        <img className={css.trashCan} src={trashCan} alt="trashCan" />
        <p className={css.trash}>Корзина ({trashCanList.length})</p>
      </div>
      {openTrashCan ? <TrashCan /> : ""}
    </header>
  );
}
