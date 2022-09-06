import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllRecipe, getAllRecipeOff } from "../../redux/actions/index";
import Nav from "../Nav/Nav";
import Paginado from "../Paginado/Paginado";

const navbar ={
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#111",
  color: "#ddd",
  border:" 1px solid black",
  height: "60px",
  marginBottom: "30px",
}

 export default function Home(props) {
 const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllRecipeOff());
    dispatch(getAllRecipe());
  },[dispatch]);

    return (
      <div>
        <div style={navbar}>
          <h1> LA COCINA DE CHARLY</h1>
        </div>
        <div>
          <Nav />
        </div>
        <div>
          <Paginado />
        </div>
      </div>
    )
    }
