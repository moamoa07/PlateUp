import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { initApp } from './Init';
import theme from './Theme';
import RootNavigator from './navigators/RootNavigator';
import BookmarkScreen from './screens/BookmarkScreen';
import SettingScreen from './screens/SettingScreen';
import SignInScreen from './screens/SignInScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createNativeStackNavigator();
const StartStack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function StartLayout() {
  return (
    <StartStack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
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
      <Stack.Screen
        name="RootNavigator"
        component={RootNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Bookmark"
        component={BookmarkScreen}
        options={{ headerShown: false }}
      />
    </InsideStack.Navigator>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const loadAppResources = async () => {
      console.log('Start initializing app');
      await initApp();
      console.log('App initialization complete');
      setAppReady(true);
    };

    console.log('Before loading app resources');
    loadAppResources();
    console.log('After loading app resources');

    onAuthStateChanged(FIREBASE_AUTH, (userData) => {
      setUser(userData);
    });
  }, []); // Empty dependency array to run the effect only once on mount

  if (!appReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}

export default App;
