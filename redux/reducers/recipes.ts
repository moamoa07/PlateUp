import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Recipe } from '../../api/model/recipeModel';
import { RecipeState } from '../../types/Action';
import { RootState } from '../store';

const initialState: RecipeState = {
  recipes: [],
  lastFetchedRecipe: null,
  isLoading: false,
};

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    fetchRecipes: (
      state,
      action: PayloadAction<{
        recipes: Recipe[];
        lastFetchedRecipe: QueryDocumentSnapshot<DocumentData> | null;
      }>
    ) => {
      state.recipes = [...state.recipes, ...action.payload.recipes];
      state.lastFetchedRecipe = action.payload.lastFetchedRecipe;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { fetchRecipes, setLoading } = recipesSlice.actions;

// Selector to get the recipes from the state
export const selectRecipes = (state: RootState) => state.recipes.recipes;
export const selectIsLoading = (state: RootState) => state.recipes.isLoading;

export default recipesSlice.reducer;
