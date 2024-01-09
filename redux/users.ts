import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import type { RootState } from './store';

// Define a type for the slice state
export interface UserState {
  user: User | null;
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
     // Add other user-related actions as needed
  },
});

export const { setUser } = userSlice.actions;

// Selector to get the user from the state
export const select = (state: RootState) => (state.user as UserState).user;

export default userSlice.reducer;
