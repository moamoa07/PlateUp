import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecipeWithId } from '../../api/model/recipeModel';
import { GENERAL_RECIPES_LIMIT, RecipeState } from '../../types/Action';
import { RootState } from '../store';

const initialState: RecipeState = {
  recipes: [],
  lastFetchedRecipeId: null,
  isLoading: false,
  currentRecipe: null,
  error: null,
  hasMoreRecipes: true,
  userRecipes: [],
  userLastFetchedRecipeId: null,
  loadingUserRecipes: false,
  hasMoreUserRecipes: false,
};

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    // Handle the action for adding a recipe
    addRecipeSuccess: (
      state,
      action: PayloadAction<{
        recipe: RecipeWithId;
        userId: string | undefined;
      }>
    ) => {
      const { recipe, userId } = action.payload;
      state.recipes = [recipe, ...state.recipes];

      // Add to userRecipes if it belongs to the current user
      if (userId && recipe.userId === userId) {
        state.userRecipes = [recipe, ...state.userRecipes];
      }
    },
    // Updates the state based on the fetched recipes
    updateRecipesState: (
      state,
      action: PayloadAction<{
        recipes: RecipeWithId[];
        lastFetchedRecipeId: string | null;
      }>
    ) => {
      state.recipes = [...state.recipes, ...action.payload.recipes];
      state.lastFetchedRecipeId = action.payload.lastFetchedRecipeId;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    fetchRecipesSuccess: (
      state,
      action: PayloadAction<{
        recipes: RecipeWithId[];
        lastFetchedRecipeId: string | null; // Corrected property name
      }>
    ) => {
      const newRecipes = action.payload.recipes.filter(
        (newRecipe): newRecipe is RecipeWithId =>
          !state.recipes.some(
            (existingRecipe): existingRecipe is RecipeWithId =>
              existingRecipe.id === newRecipe.id
          )
      );
      state.recipes = [...state.recipes, ...newRecipes];
      state.lastFetchedRecipeId = action.payload.lastFetchedRecipeId;
      state.isLoading = false;
      state.hasMoreRecipes = newRecipes.length === GENERAL_RECIPES_LIMIT;
    },
    // New reducer for handling fetched recipe details
    fetchRecipeSuccess: (state, action: PayloadAction<RecipeWithId>) => {
      state.currentRecipe = action.payload;
      state.isLoading = false;
    },
    setHasMoreRecipes: (state, action: PayloadAction<boolean>) => {
      state.hasMoreRecipes = action.payload;
    },
    fetchRecipeError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    // Reducer for starting user recipe fetch
    fetchUserRecipesStart: (state) => {
      state.loadingUserRecipes = true;
    },
    // Reducer for successful user recipe fetch
    fetchUserRecipesSuccess: (
      state,
      action: PayloadAction<{
        userRecipes: RecipeWithId[];
        userLastFetchedRecipeId: string | null;
        limit: number;
      }>
    ) => {
      // Filter out any recipes already in state
      const newRecipes = action.payload.userRecipes.filter(
        (newRecipe) =>
          !state.userRecipes.some(
            (existingRecipe) => existingRecipe.id === newRecipe.id
          )
      );

      state.userRecipes = [...state.userRecipes, ...newRecipes];
      state.userLastFetchedRecipeId = action.payload.userLastFetchedRecipeId;
      state.loadingUserRecipes = false;
      state.hasMoreUserRecipes = newRecipes.length === action.payload.limit;
    },

    // Reducer for user recipe fetch error
    fetchUserRecipesError: (state, action: PayloadAction<string>) => {
      state.loadingUserRecipes = false;
      state.error = action.payload;
    },
    clearUserRecipes: (state) => {
      state.userRecipes = [];
      state.userLastFetchedRecipeId = null;
      state.loadingUserRecipes = false;
      state.hasMoreUserRecipes = false;
    },
  },
});

export const {
  addRecipeSuccess,
  updateRecipesState,
  setLoading,
  fetchRecipesSuccess,
  fetchRecipeSuccess,
  setHasMoreRecipes,
  fetchRecipeError,
  fetchUserRecipesStart,
  fetchUserRecipesSuccess,
  fetchUserRecipesError,
  clearUserRecipes,
} = recipesSlice.actions;

// Update your selector and other parts of the code where you use this reducer

// Selector to get the recipes from the state
export const selectRecipes = (state: RootState): RecipeWithId[] =>
  state.recipes.recipes;

// Selector to get the current recipe from the state
export const selectCurrentRecipe = (state: RootState) =>
  state.recipes.currentRecipe;

// Selector to get the isLoading flag from the state
export const selectIsLoading = (state: RootState) => state.recipes.isLoading;

// Selector to get the last fetched recipe ID from the state
export const selectLastFetchedRecipeId = (state: RootState) =>
  state.recipes.lastFetchedRecipeId;

// Selector to get the hasMoreRecipes flag from the state
export const selectHasMoreRecipes = (state: RootState) =>
  state.recipes.hasMoreRecipes;

// Selector to get user-specific recipes from the state
export const selectUserRecipes = (state: RootState) =>
  state.recipes.userRecipes;

// Selector to get the loading state for user-specific recipes
export const selectLoadingUserRecipes = (state: RootState) =>
  state.recipes.loadingUserRecipes;

// Selector to get the last fetched user recipe ID from the state
export const selectUserLastFetchedRecipeId = (state: RootState) =>
  state.recipes.userLastFetchedRecipeId;

// Selector to get the flag indicating if there are more user recipes
export const selectHasMoreUserRecipes = (state: RootState) =>
  state.recipes.hasMoreUserRecipes;

export default recipesSlice.reducer;
