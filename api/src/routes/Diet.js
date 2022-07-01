const { Router, query } = require("express");
const { Diet } = require("../db");
const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/", async (req, res) => {
  const diet = await Diet.findAll();
  res.send(diet);
});

router.post("/", async (req, res) => {
  const diet = await Diet.bulkCreate([
    {name: "dairy free"},
    { name: "gluten free" },
    { name: "ketogenic" },
    { name: "vegetarian" },
    { name: "lacto vegetarian" },
    { name: "lacto ovo vegetarian" },
    { name: "vegan" },
    { name: "pescetarian" }, 
    { name: "paleolithic" },
    { name: "primal" },
    { name: "low FODMAP" },
    { name: "whole30" }
  ]);
  res.send("Dietas agregadas")

})


module.exports = router;
