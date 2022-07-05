import React, { Component, useEffect } from "react";
import { connect, useDispatch,useSelector } from "react-redux";
import FoodCard from "../Food_Card/Food_Card";
import { getAllRecipe,setChangePage } from "../../redux/actions/index";
import Nav from "../Nav/Nav";
import Paginado from "../Paginado/Paginado";

const navbar ={
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#EFBD88",
  color: "#3E3D3C",
  border:" 1px solid black",
  height: "60px",
  marginBottom: "30px",
  // width: 100%;
  // position: fixed;
  // top: 0;
  // left: 0;
  // z-index: 1;
}


 export default function Home(props) {
 const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(getAllRecipe());

  },[dispatch]);


  

    return (
      <div>
        <div style={navbar}>
          <h1> LA COCINA DE CHARLY</h1>
        </div>
        {/* {console.log(this.props)} */}
        <div>
          <Nav />
        </div>
        <div>
          <Paginado />
        </div>
        {/* <h1>
          {this.props.recipe &&
            this.props.recipe.map((e) => (
              <FoodCard
                id={e.id}
                name={e.name}
                diets={e.diets}
                // stock={e.stock}
                key={e.id}
                image={e.image}
              />
            ))}
        </h1> */}
      </div>




    )

    }
    

      

// export const mapStateToProps = function (state) {
//   return {
//     recipe: state.recipe,
//     changePage: state.changePage,
//   };
// };

// export const mapDispatchToProps = function (dispatch) {
//   return {
//     getAllRecipe: () => dispatch(getAllRecipe()),
//     setChangePage: (boolean) => dispatch(setChangePage(boolean)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
