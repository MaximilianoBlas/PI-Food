import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/actions";



const useMovePage = () => {
    const [numberPageRecipes, setnumberPageRecipes] = useState(1);
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.currentPage)

     if (
         (currentPage === 1 || currentPage === 2) &&
         numberPageRecipes !== 1
     ) {
         setnumberPageRecipes(1);
     } else if (
         numberPageRecipes !== currentPage - 1 &&
         currentPage > 2
     ) {
         setnumberPageRecipes(currentPage - 1);
     }


    const start = () => dispatch(setCurrentPage(1));

    const finish = (recipes, recipesPerPage) =>  dispatch(setCurrentPage(Math.ceil(recipes.length / recipesPerPage)));

    function next(recipes, recipesPerPage) {
        if (currentPage < Math.ceil(recipes.length / recipesPerPage)) {
            dispatch(setCurrentPage(currentPage + 1))
        }
    }
    function previus(e) {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1))
        }
    }
    function positionOne() {
        dispatch(setCurrentPage(numberPageRecipes));
    }
    function positionTwo(recipes, recipesPerPage, ) {
        if (currentPage < Math.ceil(recipes.length / recipesPerPage)) {
            dispatch(setCurrentPage(numberPageRecipes + 1));
        }

    }
    function positionThree(recipes, recipesPerPage, ) {
        if (currentPage + 1 < Math.ceil(recipes.length / recipesPerPage)) {
            dispatch(setCurrentPage(numberPageRecipes + 2));
        }
    }

    return {
        start,
        finish,
        previus,
        next,
        positionOne,
        positionTwo,
        positionThree,
        numberPageRecipes,
    };
};

export default useMovePage
