import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Recipe } from '../api/model/recipeModel';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const SET_LOADING = 'SET_LOADING';

// Define your RecipeState type
export interface RecipeState {
  recipes: Recipe[];
  lastFetchedRecipe: QueryDocumentSnapshot<DocumentData> | null;
  isLoading: boolean;
}

export interface FetchRecipesAction {
  type: typeof FETCH_RECIPES;
  payload: {
    recipes: Recipe[];
    lastFetchedRecipe: QueryDocumentSnapshot | null;
  };
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export type RecipeActionTypes = FetchRecipesAction | SetLoadingAction;
