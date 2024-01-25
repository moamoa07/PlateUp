// src/redux/actions/bookmarkActions.ts
import { RecipeWithId } from '../../api/model/recipeModel';
import {
  addBookmarkToFirestore,
  getBookmarksFromFirestore,
  removeBookmarkFromFirestore,
} from '../../api/service/bookmarkService';
import {
  getRecipeById,
  getRecipesByIdsFromFirestore,
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
      const bookmarkIds = await getBookmarksFromFirestore(userId);
      const reversedBookmarkIds = [...bookmarkIds].reverse();

      const bookmarkRecipes = await getRecipesByIdsFromFirestore(reversedBookmarkIds);

      // Filter out null values
      const validRecipes = bookmarkRecipes.filter(
        (recipe): recipe is RecipeWithId => recipe !== null
      );

      dispatch(setBookmarks(validRecipes));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setBookmarksError(error.message));
      } else {
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
