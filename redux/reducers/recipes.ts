import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecipeWithId } from '../../api/model/recipeModel';
import { LIMIT_NUMBER, RecipeState } from '../../types/Action';
import { RootState } from '../store';

const initialState: RecipeState = {
  recipes: [],
  lastFetchedRecipeId: null,
  isLoading: false,
  currentRecipe: null,
  error: null,
  hasMoreRecipes: true,
};

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
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
      state.hasMoreRecipes = newRecipes.length === LIMIT_NUMBER; //  2 is the limit per fetch
    },
    setHasMoreRecipes: (state, action: PayloadAction<boolean>) => {
      state.hasMoreRecipes = action.payload;
    },
    fetchRecipeError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    // Add other reducers like updateRecipe, deleteRecipe, etc. as needed
  },
});

export const {
  updateRecipesState,
  setLoading,
  fetchRecipesSuccess,
  setHasMoreRecipes,
  fetchRecipeError,
} = recipesSlice.actions;

// Update your selector and other parts of the code where you use this reducer

// Selector to get the recipes from the state
export const selectRecipes = (state: RootState): RecipeWithId[] =>
  state.recipes.recipes;

// Selector to get the isLoading flag from the state
export const selectIsLoading = (state: RootState) => state.recipes.isLoading;

// Selector to get the last fetched recipe ID from the state
export const selectLastFetchedRecipeId = (state: RootState) =>
  state.recipes.lastFetchedRecipeId;

// Selector to get the hasMoreRecipes flag from the state
export const selectHasMoreRecipes = (state: RootState) =>
  state.recipes.hasMoreRecipes;

// In your recipesSlice file
export const selectUserRecipes = (state: RootState, userId: string) =>
  state.recipes.recipes.filter((recipe) => recipe.userId === userId);

export default recipesSlice.reducer;
