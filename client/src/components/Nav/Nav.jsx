import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterOff, filterRecipe, getAllRecipe,orderOff,orderByTitleUpward,orderByTitleFalling, orderByHealthScoreUpward,orderByHealthScoreFalling } from "../../redux/actions";
import s from "./Nav.module.css";

const Nav = (props) => {
  const [searching, setSearching] = React.useState("");
  console.log("entro el nav");
  function changeSearch(e) {
    setSearching(e.target.value);
  }
  console.log(searching);

  const dispatch = useDispatch();
  const filterBoolean = useSelector((state) => state.filterBoolean);

  function search(e) {
    dispatch(getAllRecipe(searching));
    dispatch(filterOff());
    dispatch(orderOff());
    document.getElementById("filter").value = "filter";
    document.getElementById("order").value = "order";
  }

  function showSelected(e) {
    console.log("showSelected");
    let filter = document.getElementById("filter").value;
    if (filter === "filter") {
      dispatch(filterOff());
      dispatch(orderOff())
      document.getElementById("order").value = "order";
    } else {
      dispatch(filterRecipe(filter));
      dispatch(orderOff());
      document.getElementById("order").value = "order";
    }
    
  }

  function orderBy(e) {
    console.log("order by");
    let order = document.getElementById("order").value;
    if (order === "order") {
      dispatch(orderOff());
    } else if (order === "titleUpward") {
      console.log("order by titleUpward");
      dispatch(orderByTitleUpward());
    } else if (order === "titleFalling") {
      console.log("order by titleFalling");
      dispatch(orderByTitleFalling());
    } else if (order === "healthScoreUpward") {
      dispatch(orderByHealthScoreUpward());
    } else if (order === "healthScoreFalling") {
      dispatch(orderByHealthScoreFalling());
    }
  }
  function reload () {
    dispatch(getAllRecipe());
  }

  return (
    <div>
      <Link to={"/Create"}>
      <button>Create Recipe</button>
      </Link>
      <label htmlFor="name"></label>
      <input type="text" name="name" autoFocus onChange={(e) => changeSearch(e)} />
      <button type="submit" onClick={(e) => search(e)}>
        Search
      </button>

      <select name="filter" id="filter" onChange={(e) => showSelected(e)}>
        <option value="filter">Filter by diet</option>
        <option value="gluten free">Gluten Free</option>
        <option value="dairy free">Dairy Free</option>
        <option value="ketogenic">Ketogenic</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="lacto vegetarian">Lacto Vegetarian</option>
        <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="pescetarian">Pescetarian</option>
        <option value="paleolithic">Paleolithic</option>
        <option value="primal">Primal</option>
        <option value="low FODMAP">Low FODMAP</option>
        <option value="whole 30">Whole 30</option>
      </select>

      <select name="order" id="order" onChange={(e) => orderBy(e)}>
        <option value="order">Order by</option>
        <option value="titleUpward">Title Upward</option>
        <option value="titleFalling">Title Falling</option>
        <option value="healthScoreUpward">Health Score Upward</option>
        <option value="healthScoreFalling">Health Score Falling</option>
      </select>

      <div>
        <button onClick={(e) => reload(e)}>Reload </button>
      </div>
    </div>
  );
};
export default Nav;
