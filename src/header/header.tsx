import css from "./header.module.css";
import logo from "./Logo.svg";
import trashCan from "./trashCan.svg";
import TrashCan from "../trashCan/trashCan.tsx";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const trashCanList = useSelector((state) => state.CanListRed.trashCanList);
  const [openTrashCan, setopenTrashCan] = useState(0);
  const [activeSection, setActiveSection] = useState(1);

  return (
    <header className={css.header}>
      <img className={css.logoImg} src={logo} alt="logo" />
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
