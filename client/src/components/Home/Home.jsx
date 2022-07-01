import React, { Component } from "react";
import { connect } from "react-redux";
// import mainImage from "../../img-cp2/main-image-cp2.jpg";
// // import { getAllProducts } from "../../redux/actions/index";
// import ProductCard from "../ProductCard/ProductCard";
import FoodCard from "../Food_Card/Food_Card";
import { getAllRecipe } from "../../redux/actions/index";
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


export class Home extends Component {
  componentDidMount() {
    this.props.getAllRecipe();
  }

  render() {
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
    );
  }
}

export const mapStateToProps = function (state) {
  return {
    recipe: state.recipe,
  };
};

export const mapDispatchToProps = function (dispatch) {
  return {
    getAllRecipe: () => dispatch(getAllRecipe()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
