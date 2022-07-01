import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Landing from "./components/Landing Page/Landing_Page"
import Home from "./components/Home/Home"
import Recipe_Detail from "./components/Recipe_Detail/Recipe_Detail"
import Create_Recipe from "./components/Create_Recipe/Create_Recipe"

function App() {
  return (
    <div className="App">
    <Route exact path="/" component={Landing}/>
    <Route path="/Home" component={Home}/> 
    <Route path="/Detail/:id" component={Recipe_Detail} />
    <Route path="/Create" component={Create_Recipe} />
    </div>
  );
}

export default App;
