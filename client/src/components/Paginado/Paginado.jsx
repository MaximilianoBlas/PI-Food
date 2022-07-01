import React, { Component } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllRecipe } from "../../redux/actions";
import style from "./Paginado.module.css";
import FoodCard from "../Food_Card/Food_Card";
import { connect } from "react-redux";

const navLinkStyle = {
  textDecoration: "none",
  color: "#3E3D3C",
};


const Paginado = (props) => {
  const [numberPageRecipes, setnumberPageRecipes] = React.useState(1);
  const [currentPage, setcurrentPage] = React.useState(1);
  const [recipesPerPage, setrecipesPerPage] = React.useState(9);
  console.log("entro el paginado");
  let recipes
  if (props.filterBoolean === false) {
    console.log("order recipe 1");
    recipes = props.recipe;
    if (props.order === "titleUpward") {
      console.log("order recipe title1");
      recipes = props.orderBy;
    } else if (props.order === "titleFalling") {
      console.log("order recipe title2");
      recipes = props.orderBy;
    } else if (props.order === "healthScoreUpward") {
      console.log("order recipe health 3");
      recipes = props.orderBy;
    } else if (props.order === "healthScoreFalling") {
      console.log("order recipe health 4");
      recipes = props.orderBy;
    } else if (props.order === "off") {
      console.log("order recipe off");
      recipes = props.recipe;
    }
  }else{
      console.log("order filter");
    recipes = props.filter;
       if (props.order === "titleUpward") {
         console.log("order recipe title1");
         recipes = props.orderwithfilter;
       } else if (props.order === "titleFalling") {
         console.log("order recipe title2");
         recipes = props.orderwithfilter;
       } else if (props.order === "healthScoreUpward") {
         console.log("order recipe health 3");
         recipes = props.orderwithfilter;
       } else if (props.order === "healthScoreFalling") {
         console.log("order recipe health 4");
         recipes = props.orderwithfilter;
       } else if (props.order === "off") {
         console.log("order recipe off");
         recipes = props.filter;
       }
  }

  function start(e) {
    setcurrentPage(1);
  }
  // console.log(recipes);
  // console.log(props.recipe);
  // console.log(props.filter);
  console.log(props);
    function finish(e) {
      console.log(Math.floor(recipes.length / recipesPerPage));
      console.log(recipes);
      setcurrentPage(Math.ceil(recipes.length / recipesPerPage));
    }
      function next(e) {
        if (currentPage < Math.ceil(recipes.length / recipesPerPage)) {
          
          setcurrentPage(currentPage + 1);
        }
      }
  function previus(e) {
    if (currentPage > 1) {
      setcurrentPage(currentPage - 1);
    }
  }
  function positionOne(e){
    setcurrentPage(numberPageRecipes);
  }
  function positionTwo(e) {
        if (currentPage < Math.ceil(recipes.length / recipesPerPage)) {
          setcurrentPage(numberPageRecipes + 1);
        }
  }
  function positionThree(e) {
    if (currentPage < Math.ceil(recipes.length / recipesPerPage)) {

      setcurrentPage(numberPageRecipes + 2);
    }
  }

    function number(e) {
      setnumberPageRecipes(currentPage - 1);
    }
    if ((currentPage === 1 || currentPage === 2) && numberPageRecipes !== 1) {
      console.log(3);
        setnumberPageRecipes(1);
    }else if (numberPageRecipes !== currentPage - 1 && currentPage > 2) {
      console.log(4);
        number();    
    }
    console.log("current page " + currentPage);
      
    


  let newRecipes, newRecipePerPage;
if (currentPage -1 <= recipes.length / recipesPerPage && currentPage > 0) {
  if (recipes.length - (currentPage * recipesPerPage) >= 0) {
    console.log(1);
    newRecipes = recipes.slice(
      (currentPage - 1) * recipesPerPage,
      (currentPage - 1) * recipesPerPage + recipesPerPage
    );
  } else{
    console.log(2);
     newRecipePerPage = recipesPerPage - (recipes.length - currentPage * recipesPerPage)
  newRecipes = recipes.slice(
  (currentPage - 1) * recipesPerPage,
  (currentPage - 1) * recipesPerPage + newRecipePerPage
);
  }
} 


// console.log(newRecipes);






  return (
    <div className={style.conteiner}>
      <div className={style.conteinerBtn}>
        <button type="submit" onClick={(e) => start(e)}>
          Start
        </button>

        <button type="submit" onClick={(e) => previus(e)}>
          Previus
        </button>

        <button type="submit" onClick={(e) => positionOne(e)}>
          {numberPageRecipes}
        </button>

        <button type="submit" onClick={(e) => positionTwo(e)}>
          {numberPageRecipes + 1}
        </button>

        <button type="submit" onClick={(e) => positionThree(e)}>
          {numberPageRecipes + 2}
        </button>

        <button type="submit" onClick={(e) => next(e)}>
          Next
        </button>
        <button type="submit" onClick={(e) => finish(e)}>
          Finish
        </button>
      </div>
      <div className={style.conteinerRecipe}>
        {newRecipes.length ? (
          newRecipes.map((e) => (
            <NavLink to={`/Detail/${e.id}`} style={navLinkStyle}>
              <FoodCard
                id={e.id}
                name={e.name}
                diets={e.diets}
                key={e.id}
                image={e.image}
              />
            </NavLink>
          ))
        ) : (
          <div >
            <img
              src="https://i.gifer.com/ZkiR.gif"
              alt=""
              
            />

          </div>
        )}
        {/* {newRecipes &&
          newRecipes.map((e) => (
            <NavLink to={`/Detail/${e.id}`} style={navLinkStyle}>
              <FoodCard
                id={e.id}
                name={e.name}
                diets={e.diets}
                key={e.id}
                image={e.image}
              />
            </NavLink>
          ))} */}
      </div>
    </div>
  );
};

export const mapStateToProps = function (state) {
  return {
    recipe: state.recipe,
    filter: state.filter,
    filterBoolean: state.filterBoolean,
    orderBy: state.orderBy,
    order: state.order,
    orderwithfilter: state.orderwithfilter,
  };
};

export const mapDispatchToProps = function (dispatch) {
  return {
    getAllRecipe: () => dispatch(getAllRecipe()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginado);
