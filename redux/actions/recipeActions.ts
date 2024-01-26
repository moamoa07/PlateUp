import { Recipe, RecipeWithId } from '../../api/model/recipeModel';
import {
  addRecipeToFirestore,
  deleteRecipeFromFirestore,
  getAllRecipes,
  getAllSearchedRecipes,
  getRecipeById,
  uploadImageToFirestore,
} from '../../api/service/recipeService';
import { FETCH_RECIPE_ERROR, FETCH_RECIPE_START } from '../../types/Action';
import {
  addRecipeSuccess,
  clearUserRecipes,
  deleteRecipeSuccess,
  fetchRecipeSuccess,
  fetchRecipesSuccess,
  fetchUserRecipesError,
  fetchUserRecipesStart,
  fetchUserRecipesSuccess,
  setHasMoreRecipes,
  setLoading,
} from '../reducers/recipes';
import { currentUser } from '../reducers/users';
import { AppDispatch, RootState } from '../store';

// THUNK ACTION CREATOR

// Thunk action creator for adding a recipe
export const addRecipe =
  (recipeData: Recipe, localImagePath: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(setLoading(true));
      const userId = currentUser(getState())?.id;
      if (!userId) {
        console.error('No user ID found');
        return;
      }

      const recipeId = await addRecipeToFirestore(recipeData, userId);
      let downloadURL = null;

      if (localImagePath) {
        downloadURL = await uploadImageToFirestore(localImagePath, recipeId);
      }

      const newRecipe: RecipeWithId = {
        ...recipeData,
        id: recipeId,
        imageUrl: downloadURL,
        userId, // userId is added here
      };

      dispatch(addRecipeSuccess({ recipe: newRecipe, userId }));
    } catch (error) {
      console.error('Error in addRecipe thunk:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

// Adjust the fetchRecipes thunk action
export const fetchRecipes =
  (lastFetchedRecipeId: string | null, limitNumber: number) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true)); // Set loading state
    try {
      const fetchedData = await getAllRecipes(lastFetchedRecipeId, limitNumber);
      dispatch(
        fetchRecipesSuccess({
          recipes: fetchedData.recipes,
          lastFetchedRecipeId: fetchedData.lastFetchedRecipeId,
        })
      );
      dispatch(setHasMoreRecipes(fetchedData.lastFetchedRecipeId != null));
    } catch (error) {
      dispatch({
        type: FETCH_RECIPE_ERROR,
        payload:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
    } finally {
      dispatch(setLoading(false)); // Reset loading state
    }
  };

export const fetchSearchedRecipes =
  (lastFetchedRecipeId: string | null) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));

    try {
      const fetchedData = await getAllSearchedRecipes(lastFetchedRecipeId);
      dispatch(
        fetchRecipesSuccess({
          recipes: fetchedData.recipes,
          lastFetchedRecipeId: fetchedData.lastFetchedRecipeId,
        })
      );
      dispatch(setHasMoreRecipes(fetchedData.lastFetchedRecipeId != null));
    } catch (error) {
      dispatch({
        type: FETCH_RECIPE_ERROR,
        payload:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchRecipeById =
  (recipeId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: FETCH_RECIPE_START });
      const recipe = await getRecipeById(recipeId); // API request
      if (recipe) {
        dispatch(fetchRecipeSuccess(recipe)); // Dispatch the action with the recipe
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

export const fetchUserRecipes =
  (userId: string, lastFetchedRecipeId: string | null, limit: number) =>
  async (dispatch: AppDispatch) => {
    // console.log('Dispatching fetchUserRecipes', {
    //   userId,
    //   lastFetchedRecipeId,
    //   limit,
    // });
    dispatch(clearUserRecipes());
    dispatch(fetchUserRecipesStart());
    try {
      const fetchedData = await getAllRecipes(
        lastFetchedRecipeId,
        limit,
        userId
      );
      // console.log('Fetched data:', fetchedData);
      dispatch(
        fetchUserRecipesSuccess({
          userRecipes: fetchedData.recipes,
          userLastFetchedRecipeId: fetchedData.lastFetchedRecipeId,
          limit: limit, // Include the limit here
        })
      );
    } catch (error) {
      console.error('Error in fetchUserRecipes:', error);
      if (error instanceof Error) {
        dispatch(fetchUserRecipesError(error.message));
      } else {
        dispatch(fetchUserRecipesError('An unexpected error occurred'));
      }
    }
  };

export const deleteRecipe =
  (recipeId: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const userId = currentUser(getState())?.id;
      if (!userId) {
        console.error('No user ID found');
        return;
      }

      await deleteRecipeFromFirestore(recipeId, userId);

      // Dispatch an action to remove the recipe from state
      dispatch(deleteRecipeSuccess(recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
      // Dispatch an error action if needed
    }
  };
