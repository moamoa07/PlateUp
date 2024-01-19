import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import { RootStackParamList } from '../types/RootStackParamList';

const ProfileStack = createStackNavigator<RootStackParamList>();

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{
          headerTitle: 'User Profile',
          headerTitleStyle: { fontFamily: 'Jost-Regular', fontSize: 20 },
        }}
      />
      <ProfileStack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{
          headerTitle: 'Recipe Detail',
          headerTitleStyle: { fontFamily: 'Jost-Regular', fontSize: 20 },
        }}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackNavigator;
