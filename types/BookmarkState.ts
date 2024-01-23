import { RecipeWithId } from '../api/model/recipeModel';

export interface BookmarkState {
  bookmarks: RecipeWithId[];
  loading: boolean;
  error: string | null;
}
