// src/redux/reducers/bookmarks.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecipeWithId } from '../../api/model/recipeModel';
import { BookmarkState } from '../../types/BookmarkState';
import { RootState } from '../store';

const initialState: BookmarkState = {
  bookmarks: [],
  loading: false,
  error: null,
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setBookmarks: (state, action: PayloadAction<RecipeWithId[]>) => {
      state.bookmarks = action.payload;
    },
    setBookmarksLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setBookmarksError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setBookmarks, setBookmarksLoading, setBookmarksError } =
  bookmarksSlice.actions;

export const selectBookmarks = (state: RootState) => state.bookmarks.bookmarks;

export default bookmarksSlice.reducer;
