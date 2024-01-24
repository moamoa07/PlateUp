// components/OtherUserProfile.js

import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

const OtherUserProfile = ({ route }) => {
  const { userId } = route.params;
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.user.users.find(user => user.id === userId));
  const userRecipes = useAppSelector((state) => state.recipes.userRecipes);

  useEffect(() => {
    dispatch(fetchUserProfile(userId)); // Fetch user profile info
    dispatch(fetchUserRecipes(userId)); // Fetch user's recipes
  }, [userId]);

  if (!userProfile) {
    return <Text>Loading...</Text>; // Or any other loading indicator
  }

  return (
    <View>
      <Text>{userProfile.username}</Text>
      {/* Display other user's profile details and recipes */}
    </View>
  );
};
