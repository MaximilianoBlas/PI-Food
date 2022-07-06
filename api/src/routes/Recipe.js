const { Router, query } = require("express");
const {Recipe, Diet} = require("../db")
const axios =require("axios")
const { Op } = require("sequelize"); 
 
const router = Router();   
 
router.get("/:id", async (req, res,next) => {
  const {id} = req.params
  if(isNaN(id)){
    Recipe.findByPk(id, {
      include: [
        {
          model: Diet,
          attributes: {
            exclude: ["id", "recipediet"],
          },
        },
      ],
    })
      .then((response) => {
        if (!response) {
          return res.send("No se encontro receta con ese id");
        } else {
          let arr = [];
          let diets = response.dataValues.diets.map((diet) => {
            if (!arr.includes(diet.dataValues.name)) {
              arr.push(diet.dataValues.name);
              return diet.dataValues.name;
            }
          });
          let id = response.dataValues.id;
          let name = response.dataValues.name;
          let dish_summary = response.dataValues.dish_summary;
          let image = response.dataValues.image;
          let health_score = response.dataValues.health_score;
          let step_by_step = response.dataValues.step_by_Step;
          let objBd = {
            id,
            name, 
            dish_summary,
            image,
            health_score,
            step_by_step,
            diets,
          };
          return res.send(objBd);
        }
      })
      .catch((response) => {
        return res.send("Error atrapado por catch de BD");
      });
  } else{
try {
  const recipeApi = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}&includeNutrition=true .`
  );

  const name = recipeApi.data.title;
  const dish_summary = recipeApi.data.summary;
  const health_score = recipeApi.data.healthScore; 
  const Step_by_Step = recipeApi.data.instructions;
  const diets = recipeApi.data.diets;
  const image = recipeApi.data.image;
  const obj = {
    id,
    name, 
    dish_summary,
    health_score,
    Step_by_Step,
    diets,
    image,
  };
  return res.send(obj);
} catch (error) {
  return res.send("Numero de id no valido");
}
  }
   


});   
 
router.get("/", async (req, res,next) =>{
const notSearched = [
  {
    name: "Recipe not found ",
    dish_summary: "Recipe not found", 
    image: "notFound",
    diets: [],
  },
];
  if (req.query.name) {
    let recipeApi, newRecipe = [], recipeBD
    try { 
      recipeApi = await axios.get( 
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${req.query.name}&addRecipeInformation=true&number=100`
      );
       newRecipe = recipeApi.data.results.map((recipe) => { 
        return {
          id: recipe.id, 
          name: recipe.title,
          image: recipe.image,
          health_score: recipe.healthScore,
          diets: recipe.diets,
        };
      })
    } catch (error) {
      console.log(error.message);
    }

 
try {
  const recipeBd = await Recipe.findAll({
    where: { 
      name: {
        [Op.iLike]: `%${req.query.name}%`,
      },
    },
    attributes: {
      exclude: ["dish_summary", "step_by_Step"],
    },
    include: [
      {
        model: Diet,
        attributes: {
          exclude: ["id", "recipediet"], 
        },
      },
    ],
  });
  if (recipeBd.length) {
    recipeBD = recipeBd.map((recipe) => {
      let arr = []; 
      return {
        id: recipe.dataValues.id,
        name: recipe.dataValues.name, 
        image: recipe.dataValues.image,
        health_score: recipe.dataValues.health_score,
        diets: recipe.dataValues.diets.map((diet) => {
          if (!arr.includes(diet.dataValues.name)) {
            arr.push(diet.dataValues.name);
            return diet.dataValues.name;
          }
        }),
      };
    });
  }

   if(!recipeBd.length){
    if (newRecipe.length) { 
     return res.send(newRecipe)  
        } 
        return res.send(notSearched);
    }
       if (!newRecipe.length) {
         if (recipeBd.length) {
           return res.send(recipeBD); 
         }
         return res.send("No se encontro receta con ese nombre");
       }
     let recip = [ ...recipeBD, ...newRecipe]
  return res.send(recip);
} catch (error) {
  return res.send(error.message)
}
} else{
  let newRecipe = []
  try {
    const recipeApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=100`
      );
      newRecipe = recipeApi.data.results.map((recipe) => { 
        return { 
          id: recipe.id,
          name: recipe.title,
          image: recipe.image, 
          health_score: recipe.healthScore,
          diets: recipe.diets, 
        }; 
      });
 
  } catch (error) {
    console.log(error.message);
  }
    // res.send(newRecipe);
    try {
    const recipeBd = await Recipe.findAll({
        attributes: {
          exclude: ["dish_summary", "step_by_Step"],
        },
        include: [
          {
            model: Diet,
            attributes: {
              exclude: ["id", "recipediet"],
            },
          },
        ],
      });
  
      if (recipeBd.length) {
        let recipeBD  = recipeBd.map((recipe) => {
          let arr = []
          return {
            id: recipe.dataValues.id,
            name: recipe.dataValues.name,
            image: recipe.dataValues.image,
            health_score: recipe.dataValues.health_score,
            diets: recipe.dataValues.diets.map((diet) => { 
              if (!arr.includes(diet.dataValues.name)) {
                arr.push(diet.dataValues.name)
              return diet.dataValues.name
              } 
            }) 
          };
        })
  
        let recipe = [...recipeBD, ...newRecipe];
        if (!recipeBD.length&& !newRecipe.length) {
          return res.send(notSearched);
        }
          
      
        return res.send(recipe)
      } else { 
        if(!newRecipe.length){
          return res.send(notSearched);
        }else{
          return  res.send(newRecipe); 
        }
      }   
    } catch (error) {
      console.log(error.message);
      res.send(notSearched); 
    }

  } 

})

router.post("/", async (req,res, next) =>{
  let {name, dish_summary, health_score, step_by_Step, diets, image} = req.body;
  let  recipe = await Recipe.create({
    name,
    dish_summary, 
    health_score, 
    step_by_Step,
    image
  })  
  if (diets.length) {
    let addDiets = await Diet.findAll({ 
      where:{ 
        name: diets 
      }
    })
    await recipe.addDiet(addDiets)
    
    let recipewithdiets = await Recipe.findOne({
      where:{name},
      include: [{
        model: Diet,
        attributes:{
          exclude: ["id", "createdAt", "updatedAt"]
        }
      }]
    }) 
  }
  
 return  res.send("Receta agregada")
})
   
module.exports = router; 