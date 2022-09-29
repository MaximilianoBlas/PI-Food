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
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_ALL_RECIPE_OFF = "GET_ALL_RECIPE_OFF";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const RECIPE_DETAIL_OFF = "RECIPE_DETAIL_OFF";

let currentName;
export const getAllRecipe = (name) => {
    if (!name) {
        if (currentName) {
            return async (dispatch) => {
                const res = await axios.get(`/recipes?name=${currentName}`);
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
                name: "defect",
            });
        };
    } else {
        if (name === "reload") {
            currentName = undefined;
            return async (dispatch) => {
                const res = await axios.get("/recipes");
                dispatch({
                    type: GET_ALL_RECIPE,
                    payload: res.data,
                    name: "defect",
                });
            };
        } else {
            currentName = name;
            return async (dispatch) => {
                const res = await axios.get(`/recipes?name=${name}`);
                dispatch({
                    type: GET_ALL_RECIPE,

                    payload: typeof res.data.length
                        ? res.data
                        : [
                              {
                                  name: "Recipe not found",
                                  image: notFound,
                                  dish_summary: "Recipe not found",
                                  diets: [],
                              },
                          ],
                });
            };
        }
    }
};

export const getAllRecipeOff = () => {
    return {
        type: GET_ALL_RECIPE_OFF,
    };
};

export const filterRecipe = (payload) => {
    return {
        type: FILTER_RECIPE,
        payload,
    };
};

export const orderOff = () => {
    return {
        type: ORDER_OFF,
    };
};

export const orderByTitleUpward = () => {
    return {
        type: ORDER_BY_TITLE_UPWARD,
    };
};
export const orderByTitleFalling = () => {
    return {
        type: ORDER_BY_TITLE_FALLING,
    };
};

export const orderByHealthScoreUpward = () => {
    return {
        type: ORDER_BY_HEALTHSCORE_UPWARD,
    };
};
export const orderByHealthScoreFalling = () => {
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
};

export const createRecipe = (input) => {
    return async (dispatch) => {
        const res = await axios.post("/recipes", input);
        dispatch({
            type: CREATE_RECIPE,
            payload: res.data,
        });
    };
};

export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page,
    };
};

export const recipeDetailOff = () => {
    return {
        type: RECIPE_DETAIL_OFF,
    };
};
