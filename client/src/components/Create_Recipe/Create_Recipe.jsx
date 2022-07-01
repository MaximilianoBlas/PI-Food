import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createRecipe, createDiets } from "../../redux/actions";
import s from "./Create_Recipe.module.css";


const divContainer ={
  display: "flex",
  margin: "20px",

}
const divContainerForm = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  margin: "0px 0px 20px 0px",
}

const formconteiner = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: "#EEC392",
  width: "50%",
  borderRadius: "50px",
  border: "1px solid black",
  
};
const div = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "10px",
}
const title = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  backgroundColor: "#EEC392",
  width: "100%",
};
const textRed = {
  color: "red"
}


const CreateRecipe = (props) => {
  const [input, setInput] = useState({
    name: "",
    dish_summary: "",
    health_score: undefined,
    step_by_Step: undefined,
    image: undefined,
    diets: [],
  });
  const [error, setError] = useState({});



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createDiets());
  }, []);

  function onSubmit(e) {
    if (
      input.name === "" ||
      input.dish_summary === "" ||
      error.hasOwnProperty
    ("health_score") || error.hasOwnProperty("step_by_Step") || error.hasOwnProperty("image") || error.hasOwnProperty("diets") || error.hasOwnProperty("name") || error.hasOwnProperty("dish_summary")) {
      e.preventDefault();
      alert(
        "Complete the form correctly, name and dish summary must be completed"
      );
    } else {
      console.log("entro al submit");
      dispatch(createRecipe(input));
    }
  }

  function inputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(validate({
      ...input,
      [e.target.name]: e.target.value,
    }));
  }
console.log(error);
  function dietsSelect(e) {
    if (!input.diets.includes(e.target.value)) {
      setInput({ ...input, diets: [...input.diets, e.target.value] });
    }
  }
  function dietsDelete(diet) {
    setInput({
      ...input,
      diets: input.diets.filter((e) => e !==diet),
    });
  }
  console.log(input);

  return (
    <div style={divContainer}>
      <Link to={"/Home"}>
        <button>Home</button>
      </Link>
      <div style={divContainerForm}>
        <form action="" onSubmit={(e) => onSubmit(e)} style={formconteiner}>
          <h2>Form to create recipes</h2>

          <div style={div}>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              className={error.name ? s.inputRed : s.inputBlue}
              autoFocus
              onChange={(e) => inputChange(e)}
            />
            {error.name && <p style={textRed}>{error.name}</p>}
          </div>
          <div style={div}>
            <label htmlFor="dish_summary">Dish Summary: </label>
            <textarea
              name="dish_summary"
              id=""
              cols="30"
              rows="10"
              className={error.dish_summary ? s.inputRed : s.inputBlue}
              onChange={(e) => inputChange(e)}
            ></textarea>
            {error.dish_summary && <p style={textRed}>{error.dish_summary}</p>}
          </div>
          <div style={div}>
            <label htmlFor="health_score">Health Score</label>
            <input
              type="text"
              name="health_score"
              onChange={(e) => inputChange(e)}
              className={error.health_score ? s.inputRed : s.inputBlue}
            />
            {error.health_score && <p style={textRed}>{error.health_score}</p>}
          </div>
          <div style={div}>
            <label htmlFor="step_by_Step">Step By Step:</label>
            <textarea
              name="step_by_Step"
              id=""
              cols="30"
              rows="10"
              onChange={(e) => inputChange(e)}
            ></textarea>
          </div>
          <div style={div}>
            <label htmlFor="image">Image: </label>
            <input type="text" name="image" onChange={(e) => inputChange(e)} />
          </div>
          <div style={div}>
            <select name="filter" id="filter" onChange={(e) => dietsSelect(e)}>
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
          </div>
          <div>
            {input.diets.map(diet => {
              return <button onClick={(e) => dietsDelete(diet) }> {diet} X</button>
            })}
          </div>
          <div style={div}>
            {/* {input.name === "" ? (
            alert("Complite name and Dish Summary")
          ) : (
            <button type="submit">Create Recipe</button>
          )} */}
            <button type="submit">Create Recipe</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;


function validate(input) {
// const [errors, setErrors] = React.useState ({});
let errors = {}
  if (!input.name) {
 errors.name = 'Name is required'
  } else if (/([0-9])/.test(input.name)) {
    errors.name = "Name is invalid, only strings";
  } 
   if (!input.dish_summary) {
     errors.dish_summary = "Dish summary is required";
   }
   if (input.health_score) {
     if (!/([0-9])/.test(input.health_score)) {
       errors.health_score = "Dish summary is invalid, only numbers";
     }
       if (input.health_score < 0 || input.health_score > 100) {
         errors.health_score =
           "Dish summary is invalid, only numbers between 0 and 100";
       }
   }
      
  return errors;
};
