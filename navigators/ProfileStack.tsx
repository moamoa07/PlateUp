import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import { RootStackParamList } from './RootStackParamList';

const ProfileStack = createStackNavigator<RootStackParamList>();

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="UserProfile" component={ProfileScreen} />
      <ProfileStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackNavigator;
