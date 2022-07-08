import { GET_ALL_RECIPE, FILTER_RECIPE, FILTER_OFF,ORDER_OFF,ORDER_BY_TITLE_UPWARD,ORDER_BY_HEALTHSCORE_UPWARD, ORDER_BY_TITLE_FALLING, ORDER_BY_HEALTHSCORE_FALLING, DETAIL_RECIPE, GET_ALL_RECIPE_OFF,SET_CURRENT_PAGE } from "../actions/index";



const initialState = {
  recipe: [],
  filter:[],
  filterString:"filter",
  orderBy: [],
  orderString:"order",
  orderwithfilter: [],
  filterBoolean: false,
  order: "off",
  recipeDetail: [],
  currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        orderBy: [...action.payload],
        currentPage: state.changePage?1:state.currentPage,
      };
      case GET_ALL_RECIPE_OFF:
      return {
        ...state,
        recipe: [],
        orderBy: [],
        foundRecipe: "defect"
      }

    case FILTER_RECIPE:
      return {
        ...state,
        filterString: action.payload,
        filter: state.recipe.filter((recipe) =>
          recipe.diets.includes(action.payload)
        ),
        orderwithfilter: state.recipe.filter((recipe) =>
          recipe.diets.includes(action.payload)
        ),
        filterBoolean: true,
        order: "off",
      };
    case FILTER_OFF:
      return {
        ...state,
        filterBoolean: false,
      };
    case ORDER_BY_TITLE_UPWARD:
      return {
        ...state,
        order: "titleUpward",
        orderString: "titleUpward",
        orderBy:
      state.filterBoolean === false?
             state.orderBy.sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              }): state.orderBy,
          orderwithfilter: state.filterBoolean === true?  state.orderwithfilter.sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              }):  state.orderwithfilter,
      };
    case ORDER_BY_TITLE_FALLING:
      return {
        ...state,
        order: "titleFalling",
        orderString: "titleFalling",
        orderBy:
          state.filterBoolean === false
            ? state.orderBy.sort((a, b) => {
                if (a.name > b.name) {
                  return -1;
                }
                if (a.name < b.name) {
                  return 1;
                }
                return 0;
              }) : state.orderBy,
           orderwithfilter : state.filterBoolean === true
            ?  state.orderwithfilter.sort((a, b) => {
                if (a.name > b.name) {
                  return -1;
                }
                if (a.name < b.name) {
                  return 1;
                }
                return 0;
              }): state.orderwithfilter,
      };
    case ORDER_BY_HEALTHSCORE_UPWARD:
      return {
        ...state,
        order: "healthScoreUpward",
        orderString: "healthScoreUpward",
        orderBy:
          state.filterBoolean === false
            ? state.orderBy.sort((a, b) => {
                if (a.health_score < b.health_score) {
                  return -1;
                }
                if (a.health_score > b.health_score) {
                  return 1;
                }
                return 0;
              }): state.orderBy,
           orderwithfilter : state.filterBoolean === true
            ? state.orderwithfilter.sort((a, b) => {
                if (a.health_score < b.health_score) {
                  return -1;
                }
                if (a.health_score > b.health_score) {
                  return 1;
                }
                return 0;
              }): state.orderwithfilter,
      };
    case ORDER_BY_HEALTHSCORE_FALLING:
      return {
        ...state,
        order: "healthScoreFalling",
        orderString: "healthScoreFalling",
        orderBy:
          state.filterBoolean === false
            ? state.orderBy.sort((a, b) => {
                if (a.health_score > b.health_score) {
                  return -1;
                }
                if (a.health_score < b.health_score) {
                  return 1;
                }
                return 0;
              }): state.orderBy,
           orderwithfilter : state.filterBoolean === true
            ? state.orderwithfilter.sort((a, b) => {
                if (a.health_score > b.health_score) {
                  return -1;
                }
                if (a.health_score < b.health_score) {
                  return 1;
                }
                return 0;
              }): state.orderwithfilter,
      };
    case ORDER_OFF:
      return {
        ...state,
        order: "off",
        orderString: "order",
      };
    case DETAIL_RECIPE:
      return {
        ...state,
        recipeDetail: action.payload,}
        case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,}
    default:
      return state;
  };
}


export default rootReducer;
