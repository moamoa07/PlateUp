import { getAllUsers } from '../../api/service/userService';
import { setLoading, setUsers } from '../reducers/users';
import { AppDispatch } from '../store';

// Async action to fetch users
export const fetchUsers = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true)); // Set loading state
  try {
    // Fetch users using your API function
    const fetchedData = await getAllUsers();

    // Dispatch success action to update the state
    dispatch(setUsers(fetchedData.users));
  } catch (error) {
    // Handle error
  } finally {
    dispatch(setLoading(false)); // Reset loading state
  }
};
