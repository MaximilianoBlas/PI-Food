import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    filterOff,
    filterRecipe,
    getAllRecipe,
    orderOff,
    orderByTitleUpward,
    orderByTitleFalling,
    orderByHealthScoreUpward,
    orderByHealthScoreFalling,
    getAllRecipeOff,
    setCurrentPage,
} from "../../redux/actions";
import s from "./Nav.module.css";

const Nav = () => {
    const [searching, setSearching] = React.useState("");
    const orderString = useSelector((state) => state.orderString);
    const filterString = useSelector((state) => state.filterString);

    useEffect(() => {
        document.getElementById("order").value = orderString;
        document.getElementById("filter").value = filterString;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function changeSearch(e) {
        setSearching(e.target.value);
    }

    const dispatch = useDispatch();

    function search(e) {
        if (searching) {
            dispatch(getAllRecipeOff());
            dispatch(getAllRecipe(searching));
            dispatch(filterOff());
            dispatch(orderOff());
            document.getElementById("filter").value = "filter";
            document.getElementById("order").value = "order";
            document.getElementById("search").value = "";
            dispatch(setCurrentPage(1));
        } else {
            alert("The search field is empty");
        }
    }

    function showSelected(e) {
        let filter = document.getElementById("filter").value;
        if (filter === "filter") {
            dispatch(filterOff());
            dispatch(orderOff());
            document.getElementById("order").value = "order";
            dispatch(setCurrentPage(1));
        } else {
            dispatch(filterRecipe(filter));
            dispatch(orderOff());
            document.getElementById("order").value = "order";
            dispatch(setCurrentPage(1));
        }
    }

    function orderBy(e) {
        let order = document.getElementById("order").value;
        if (order === "order") {
            dispatch(orderOff());
        } else if (order === "titleUpward") {
            dispatch(orderByTitleUpward());
        } else if (order === "titleFalling") {
            dispatch(orderByTitleFalling());
        } else if (order === "healthScoreUpward") {
            dispatch(orderByHealthScoreUpward());
        } else if (order === "healthScoreFalling") {
            dispatch(orderByHealthScoreFalling());
        }
    }
    function reload() {
        dispatch(getAllRecipeOff());
        dispatch(getAllRecipe("reload"));
        setTimeout(() => {
            dispatch(filterOff());
            dispatch(orderOff());
            document.getElementById("filter").value = "filter";
            document.getElementById("order").value = "order";
            document.getElementById("search").value = "";
            dispatch(setCurrentPage(1));
        }, 2000);
    }

    return (
        <div className={s.divConteiner}>
            <div className={s.group}>
                <input
                    placeholder="Search"
                    id="search"
                    type="search"
                    className={s.input}
                    autoFocus
                    onChange={(e) => changeSearch(e)}
                />

                <button
                    className={s.searchButton}
                    type="submit"
                    onClick={(e) => search(e)}
                >
                    <svg
                        className={s.icon}
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                    >
                        <g>
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                    </svg>
                </button>
            </div>

            {/* <label htmlFor="name"></label>
                <input
                    type="text"
                    id="search"
                    name="name"
                    autoFocus
                    onChange={(e) => changeSearch(e)}
                />
                <button type="submit" onClick={(e) => search(e)}>
                    Search
                </button> */}
            <div className={s.divConteinerSelector}>
                <select
                    name="filter"
                    className={s.select}
                    id="filter"
                    onChange={(e) => showSelected(e)}
                >
                    <option value="filter">Filter by diet</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto vegetarian">Lacto Vegetarian</option>
                    <option value="lacto ovo vegetarian">
                        Lacto Ovo Vegetarian
                    </option>
                    <option value="vegan">Vegan</option>
                    <option value="pescetarian">Pescetarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="low FODMAP">Low FODMAP</option>
                    <option value="whole 30">Whole 30</option>
                </select>

                <select
                    name="order"
                    className={s.select}
                    id="order"
                    onChange={(e) => orderBy(e)}
                >
                    <option value="order">Order by</option>
                    <option value="titleUpward">Title Upward</option>
                    <option value="titleFalling">Title Falling</option>
                    <option value="healthScoreUpward">
                        Health Score Upward
                    </option>
                    <option value="healthScoreFalling">
                        Health Score Falling
                    </option>
                </select>

                <div>
                    <button onClick={(e) => reload(e)}>Reload </button>
                </div>
            </div>
            <div>
                <Link to={"/Create"}>
                    <button>Create Recipe</button>
                </Link>
            </div>
        </div>
    );
};
export default Nav;

