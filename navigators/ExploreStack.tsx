import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import { RootStackParamList } from '../types/RootStackParamList';

const ExploreStack = createStackNavigator<RootStackParamList>();

function ExploreStackNavigator() {
  return (
    <ExploreStack.Navigator
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
      <ExploreStack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          headerTitle: 'Explore',
          headerTitleStyle: {
            fontFamily: 'Crake-Regular',
            fontSize: 28,
            color: '#232323',
          },
        }}
      />
      <ExploreStack.Screen
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
    </ExploreStack.Navigator>
  );
}

export default ExploreStackNavigator;
