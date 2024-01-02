import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { FIREBASE_AUTH } from './FirebaseConfig';
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

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartLayout">
          {user ? (
            <>
              <Stack.Screen
                name="InsideLayout"
                component={InsideLayout}
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
            </>
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
