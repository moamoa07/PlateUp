import { getAllRecipes, getRecipeById } from '../../api/service/recipeService';
import {
  FETCH_RECIPE_ERROR,
  FETCH_RECIPE_START,
  FETCH_RECIPE_SUCCESS,
} from '../../types/Action';
import { fetchRecipesSuccess } from '../reducers/recipes';
import { AppDispatch } from '../store';

// THUNK ACTION CREATOR

export const fetchRecipes =
  (lastFetchedRecipeId: string | null, limitNumber: number = 2) =>
  async (dispatch: AppDispatch) => {
    const fetchedData = await getAllRecipes(lastFetchedRecipeId, limitNumber);
    console.log('Fetched data:', fetchedData);

    dispatch(
      fetchRecipesSuccess({
        recipes: fetchedData.recipes,
        lastFetchedRecipeId: fetchedData.lastFetchedRecipeId,
      })
    );
  };

export const fetchRecipeById =
  (recipeId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: FETCH_RECIPE_START });
      const recipe = await getRecipeById(recipeId); // API request
      console.log('Fetched recipe:', recipe);
      if (recipe) {
        // Convert non-serializable values to serializable format
        const serializableRecipe = {
          ...recipe,
          createdAt: recipe.createdAt.toDate().toISOString(),
          updatedAt: recipe.updatedAt.toDate().toISOString(),
        };
        dispatch({ type: FETCH_RECIPE_SUCCESS, payload: serializableRecipe });
      } else {
        dispatch({ type: FETCH_RECIPE_ERROR, payload: 'No such recipe found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching recipe:', error);
        dispatch({ type: FETCH_RECIPE_ERROR, payload: error.message });
      } else {
        // Handle non-Error objects
        console.error('An unexpected error occurred', error);
        dispatch({
          type: FETCH_RECIPE_ERROR,
          payload: 'An unexpected error occurred',
        });
      }
    }
  };
