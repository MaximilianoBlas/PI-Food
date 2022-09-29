import React from "react";
import { NavLink } from "react-router-dom";
import { getAllRecipe, setCurrentPage } from "../../redux/actions";
import style from "./Paginado.module.css";
import FoodCard from "../Food_Card/Food_Card";
import { connect } from "react-redux";
import notFound from "../../images/NoEncontrado.jpg";
import useMovePage from "../Helper/useMovePage"

const navLinkStyle = {
    textDecoration: "none",
    color: "#3E3D3C",
};


const Paginado = (props) => {
    const recipesPerPage = 9;

    let recipes;
    if (props.filterBoolean === false) {
        props.order === "off"? recipes = props.recipe : recipes = props.orderBy
    } else {
        props.order === "off" ? recipes = props.filter : recipes = props.orderwithfilter
    }

    if (recipes.length === 1) {
        props.setCurrentPage(1);
    }

    const {
        start,
        finish,
        previus,
        next,
        positionOne,
        positionTwo,
        positionThree,
        numberPageRecipes,
    } = useMovePage();

    let newRecipes = [],
        newRecipePerPage;
    if (
        props.currentPage - 1 <= recipes.length / recipesPerPage &&
        props.currentPage > 0
    ) {
        if (recipes.length - props.currentPage * recipesPerPage >= 1) {
            newRecipes = recipes.slice(
                (props.currentPage - 1) * recipesPerPage,
                (props.currentPage - 1) * recipesPerPage + recipesPerPage
            );
        } else {
            newRecipePerPage =
                recipesPerPage -
                (recipes.length - props.currentPage * recipesPerPage);
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

                <button
                    type="submit"
                    onClick={(e) => positionOne()}
                >
                    {numberPageRecipes}
                </button>

                <button
                    type="submit"
                    onClick={(e) =>
                        positionTwo(recipes, recipesPerPage)
                    }
                >
                    {numberPageRecipes + 1}
                </button>

                <button
                    type="submit"
                    onClick={(e) =>
                        positionThree(
                            recipes,
                            recipesPerPage
                        )
                    }
                >
                    {numberPageRecipes + 2}
                </button>

                <button
                    type="submit"
                    onClick={(e) => next(recipes, recipesPerPage)}
                >
                    Next
                </button>
                <button
                    type="submit"
                    onClick={(e) => finish(recipes, recipesPerPage)}
                >
                    Finish
                </button>
            </div>
            <div className={style.conteinerRecipe}>
                {newRecipes.length ? (
                    newRecipes.map((e) => (
                        <NavLink
                            key={e.id ? e.id : "notFound"}
                            to={`/Detail/${e.id}`}
                            style={navLinkStyle}
                        >
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
