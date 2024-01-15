import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { initApp } from './Init';
import theme from './Theme';
import { CustomUser } from './api/model/userModel';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import RootNavigator from './navigators/RootNavigator';
import { store } from './redux/store';
import { currentUser, setUser } from './redux/users';
import BookmarkScreen from './screens/BookmarkScreen';
import CreateProfileScreen from './screens/CreateProfileScreen';
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
      <Stack.Screen
        name="CreateProfileScreen"
        component={CreateProfileScreen}
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

function AppContainer() {
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const loadAppResources = async () => {
      console.log('Start initializing app');
      await initApp();
      console.log('App initialization complete');
      setAppReady(true);
    };

    const handleAuthStateChanged = (userData: User | null) => {
      // If userData is null, set null in the Redux store
      if (!userData) {
        dispatch(setUser(null));
        return;
      } // Convert User to CustomUser

      const customUserData: CustomUser = {
        id: userData.uid,
        email: userData.email || '',
        displayName: userData.displayName || '',
        photoURL: userData.photoURL || null,
      }; // Dispatch action to update user state in Redux

      dispatch(setUser(customUserData));
    };

    console.log('Before loading app resources');

    loadAppResources();

    const unsubscribeAuthStateChange = onAuthStateChanged(
      FIREBASE_AUTH,
      handleAuthStateChanged
    );

    console.log('After loading app resources');

    return () => unsubscribeAuthStateChange();
  }, [dispatch]); // Empty dependency array to run the effect only once on mount

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

function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
