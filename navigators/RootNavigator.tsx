import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';

type RootTabsParamList = {
  Home: undefined;
  Search: undefined;
  AddRecipe: undefined;
  Explore: undefined;
  Profile: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootTabsParamList>();

function RootNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="AddRecipe" component={AddRecipeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default RootNavigator;
