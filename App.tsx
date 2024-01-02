import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { FIREBASE_AUTH } from './FirebaseConfig';
import theme from './Theme';
import RootNavigator from './navigators/RootNavigator';
import SignInScreen from './screens/SignInScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createNativeStackNavigator();
const StartStack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function StartLayout() {
  return (
    <StartStack.Navigator>
      <StartStack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
    </StartStack.Navigator>
  );
}

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="RootNavigator"
        component={RootNavigator}
        options={{ headerShown: false }}
      />
    </InsideStack.Navigator>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadAppResources = async () => {
      await handleLoadFonts();
      await handleOnLayout();
    };

    loadAppResources();

    onAuthStateChanged(FIREBASE_AUTH, (userData) => {
      setUser(userData);
    });
  }, []); // Empty dependency array to run the effect only once on mount

  const handleLoadFonts = async () => {
    await Font.loadAsync({
      CrakeRegular: require('./assets/fonts/craketest-regular.otf'),
      CrakeBold: require('./assets/fonts/craketest-bold.otf'),
      Jost: require('./assets/fonts/Jost-VariableFont_wght.ttf'),
    });
  };

  const handleOnLayout = async () => {
    await SplashScreen.hideAsync();
    setIsLoaded(true);
  };

  if (!isLoaded) {
    // You can return a loading indicator here if needed
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartLayout">
          {user ? (
            <Stack.Screen
              name="InsideLayout"
              component={InsideLayout}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="StartLayout"
              component={StartLayout}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
