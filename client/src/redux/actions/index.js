import axios from "axios";
import notFound from "../../images/NoEncontrado.jpg";

export const GET_ALL_RECIPE = "GET_ALL_RECIPE";
export const FILTER_RECIPE = "FILTER_RECIPE";
export const FILTER_OFF = "FILTER_OFF";
export const ORDER_OFF = "ORDER_OFF";
export const ORDER_BY_TITLE_UPWARD = "ORDER_BY_TITLE_UPWARD";
export const ORDER_BY_TITLE_FALLING = "ORDER_BY_TITLE_FALLING";
export const ORDER_BY_HEALTHSCORE_UPWARD = "ORDER_BY_HEALTHSCORE_UPWARD";
export const ORDER_BY_HEALTHSCORE_FALLING = "ORDER_BY_HEALTHSCORE_FALLING";
export const DETAIL_RECIPE = "DETAIL_RECIPE";
export const DETAIL_RECIPE_OFF = "DETAIL_RECIPE_OFF";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const CREATE_DIETS = "CREATE_DIETS";
export const GET_ALL_RECIPE_OFF = "GET_ALL_RECIPE_OFF";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const DETAIL_STATE = "DETAIL_STATE";
export const CHANGE_PAGE = "CHANGE_PAGE";

let currentName
export const getAllRecipe = (name) => {
  if (!name) {
    if (currentName) {
      return async (dispatch) => {
        const res = await axios.get(
          `/recipes?name=${currentName}`
        );
        dispatch({
          type: GET_ALL_RECIPE,

          payload:
            typeof res.data === "object"
              ? res.data
              : [
                  {
                    name: "Recipe not found",
                    image: notFound,
                    dish_summary: "Recipe not found",
                    diets: [undefined],
                  },
                ],
        });
      };
    }
      
    return async (dispatch) => {
      const res = await axios.get("/recipes");
      dispatch({
        type: GET_ALL_RECIPE,
        payload: res.data,
        name:"defect"
      });
    };
  }else{
    if (name === "reload") {
      currentName = undefined
      return async (dispatch) => {
        const res = await axios.get("/recipes");
        dispatch({
          type: GET_ALL_RECIPE,
          payload: res.data,
          name: "defect"
        });
      };
    }else{
      currentName = name;
      console.log("actions else");
      console.log(name);
      return async (dispatch) => {
        const res = await axios.get(`/recipes?name=${name}`);
        console.log(typeof res.data === "object");
        dispatch({
          type: GET_ALL_RECIPE,
  
          payload: typeof res.data === "object"
            ? res.data
            : [
                {
                  name: "Recipe not found",
                  image: notFound,
                  dish_summary: "Recipe not found",
                  diets: []
                },
              ],
              name
        });
      };
    }
  }
}

export const getAllRecipeOff = () =>{
  return {
    type: GET_ALL_RECIPE_OFF,
  };
}

export const filterRecipe = (payload) => {
  console.log("action show");
  return {
    type: FILTER_RECIPE, 
    payload
  }
};

export const orderOff = () => {
  return {
    type: ORDER_OFF,
  }
}

export const orderByTitleUpward = () => {
  console.log("action title upward");
  return {
    type: ORDER_BY_TITLE_UPWARD,
  };
};
export const orderByTitleFalling = () => {
  console.log("action title falling");
  return {
    type: ORDER_BY_TITLE_FALLING,
  };
};

export const orderByHealthScoreUpward = () => {
  console.log("action orderByHealthScore");
  return {
    type: ORDER_BY_HEALTHSCORE_UPWARD,
  };
};
export const orderByHealthScoreFalling = () => {
  console.log("action orderByHealthScore");
  return {
    type: ORDER_BY_HEALTHSCORE_FALLING,
  };
};

export const filterOff = () => {
  return {
    type: FILTER_OFF,
  };
};





export const getRecipeDetail = (id) => {

  return async (dispatch) => {
    const res = await axios.get(`/recipes/${id}`);
    dispatch({
      type: DETAIL_RECIPE,
      payload: res.data,
    });
  };
  // return function (dispatch) {
  //   return fetch(`/recipes/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       dispatch({
  //         type: DETAIL_RECIPE,
  //         payload: data,
  //       });
  //     });
  // };
}

export const recipeDetailOff = () => {
        return {
          type: DETAIL_RECIPE_OFF,
        }       
}

export const createDiets = (input) => {
  return async (dispatch) => {
    const res = await axios.post("/diets");
    console.log(res.data);
    dispatch({
      type: CREATE_DIETS,
    });
  };
};


export const createRecipe = (input) => {
  return async (dispatch) => {
    const res = await axios.post("/recipes", input)
    console.log(res.data)
    dispatch({
      type: CREATE_RECIPE,
      payload: res.data,
    })
  }
}

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
}

export const detailState = (state) => {
  console.log("action detail state");
  console.log(state);
  return {
    type: DETAIL_STATE,
    payload: state,
  };
}

export const setChangePage = (boolean) => {
  console.log("action change page");
  return {
    type: CHANGE_PAGE,
    payload: boolean,
  };
}