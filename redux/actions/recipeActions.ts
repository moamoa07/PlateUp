import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Dispatch } from 'react';
import { getAllRecipes } from '../../api/service/recipeService';
import {
  FETCH_RECIPES,
  RecipeActionTypes,
  SET_LOADING,
} from '../../types/Action';

export const fetchRecipes =
  (lastFetchedRecipe: QueryDocumentSnapshot<DocumentData> | null) =>
  async (dispatch: Dispatch<RecipeActionTypes>) => {
    dispatch({ type: SET_LOADING, payload: true });
    const fetchedData = await getAllRecipes(lastFetchedRecipe);
    dispatch({
      type: FETCH_RECIPES,
      payload: fetchedData,
    });
  };
