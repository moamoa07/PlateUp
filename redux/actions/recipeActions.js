import { getAllRecipes } from '../api/service/recipeService';
import { FETCH_RECIPES, SET_LOADING } from '../types/Action';

export const fetchRecipes = (lastFetchedRecipe) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  const fetchedData = await getAllRecipes(lastFetchedRecipe);
  dispatch({
    type: FETCH_RECIPES,
    payload: fetchedData,
  });
};
