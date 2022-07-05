import React, { Component, useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllRecipe,setCurrentPage,detailState, setChangePage } from "../../redux/actions";
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
  // const [currentPage, setcurrentPage] = React.useState(1);
  const recipesPerPage = 9
  console.log("entro el paginado");
  // if (props.iComeFromDetail === false ) {
  //   props.setCurrentPage(1)
  //   props.detailState(true)
  // }
  // props.setChangePage(true);
  // setcurrentPage(props.currentPage);
  // useEffect(() => {
  //   console.log("useEffect up date");
  //   props.setCurrentPage(1)
    
  // },[props.filter, props.filterBoolean]);


    // console.log(props.iComeFromDetail);
    // if (props.iComeFromDetail) {
    //     console.log("entar al estado del datalle");
    //     setcurrentPage(props.currentPage);
    //   }
    //   props.detailState(false)
    //   console.log(props.iComeFromDetail);


  console.log(props.currentPage);
  let recipes
  if (props.filterBoolean === false) {
    console.log("recipe filter false");
    recipes = props.recipe;
    if (props.order === "titleUpward") {
      console.log("order recipe filter false");
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


  if (recipes.length===1) {
    props.setCurrentPage(1)
  }

  function start(e) {
    props.setCurrentPage(1);
  }
  console.log(recipes);
  // console.log(props.recipe);
  // console.log(props.filter);
  console.log(props);
    function finish(e) {
      console.log(Math.floor(recipes.length / recipesPerPage));
      console.log(recipes);
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
      console.log(3);
        setnumberPageRecipes(1);
    }else if (numberPageRecipes !== props.currentPage - 1 && props.currentPage > 2) {
      console.log(4);
        number();    
    }
    console.log("current page " + props.currentPage);
      
    


  let newRecipes = [], newRecipePerPage;
if (props.currentPage -1 <= recipes.length / recipesPerPage && props.currentPage > 0) {
  if (recipes.length - (props.currentPage * recipesPerPage) >= 0) {
    console.log(1);
    newRecipes = recipes.slice(
      (props.currentPage - 1) * recipesPerPage,
      (props.currentPage - 1) * recipesPerPage + recipesPerPage
    );
  } else{
    console.log(2);
     newRecipePerPage = recipesPerPage - (recipes.length - props.currentPage * recipesPerPage)
     console.log(recipes.length);
     console.log(newRecipePerPage);
  newRecipes = recipes.slice(
  (props.currentPage - 1) * recipesPerPage,
  (props.currentPage - 1) * recipesPerPage + newRecipePerPage
);
  }
} 
//   console.log("current page global " + props.props.currentPage);
//   console.log("current page local " + props.currentPage);
// if (props.props.currentPage !== props.currentPage) {
//   console.log("entro al if de cambio de current page")
//     props.setCurrentPage(props.currentPage);
// }
  


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
        {console.log(newRecipes)}
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
    iComeFromDetail: state.iComeFromDetail,
    changePage: state.changePage,
  };
};

export const mapDispatchToProps = function (dispatch) {
  return {
    getAllRecipe: () => dispatch(getAllRecipe()),
    setCurrentPage: (page) => dispatch(setCurrentPage(page)),
    detailState: (state) => dispatch(detailState(state)),
    setChangePage: (boolean) => dispatch(setChangePage(boolean)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginado);
