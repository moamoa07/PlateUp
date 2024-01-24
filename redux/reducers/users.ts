import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomUser } from '../../api/model/userModel';
import type { RootState } from '../store';

// Define a type for the slice state
export interface UserState {
  user: CustomUser | null;
  loading: boolean;
  users: CustomUser[]; // You may need an array to store fetched users
  userProfile: CustomUser | null;
}

// Define the initial state using that type
const initialState: UserState = {
  user: {
    id: '',
    email: '',
    displayName: '',
    photoURL: null,
  },
  loading: false,
  users: [],
  userProfile: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CustomUser | null>) => {
      state.user = action.payload;
    },
    setSignOutState: (state) => {
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUsers: (state, action: PayloadAction<CustomUser[]>) => {
      state.users = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<CustomUser | null>) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setUser, setSignOutState, setLoading, setUsers, setUserProfile } =
  userSlice.actions;

// Selector to get the user from the state
export const currentUser = (state: RootState) => state.user.user;
export const isLoading = (state: RootState) => state.user.loading;
export const getUsers = (state: RootState) => state.user.users;
export const selectUserProfile = (state: RootState) => state.user.userProfile;
export const selectUserId = (state: RootState) => state.user.user?.id;

export default userSlice.reducer;
