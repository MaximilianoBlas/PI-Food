import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createRecipe } from "../../redux/actions";
import Modals from "../Modal_Create_Recipe/Modals";
import s from "./Create_Recipe.module.css";

const divContainer = {
    display: "flex",
    margin: "20px",
};
const divContainerForm = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    margin: "0px 0px 20px 0px",
};

const formconteiner = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#111",
    width: "50%",
    borderRadius: "50px",
    border: "1px solid black",
};
const div = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "10px",
};

const textRed = {
    color: "red",
};

const CreateRecipe = (props) => {
    const [input, setInput] = useState({
        name: "",
        dish_summary: "",
        health_score: "",
        step_by_Step: "",
        image: "",
        diets: [],
        select: "filter",
    });
    const [error, setError] = useState({});
    const [modalOpening, setModalOpening] = useState(true);
    const [modalSubmit, setModalSubmit] = useState(false);
    const dispatch = useDispatch();

    setTimeout(() => {
        setModalOpening(false);
    }, 1500);

    function onSubmit(e) {
        e.preventDefault();
        setModalSubmit(true);
        setTimeout(() => {
            setModalSubmit(false);
        }, 1000);
        dispatch(createRecipe(input));
        console.log("llega");
        setInput({
            name: "",
            dish_summary: "",
            health_score: "",
            step_by_Step: "",
            image: "",
            diets: [],
            select: "filter",
        });
        console.log("pasa");
    }

    function inputChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setError(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }

    function dietsSelect(e) {
        if (
            !input.diets.includes(e.target.value) &&
            e.target.value !== "filter"
        ) {
            setInput({ ...input, diets: [...input.diets, e.target.value] });
        }
    }
    function dietsDelete(diet) {
        setInput({
            ...input,
            diets: input.diets.filter((e) => e !== diet),
        });
    }

    return (
        <div style={divContainer}>
            <Link to={"/Home"}>
                <button>Home</button>
            </Link>
            {modalOpening ? (
                <div>
                    <Modals state="opening"></Modals>
                </div>
            ) : (
                <div> </div>
            )}
            {modalSubmit ? (
                <div>
                    <Modals state="submit"></Modals>
                </div>
            ) : (
                <div> </div>
            )}
            <div style={divContainerForm}>
                <form
                    action=""
                    onSubmit={(e) => onSubmit(e)}
                    style={formconteiner}
                >
                    <h2 style={{ color: "#ddd" }}>Form to create recipes</h2>

                    <div style={div}>
                        <label htmlFor="name" className={s.text}>
                            Name:{" "}
                        </label>
                        <input
                            value={input.name}
                            type="text"
                            name="name"
                            placeholder="Required recipe name"
                            className={error.name ? s.inputRed : s.inputBlue}
                            autoFocus
                            onChange={(e) => inputChange(e)}
                        />
                        {error.name && <p style={textRed}>{error.name}</p>}
                    </div>
                    <div style={div}>
                        <label htmlFor="dish_summary" className={s.text}>
                            Dish Summary:{" "}
                        </label>
                        <textarea
                            value={input.dish_summary}
                            name="dish_summary"
                            id=""
                            cols="30"
                            rows="5"
                            placeholder="Required recipe dish summary"
                            className={
                                error.dish_summary ? s.inputRed : s.inputBlue
                            }
                            onChange={(e) => inputChange(e)}
                        ></textarea>
                        {error.dish_summary && (
                            <p style={textRed}>{error.dish_summary}</p>
                        )}
                    </div>
                    <div style={div}>
                        <label htmlFor="health_score" className={s.text}>
                            Health Score
                        </label>
                        <input
                            value={input.health_score}
                            type="text"
                            name="health_score"
                            onChange={(e) => inputChange(e)}
                            className={
                                error.health_score ? s.inputRed : s.inputBlue
                            }
                            placeholder="Number between 0 and 100"
                        />
                        {error.health_score && (
                            <p style={textRed}>{error.health_score}</p>
                        )}
                    </div>
                    <div style={div}>
                        <label htmlFor="step_by_Step" className={s.text}>
                            Step By Step:
                        </label>
                        <textarea
                            value={input.step_by_Step}
                            name="step_by_Step"
                            id=""
                            cols="30"
                            rows="5"
                            placeholder="Recipe step by step"
                            onChange={(e) => inputChange(e)}
                        ></textarea>
                    </div>
                    <div style={div}>
                        <label htmlFor="image" className={s.text}>
                            Image:{" "}
                        </label>
                        <input
                            value={input.image}
                            type="text"
                            name="image"
                            placeholder="Link to image"
                            onChange={(e) => inputChange(e)}
                        />
                    </div>
                    <div style={div}>
                        <select
                            value={input.select}
                            name="filter"
                            id="filter"
                            onChange={(e) => dietsSelect(e)}
                            className={s.text}
                            style={{ color: "#111" }}
                        >
                            <option value="filter">Select type of diet</option>
                            <option value="gluten free">Gluten Free</option>
                            <option value="dairy free">Dairy Free</option>
                            <option value="ketogenic">Ketogenic</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="lacto vegetarian">
                                Lacto Vegetarian
                            </option>
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
                    </div>
                    <div>
                        {input.diets.map((diet) => {
                            return (
                                <button
                                    type="button"
                                    onClick={(e) => dietsDelete(diet)}
                                >
                                    {" "}
                                    {diet} X
                                </button>
                            );
                        })}
                    </div>
                    <div
                        style={div}
                        className={
                            input.name === "" ||
                            input.dish_summary === "" ||
                            error.hasOwnProperty("health_score") ||
                            error.hasOwnProperty("step_by_Step") ||
                            error.hasOwnProperty("image") ||
                            error.hasOwnProperty("diets") ||
                            error.hasOwnProperty("name") ||
                            error.hasOwnProperty("dish_summary")
                                ? s.opacity
                                : ""
                        }
                    >
                        <button
                            type="submit"
                            disabled={
                                input.name === "" ||
                                input.dish_summary === "" ||
                                error.hasOwnProperty("health_score") ||
                                error.hasOwnProperty("step_by_Step") ||
                                error.hasOwnProperty("image") ||
                                error.hasOwnProperty("diets") ||
                                error.hasOwnProperty("name") ||
                                error.hasOwnProperty("dish_summary")
                                    ? true
                                    : false
                            }
                        >
                            Create Recipe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRecipe;

function validate(input) {
    // const [errors, setErrors] = React.useState ({});
    let errors = {};
    if (!input.name) {
        errors.name = "Name is required";
    } else if (/([0-9])/.test(input.name)) {
        errors.name = "Name is invalid, only strings";
    }
    if (!input.dish_summary) {
        errors.dish_summary = "Dish summary is required";
    }
    if (input.health_score) {
        if (!/^\d+$/.test(input.health_score)) {
            errors.health_score = "Helath score is invalid, only numbers";
        }
        if (input.health_score < 0 || input.health_score > 100) {
            errors.health_score =
                "Dish summary is invalid, only numbers between 0 and 100";
        }
    }

    return errors;
}
