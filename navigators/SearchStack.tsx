import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import { RootStackParamList } from '../types/RootStackParamList';

const SearchStack = createStackNavigator<RootStackParamList>();

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator
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
      <SearchStack.Screen
        name="SearchComponent"
        component={SearchScreen}
        options={{
          headerTitle: 'Search',
          headerTitleStyle: {
            color: '#232323',
            fontFamily: 'Crake-Regular',
            fontSize: 28,
          },
          headerBackTitleVisible: false,
        }}
      />
      <SearchStack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
          headerTitleStyle: {
            fontFamily: 'Crake-Regular',
            fontSize: 28,
            color: '#232323',
          },
        }}
      />
      <SearchStack.Screen
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
    </SearchStack.Navigator>
  );
}

export default SearchStackNavigator;
