// src/redux/actions/bookmarkActions.ts
import { RecipeWithId } from '../../api/model/recipeModel';
import {
  addBookmarkToFirestore,
  getBookmarksFromFirestore,
  getRecipeById,
  removeBookmarkFromFirestore,
} from '../../api/service/recipeService';
import {
  setBookmarks,
  setBookmarksError,
  setBookmarksLoading,
} from '../reducers/bookmarks';
import { AppDispatch, RootState } from '../store';

export const fetchBookmarks =
  (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(setBookmarksLoading(true));
    try {
      // Get an array of bookmarked recipe IDs
      const bookmarkIds = await getBookmarksFromFirestore(userId);

      // Fetch each recipe's full details
      const bookmarkRecipes = await Promise.all(
        bookmarkIds.map((id) => getRecipeById(id))
      );

      // Filter out any null values (in case some recipes weren't found)
      const validRecipes = bookmarkRecipes.filter(
        (recipe): recipe is RecipeWithId => recipe !== null
      );

      // Dispatch action to set the fetched bookmarks
      dispatch(setBookmarks(validRecipes));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setBookmarksError(error.message));
      } else {
        // Handle cases where the error is not an instance of Error
        dispatch(setBookmarksError('An unknown error occurred'));
      }
    } finally {
      dispatch(setBookmarksLoading(false));
    }
  };

export const addBookmark =
  (userId: string, recipeId: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      await addBookmarkToFirestore(userId, recipeId);
      const recipeDetails = await getRecipeById(recipeId);
      if (recipeDetails) {
        const updatedBookmarks = [
          ...getState().bookmarks.bookmarks,
          recipeDetails,
        ];
        dispatch(setBookmarks(updatedBookmarks));
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setBookmarksError(error.message));
      } else {
        dispatch(setBookmarksError('An unknown error occurred'));
      }
    }
  };

export const removeBookmark =
  (userId: string, recipeId: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      await removeBookmarkFromFirestore(userId, recipeId);
      const updatedBookmarks = getState().bookmarks.bookmarks.filter(
        (recipe) => recipe.id !== recipeId
      );
      dispatch(setBookmarks(updatedBookmarks));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setBookmarksError(error.message));
      } else {
        dispatch(setBookmarksError('An unknown error occurred'));
      }
    }
  };
