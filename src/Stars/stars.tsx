import React from "react";
import fullStar from "./Fillness=Full.svg";
import halfStar from "./Fillness=Half.svg";
import noneStar from "./Fillness=None.svg";
import { round } from "mathjs";
import css from "./star.module.css";

export default function Stars(rating: number) {
  // eslint-disable-next-line react/jsx-key, array-callback-return
  const fullStars = Array.from({ length: 5 }, (_item, index) => {
    if (rating - index > 0 && rating - index < 1) {
      return (
        <img
          key={index}
          className={`star`}
          src={halfStar}
          width="12"
          height="12"
          alt="star"
        />
      );
    }
    if (round(rating) - index > 0) {
      return (
        <img
          key={index}
          width="12"
          height="12"
          className={`star`}
          src={fullStar}
          alt="star"
        />
      );
    }
    if (round(rating) - index < 0) {
      return (
        <img
          key={index}
          width="12"
          height="12"
          className={`star`}
          src={noneStar}
          alt="star"
        />
      );
    }
  });
  return <div className={css.pictureStars}>{fullStars}</div>;
}
