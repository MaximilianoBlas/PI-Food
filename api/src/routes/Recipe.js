const { Router, query } = require("express");
const {Recipe, Diet} = require("../db")
const axios =require("axios")
const { Op } = require("sequelize"); 
 
const router = Router();  

 
router.get("/:id", async (req, res,next) => {
  console.log(req.params.id)
  const {id} = req.params
  if(isNaN(id)){
    console.log("id is not a number")
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
          console.log("no response");
          console.log(response);
          return res.send("No se encontro receta con ese id");
        } else {
          console.log("response");
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
          console.log(diets, id, name, image, health_score, step_by_step);
          let objBd = {
            id,
            name, 
            dish_summary,
            image,
            health_score,
            step_by_step,
            diets,
          };
          console.log(response);
          console.log("--------------------------------------------------------------");
          console.log(objBd);
          return res.send(objBd);
        }
      })
      .catch((response) => {
        console.log("error");
        return res.send("Error atrapado por catch de BD");
      });
  } else{
try {
  const recipeApi = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}&includeNutrition=true .`
  );

  const name = recipeApi.data.title;
  console.log(recipeApi.data);
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
    let recipeApi, newRecipe
    try { 
      recipeApi = await axios.get( 
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${req.query.name}&addRecipeInformation=true&number=100`
      );
      // console.log(recipeApi.data);
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
  console.log(0);
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

  console.log("pasa en findAll");
  console.log(recipeBd);
  let arrBd= []
  if (recipeBd.length) {
    console.log("pasa en if");
    let arr=[]


    let recipeBD = recipeBd.map((recipe) => {
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
    console.log(1);
    if (recipeApi.data.results.length) {
      console.log(2);
     return res.send(newRecipe)  
        } 
        return res.send(notSearched);
    }
       if (!recipeApi.data.results.length) {
        console.log(3);
         if (recipeBd.length) {
          console.log(4);
           return res.send(recipeBD); 
         }
        console.log(5);
         return res.send("No se encontro receta con ese nombre");
       }
      //  recipeBd.push(obj)
      console.log(6);
     let recip = [ ...recipeBD, ...newRecipe]
  return res.send(recip);
} catch (error) {
  console.log(7);
  return res.send(error.message)
}
} else{
  let newRecipe = []
  try {
    const recipeApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=100`
      );
      // console.log(recipeApi.data);
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
    console.log("Error atrapado por catch de API");
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
  
      console.log("pasa en findAll"); 
      // console.log(recipeBd); 
      let arrBd = [];
      if (recipeBd.length) {
        console.log("pasa en if");
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
        console.log(recipeBD);




        // let diets = recipeBd[0].dataValues.diets.map((diet) => {
        //   return diet.dataValues.name;
        // });
        // let id = recipeBd[0].dataValues.id;
        // let name = recipeBd[0].dataValues.name;
        // let image = recipeBd[0].dataValues.image;
        // let health_score = recipeBd[0].dataValues.health_score;
        // console.log(diets, id, name, image, health_score);
        // let objBd = {
        //   id,
        //   name,
        //   image,
        //   health_score,
        //   diets,
        // };
        // arrBd = [objBd];
        let recipe = [...recipeBD, ...newRecipe];
        if (!recipeBD.length&& !newRecipe.length) {
          return res.send(notSearched);
        }
          
      
        return res.send(recipe)
      } else { 
        console.log("else de findAll");
        if(!newRecipe.length){
          console.log("condicional Db no tiene nada yapi tampoco");
          return res.send(notSearched);
        }else{

          return  res.send(newRecipe); 
        }
      }
      
    } catch (error) {
      console.log("error en busca todo");
      console.log(error.message);
      res.send(notSearched);
    }

  }

})

router.post("/", async (req,res, next) =>{
  console.log(req.body);
  let {name, dish_summary, health_score, step_by_Step, diets, image} = req.body;
  console.log(name, dish_summary, health_score, step_by_Step, diets, image);
  let  recipe = await Recipe.create({
    name,
    dish_summary, 
    health_score, 
    step_by_Step,
    image
  })  
  console.log(recipe);
  if (diets.length) {
    console.log("diets");
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

    // console.log(recipewithdiets); 
  }
  

 return  res.send("Receta agregada")
})
module.exports = router; 