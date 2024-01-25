// RootStackParamList.ts
export type RootStackParamList = {
  UserProfile: { userId: string};
  Settings: undefined;
  Bookmarks: undefined;
  ExploreScreen: undefined;
  RecipeDetail: { recipeId: string };
  SearchComponent: undefined;
  // ... other screens with parameters
};
