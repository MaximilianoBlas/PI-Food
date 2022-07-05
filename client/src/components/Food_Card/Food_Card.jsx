import React from "react";
import style from "./Food_Card.module.css";
import notFound from "../../images/NoEncontrado.jpg";

const FoodCard = (props) => {
// console.log(props);
  return (
    <div
      className={
        props.name === "Recipe not found" ? style.notFound : style.card
      }
    >
      <div className={style.cardimg}>
        <img src={props.image === "notFound"? notFound: props.image} alt="food" className={style.cardimg1} />
      </div>
      <div className={style.cardinfo}>
        <p className={style.texttitle}>{props.name} </p>
        <p className={style.textbody}>
          {" "}
          {props.diets.length ? `Diets: ${props.diets.join(" ")}` : ""}
        </p>
      </div>
    </div>
  );
};
export default FoodCard;
