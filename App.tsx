import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { initializeApp } from './Init';
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

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const loadAppResources = async () => {
      await initializeApp();
      setAppReady(true);
    };

    loadAppResources();

    onAuthStateChanged(FIREBASE_AUTH, (userData) => {
      setUser(userData);
    });
  }, []); // Empty dependency array to run the effect only once on mount

  if (!appReady) {
    // You can return a loading indicator here if needed
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartLayout">
          {user ? (
            <Stack.Screen
              name="RootNavigator"
              component={RootNavigator}
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
