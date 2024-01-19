import { createStackNavigator } from '@react-navigation/stack';
import BookmarkScreen from '../screens/BookmarkScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import SettingScreen from '../screens/SettingScreen';
import { RootStackParamList } from '../types/RootStackParamList';

const ProfileStack = createStackNavigator<RootStackParamList>();

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'black',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: { fontFamily: 'Jost-Regular' },
        cardStyle: { backgroundColor: '#fff' },
        cardShadowEnabled: false,
      }}
    >
      <ProfileStack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Your Profile',
          headerTitleStyle: {
            fontFamily: 'Crake-Regular',
            fontSize: 28,
            color: '#232323',
          },
        }}
      />
      <ProfileStack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{
          headerTitle: 'Recipe',
          headerTitleStyle: {
            color: '#232323',
            fontFamily: 'Crake-Regular',
            fontSize: 28,
          },
          headerBackTitleVisible: false,
        }}
      />
      <ProfileStack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerTitle: 'Settings',
          headerTitleStyle: {
            color: '#232323',
            fontFamily: 'Crake-Regular',
            fontSize: 28,
          },
          headerBackTitleVisible: false,
        }}
      />
      <ProfileStack.Screen
        name="Bookmark"
        component={BookmarkScreen}
        options={{
          headerTitle: 'Bookmarks',
          headerTitleStyle: {
            color: '#232323',
            fontFamily: 'Crake-Regular',
            fontSize: 28,
          },
          headerBackTitleVisible: false,
        }}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackNavigator;
