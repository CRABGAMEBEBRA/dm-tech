import { random, round } from "mathjs";
import css from "./stars.module.css";
import React from "react";
import fullStar from "./Fillness=Full (1).svg";
import halfStar from "./Fillness=Half (1).svg";
import noneStar from "./Fillness=None (1).svg";

const Stars = (rating: number) => {
  const fullStars = Array.from([0, 1, 2, 3, 4], (index: number) => {
    if (rating - index > 0 && rating - index < 1) {
      return (
        <img
          key={round(random(1000000, 2000000))}
          className={`star`}
          src={halfStar}
          alt="star"
        />
      );
    }
    if (round(rating) - index > 0) {
      return (
        <img
          key={round(random(1000000, 2000000))}
          className={`star`}
          src={fullStar}
          alt="star"
        />
      );
    }
    if (round(rating) - index < 0) {
      return (
        <img
          key={round(random(1000000, 2000000))}
          className={`star`}
          src={noneStar}
          alt="star"
        />
      );
    }
  });
  return <div className={css.pictureStars}>{fullStars}</div>;
};
export default Stars;
