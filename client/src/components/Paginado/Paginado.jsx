import React, { useState} from "react";
import { NavLink } from "react-router-dom";
import { getAllRecipe,setCurrentPage } from "../../redux/actions";
import style from "./Paginado.module.css";
import FoodCard from "../Food_Card/Food_Card";
import { connect } from "react-redux";
import notFound from "../../images/NoEncontrado.jpg";

const navLinkStyle = {
  textDecoration: "none",
  color: "#3E3D3C",
};


const Paginado = (props) => {
  const [numberPageRecipes, setnumberPageRecipes] = useState(1);
  const recipesPerPage = 9


  let recipes
  if (props.filterBoolean === false) {
    if (props.order === "titleUpward") {
      recipes = props.orderBy;
    } else if (props.order === "titleFalling") {
      recipes = props.orderBy;
    } else if (props.order === "healthScoreUpward") {
      recipes = props.orderBy;
    } else if (props.order === "healthScoreFalling") {
      recipes = props.orderBy;
    } else if (props.order === "off") {
      recipes = props.recipe;
    }
  }else{
    recipes = props.filter;
       if (props.order === "titleUpward") {
         recipes = props.orderwithfilter;
       } else if (props.order === "titleFalling") {
         recipes = props.orderwithfilter;
       } else if (props.order === "healthScoreUpward") {
         recipes = props.orderwithfilter;
       } else if (props.order === "healthScoreFalling") {
         recipes = props.orderwithfilter;
       } else if (props.order === "off") {
         recipes = props.filter;
       }
  }

  if (recipes.length===1) {
    props.setCurrentPage(1)
  }

  function start(e) {
    props.setCurrentPage(1);
  }

    function finish(e) {
      props.setCurrentPage(Math.ceil(recipes.length / recipesPerPage));
    }
      function next(e) {
        if (props.currentPage < Math.ceil(recipes.length / recipesPerPage)) {
          
          props.setCurrentPage(props.currentPage + 1);
        }
      }
  function previus(e) {
    if (props.currentPage > 1) {
      props.setCurrentPage(props.currentPage - 1);
    }
  }
  function positionOne(e){
    props.setCurrentPage(numberPageRecipes);
  }
  function positionTwo(e) {
        if (props.currentPage < Math.ceil(recipes.length / recipesPerPage)) {
          props.setCurrentPage(numberPageRecipes + 1);
        }
  }
  function positionThree(e) {
    if (props.currentPage < Math.ceil(recipes.length / recipesPerPage)) {

      props.setCurrentPage(numberPageRecipes + 2);
    }
  }

    function number(e) {
      setnumberPageRecipes(props.currentPage - 1);
    }
    if ((props.currentPage === 1 || props.currentPage === 2) && numberPageRecipes !== 1) {
        setnumberPageRecipes(1);
    }else if (numberPageRecipes !== props.currentPage - 1 && props.currentPage > 2) {
        number();    
    }

  let newRecipes = [], newRecipePerPage;
if (props.currentPage -1 <= recipes.length / recipesPerPage && props.currentPage > 0) {
  if (recipes.length - (props.currentPage * recipesPerPage) >= 0) {

    newRecipes = recipes.slice(
      (props.currentPage - 1) * recipesPerPage,
      (props.currentPage - 1) * recipesPerPage + recipesPerPage
    );
  } else{
     newRecipePerPage = recipesPerPage - (recipes.length - props.currentPage * recipesPerPage)
  newRecipes = recipes.slice(
  (props.currentPage - 1) * recipesPerPage,
  (props.currentPage - 1) * recipesPerPage + newRecipePerPage
);
  }
} 


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
            <NavLink key={e.id?e.id:"notFound"}  to={`/Detail/${e.id}`} style={navLinkStyle}>
              <FoodCard
                id={e.id}
                name={e.name}
                diets={e.diets}
                key={e.id}
                image={e.image}
              />
            </NavLink>
          ))
        ) : props.filterBoolean === false ? (
          <div>
            <img src="https://i.gifer.com/ZkiR.gif" alt="" />
          </div>
        ) : (
          <div>
            <FoodCard
              id="notFound"
              name="Recipe not found"
              diets={[]}
              key="notFound"
              image={notFound}
            />
          </div>
        )}
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
    currentPage: state.currentPage,
  };
};

export const mapDispatchToProps = function (dispatch) {
  return {
    getAllRecipe: () => dispatch(getAllRecipe()),
    setCurrentPage: (page) => dispatch(setCurrentPage(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginado);
