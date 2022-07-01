import React from "react";
import style from "./Food_Card.module.css";

const FoodCard = (props) => {

  return (
    <div
      className={
        props.name === "Recipe not found" ? style.notFound : style.card
      }
    >
      <div className={style.cardimg}>
        <img src={props.image} alt="food" className={style.cardimg1} />
      </div>
      <div className={style.cardinfo}>
        <p className={style.texttitle}>{props.name} </p>
        <p className={style.textbody}>
          {" "}
          {props.diets.length ? `Diets: ${props.diets.join(" ")}` : ""}
        </p>
      </div>

      {/* <button className={style.cta}>
            <span className={style.hoverunderlineanimation}>Read more</span>
            <svg
              id="arrow-horizontal"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="10"
              viewBox="0 0 46 16"
            >
              <path
                id="Path_10"
                data-name="Path 10"
                d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                transform="translate(30)"
              ></path>
            </svg>
          </button> */}
    </div>
  );
};

export default FoodCard;



{/* <div
      key={props.id}
      className={
        props.name === "Recipe not found"
          ? style.notFound
          : style.food_conteiner
      }
    >
      <h3 className={style.text}>{props.name}</h3>
      <img src={props.image} alt={props.name} className={style.img} />
      <h5 className={style.text}>
        {props.diets.length ? `Diets: ${props.diets.join(" ")}` : ""}
      </h5>
    </div> */}