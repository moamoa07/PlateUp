import { getAllUsers, getLoggedInUser } from '../../api/service/userService';
import {
  getUserProfile,
  setLoading,
  setUser,
  setUserProfile,
  setUsers,
} from '../reducers/users';
import { AppDispatch } from '../store';

// Async action to fetch the logged-in user
export const fetchLoggedInUser = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true)); // Set loading state
  try {
    // Fetch the logged-in user using your API function
    const loggedInUser = await getLoggedInUser();

    // Dispatch success action to update the state
    dispatch(setUser(loggedInUser));
  } catch (error) {
    console.error('Error fetching logged-in user:', error);
  } finally {
    dispatch(setLoading(false)); // Reset loading state
  }
};

// Async action to fetch users
export const fetchUsers = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true)); // Set loading state
  try {
    // Fetch users using your API function
    const fetchedData = await getAllUsers();

    // Dispatch success action to update the state
    dispatch(setUsers(fetchedData.users));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false)); // Reset loading state
  }
};

// export const fetchUserProfile =
//   (userId: string) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setLoading(true));

//       const userProfile = getUserProfile(userId);

//       dispatch(setUserProfile(userProfile));
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };
