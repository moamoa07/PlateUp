import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RecipeWithId } from '../../api/model/recipeModel';
import { getAllRecipes } from '../../api/service/recipeService';
import { LIMIT_NUMBER, RecipeState } from '../../types/Action';
import { RootState } from '../store';

// Thunk Action Creator (has to be in this file because of cycle dependency otherwise)
export const fetchUserRecipes = createAsyncThunk(
  'recipes/fetchUserRecipes',
  async (userId: string, thunkAPI) => {
    try {
      const limit = 9; // Set your desired limit
      const fetchedData = await getAllRecipes(null, limit, userId);
      return {
        recipes: fetchedData.recipes,
        lastFetchedRecipeId: fetchedData.lastFetchedRecipeId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserRecipes.fulfilled, (state, action) => {
        // Ensure that we only add recipes that aren't already in the state
        const newRecipes = action.payload.recipes.filter(
          (newRecipe) =>
            !state.recipes.some(
              (existingRecipe) => existingRecipe.id === newRecipe.id
            )
        );
        state.recipes = [...state.recipes, ...newRecipes];
        state.lastFetchedRecipeId = action.payload.lastFetchedRecipeId;
        state.isLoading = false;
        // Update hasMoreRecipes based on whether new recipes were added
        state.hasMoreRecipes =
          newRecipes.length === action.payload.recipes.length;
      })
      .addCase(fetchUserRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
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

// Memoized selector
export const selectUserRecipes = createSelector(
  [(state: RootState) => state.recipes.recipes, (_, userId: string) => userId],
  (recipes, userId) => recipes.filter((recipe) => recipe.userId === userId)
);

export default recipesSlice.reducer;
