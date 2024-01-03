import { PixelRatio } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import AddRecipeIcon from '../components/icons/AddRecipeIcon';
import ExploreIcon from '../components/icons/ExploreIcon';
import HomeIcon from '../components/icons/HomeIcon';
import ProfileIcon from '../components/icons/ProfileIcon';
import SearchIcon from '../components/icons/SearchIcon';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';

type RootTabsParamList = {
  Home: undefined;
  Search: undefined;
  Recipe: undefined;
  Explore: undefined;
  Profile: undefined;
};

const thinBorder = 1 / PixelRatio.get();

const Tab = createMaterialBottomTabNavigator<RootTabsParamList>();

function RootNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#232323"
      inactiveColor="#D9D9D9"
      barStyle={{
        backgroundColor: 'white',
        borderTopWidth: thinBorder,
        borderTopColor: '#232323',
      }}
      labeled={true}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon size={32} fill={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => <SearchIcon size={32} fill={color} />,
        }}
      />
      <Tab.Screen
        name="Recipe"
        component={AddRecipeScreen}
        options={{
          tabBarIcon: ({ color }) => <AddRecipeIcon size={32} fill={color} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color }) => <ExploreIcon size={32} fill={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon size={32} fill={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default RootNavigator;
