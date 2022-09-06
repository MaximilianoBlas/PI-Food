import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "./Landing_page.module.css";

export default class Landing extends Component {
  render() {
    return (
      <div className={style.divContainer}>
        <div className={style.navbar}>
          <h1>LA COCINA DE CHARLY</h1>
        </div>
        <div>
          <Link to="/Home">
            <button>GET IN</button>
          </Link>
        </div>
      </div>
    );
  }
}
