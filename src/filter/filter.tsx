import { random } from "mathjs";
import React, { useState } from "react";
import css from "./filter.module.css";

export default function Filter(props: {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setcostTo: React.Dispatch<React.SetStateAction<number>>;
  setcostFrom: React.Dispatch<React.SetStateAction<number>>;
  setratingFrom: React.Dispatch<React.SetStateAction<number>>;
  setratingTo: React.Dispatch<React.SetStateAction<number>>;
  categoriesList: string[];
  setcategoriesList: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const {
    setName,
    setcostTo,
    setcostFrom,
    setratingFrom,
    setratingTo,
    categoriesList,
    setcategoriesList,
  } = props;
  const [activeB, setactiveB] = useState(false);
  const categories = [
    "ANGEL HIGH",
    "Attivio",
    "BAUER",
    "BAZUMI",
    "BabyGo",
    "Babyton",
    "Barbie",
    "CRY BABIES",
    "Cosmodrome Games",
    "Demi Star",
    "Enchantimals",
    "Fisher Price",
    "FurReal Friends",
    "GooJitZu",
    "Harry Potter",
    "Hasbro Games",
    "Hot Wheels",
    "Im.Master",
    "Infinity Nado",
    "Jurassic World",
    "Kiddieland",
    "L.O.L. Surprise!",
    "LEGO",
    "Laffi",
    "Mobicaro",
    "Monopoly",
    "My Little Pony",
    "Nerf",
    "Ocie",
    "PAREMO",
    "PELICAN HAPPY TOYS",
    "Paw Patrol",
    "Pets Alive",
    "Rainbocorns",
    "Rastar",
    "Silverlit",
    "Star Wars",
    "Thomas &Friends",
    "Tiny Love",
    "X-SHOT",
    "YCOO",
    "Zapf Creation",
    "Zeimas",
    "alilo",
    "Полесье",
    "ТОБОТ",
    "УМка",
  ];
  const handleClick = () => {
    setactiveB((activeB) => !activeB);
  };
  return (
    <div>
      <input
        className={css.search}
        placeholder="Название вещи"
        onChange={(e) => setName(e.target.value)}
      />
      <div className={css.mainDiv}>
        <div className={css.costDiv}>
          <p className={css.costFrom}>Цена от</p>
          <input
            type="number"
            onChange={(e) => setcostFrom(Number(e.target.value))}
          />
          <p>до</p>
          <input
            type="number"
            onChange={(e) => setcostTo(Number(e.target.value))}
          />
        </div>
        <div className={css.costDiv}>
          <p className={css.costFrom}>Рейтинг от</p>
          <input
            type="number"
            onChange={(e) => setratingFrom(Number(e.target.value))}
          />
          <p>до</p>
          <input
            type="number"
            onChange={(e) => setratingTo(Number(e.target.value))}
          />
        </div>
        <div>
          <div className={css.categorieDiv}>
            <p className={css.catP} onClick={() => handleClick()}>
              Категории ↓
            </p>
            {activeB ? (
              <div className={css.catBigDiv}>
                {categories.map((categorie) => (
                  <div key={random(1000000, 2000000)} className={css.CatDiv}>
                    <input
                      onChange={() => {
                        if (categoriesList.includes(categorie)) {
                          setcategoriesList((categoriesList: string[]) =>
                            categoriesList.filter(
                              (categoriesListEl: string) =>
                                categoriesListEl != categorie
                            )
                          );
                        } else {
                          setcategoriesList((categoriesList: string[]) => [
                            ...categoriesList.slice(
                              0,
                              categories.indexOf(categorie)
                            ),
                            categorie,
                            ...categoriesList.slice(
                              categories.indexOf(categorie),
                              categoriesList.length
                            ),
                          ]);
                        }
                        console.log(categoriesList);
                      }}
                      className={css.check}
                      type="checkbox"
                      id="scales"
                      name="scales"
                      checked={categoriesList.includes(categorie)}
                    />
                    <p>{categorie}</p>
                  </div>
                ))}
                <input
                  onChange={() => {
                    setcategoriesList([]);
                  }}
                  className={css.check}
                  type="checkbox"
                  id="scales"
                  name="scales"
                  checked={categoriesList.length != 0}
                />
                <p>Сбросить категории</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <p className={css.filterP}>Сбросить фильтры</p>
      </div>
    </div>
  );
}
