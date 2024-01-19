import { RecipeWithId } from '../api/model/recipeModel';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const SET_LOADING = 'SET_LOADING';
export const FETCH_RECIPE_START = 'FETCH_RECIPE_START';
export const FETCH_RECIPE_SUCCESS = 'FETCH_RECIPE_SUCCESS';
export const FETCH_RECIPE_ERROR = 'FETCH_RECIPE_ERROR';
export const FETCH_USER_RECIPES_START = 'FETCH_USER_RECIPES_START';
export const FETCH_USER_RECIPES_SUCCESS = 'FETCH_USER_RECIPES_SUCCESS';
export const FETCH_USER_RECIPES_ERROR = 'FETCH_USER_RECIPES_ERROR';
export const GENERAL_RECIPES_LIMIT = 3;
export const USER_RECIPES_LIMIT = 9;

// Define RecipeState type
export interface RecipeState {
  recipes: RecipeWithId[];
  lastFetchedRecipeId: string | null;
  isLoading: boolean;
  currentRecipe: RecipeWithId | null;
  error: string | null;
  hasMoreRecipes: boolean;
  userRecipes: RecipeWithId[];
  userLastFetchedRecipeId: string | null;
  loadingUserRecipes: boolean;
  hasMoreUserRecipes: boolean;
}

export interface FetchRecipesAction {
  type: typeof FETCH_RECIPES;
  payload: {
    recipes: RecipeWithId[];
    lastFetchedRecipeId: string | null;
  };
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface FetchRecipeStartAction {
  type: typeof FETCH_RECIPE_START;
}

export interface FetchRecipeSuccessAction {
  type: typeof FETCH_RECIPE_SUCCESS;
  payload: RecipeWithId;
}

export interface FetchRecipeErrorAction {
  type: typeof FETCH_RECIPE_ERROR;
  payload: string;
}

export interface FetchUserRecipesStartAction {
  type: typeof FETCH_USER_RECIPES_START;
}

export interface FetchUserRecipesSuccessAction {
  type: typeof FETCH_USER_RECIPES_SUCCESS;
  payload: {
    userRecipes: RecipeWithId[];
    userLastFetchedRecipeId: string | null;
  };
}

export interface FetchUserRecipesErrorAction {
  type: typeof FETCH_USER_RECIPES_ERROR;
  payload: string;
}

export type RecipeActionTypes =
  | FetchRecipesAction
  | SetLoadingAction
  | FetchRecipeStartAction
  | FetchRecipeSuccessAction
  | FetchRecipeErrorAction
  | FetchUserRecipesStartAction
  | FetchUserRecipesSuccessAction
  | FetchUserRecipesErrorAction;
