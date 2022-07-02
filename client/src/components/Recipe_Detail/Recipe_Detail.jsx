import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipeDetail,recipeDetailOff } from "../../redux/actions";
import loading from "../../images/LoadingGoku.gif";


const Recipe_Detail = (props) => {
  const dispatch = useDispatch();
  console.log("entro el recipe detail");
  console.log(props);
useEffect(() => {
  console.log("entro el useEffect");
  dispatch(getRecipeDetail(props.match.params.id));
  return () => {
    dispatch(recipeDetailOff(props.match.params.id));
  }
}, []);

const detail = useSelector((state) => state.recipeDetail);

console.log(props.match.params.id);
console.log(detail);

  const divContainerRecipe = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    margin: "0px 0px 20px 0px", 
  };
  const divContainer = {
    display: "flex",
    margin: "20px",

  };
  const div = {
    backgroundColor: "#EEC392",
    width: "60%",
    borderRadius: "80px",
    border: "1px solid black",
  };
  const text = {
    width: "80%",
    margin : "auto",
  };
  const width = {
    width: "80%",
  }


  return (
    <div style={divContainer}>
      <Link to={"/Home"}>
        <button>Home</button>
      </Link>
      <div style={divContainerRecipe}>
        <div style={div}>
          <h1>{detail.name}</h1>

          <img
            src={detail.image?detail.image:loading}
            alt= {loading}
            style={width}
          />
          {isNaN(props.match.params.id) ? (
            <div>
              <h3>
                {detail.diets
                  ? `Diets: ${detail.diets.join(" ")} Health Score:  ${
                      detail.health_score
                    }`
                  : `Health Score:  ${detail.health_score}`}
                {/* Diets: {detail.diets.join(" ")} Health Score:{" "}
                {detail.health_score} */}
              </h3>
              <div style={text}>
                <h3>Dish summary: {detail.dish_summary}</h3>
              </div>
              <div>
                <h3>Step by step: {detail.step_by_step}</h3>
              </div>
            </div>
          ) : (
            <div>
              <h3>
                Diets: {detail.diets} Health Score: {detail.health_score}
              </h3>
              <h3>
                {" "}
                Dish summary:
                <div
                  dangerouslySetInnerHTML={{ __html: detail.dish_summary }}
                  style={text}
                />
              </h3>
              <h3>
                {detail.Step_by_Step ? ` Step by Step:` : ""}

                <div
                  dangerouslySetInnerHTML={{ __html: detail.Step_by_Step }}
                  style={text}
                />
              </h3>
            </div>
          )}
          {/* <h3>
            Diets: {detail.diets} Health Score: {detail.health_score}
          </h3> */}
          {/* <h3>
            <div
              dangerouslySetInnerHTML={{ __html: detail.dish_summary }}
              style={text}
            />
          </h3>
          <h3>
            <div
              dangerouslySetInnerHTML={{ __html: detail.Step_by_Step }}
              style={text}
            />
          </h3> */}
        </div>
      </div>
    </div>
  );
};

export default Recipe_Detail;
