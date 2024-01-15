import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './reducers/recipes';
import userReducer from './reducers/users';

export const store = configureStore({
  reducer: {
    user: userReducer,
    recipes: recipesReducer,
  },
});

// Typescript
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
