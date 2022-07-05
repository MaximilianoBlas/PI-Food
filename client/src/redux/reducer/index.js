import { GET_ALL_RECIPE, FILTER_RECIPE, FILTER_OFF,ORDER_OFF,ORDER_BY_TITLE_UPWARD,ORDER_BY_HEALTHSCORE_UPWARD, ORDER_BY_TITLE_FALLING, ORDER_BY_HEALTHSCORE_FALLING, DETAIL_RECIPE, DETAIL_RECIPE_OFF,CREATE_DIETS, GET_ALL_RECIPE_OFF,SET_CURRENT_PAGE, DETAIL_STATE, CHANGE_PAGE, changePage } from "../actions/index";



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
  changePage: true,
  currentPage: 1,
  iComeFromDetail: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPE:
      console.log("reducer");
      console.log(action.payload);
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
      console.log("reducer show");

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
      console.log("reducer title upward"); 
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
      console.log("reducer title falling");
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
      console.log("reducer orderByHealthScore");
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
      console.log("reducer orderByHealthScore");
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
      console.log("reducer detail");
      console.log(action.payload);
      return {
        ...state,
        recipeDetail: action.payload,}
    case DETAIL_RECIPE_OFF:
      return {
        ...state,
        recipeDetail: [],
        iComeFromDetail: true}
    case CREATE_DIETS:
      return {
        ...state,}
        case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,}
        case DETAIL_STATE:
          console.log("reducer detail state");
          console.log(action.payload);
      return {
        ...state,
        iComeFromDetail: action.payload,}
        case CHANGE_PAGE:
          console.log(action.payload);
      return {
        ...state,
        changePage: action.payload,}
    default:
      return state;
  };
}


export default rootReducer;
