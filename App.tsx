import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { FIREBASE_AUTH } from './FirebaseConfig';
import theme from './Theme';
import HomeScreen from './screens/HomeScreen';
import List from './screens/List';
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
        name="List"
        component={List}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* <InsideStack.Screen name="Profile" component={Profile} />
      <InsideStack.Screen name="Explore" component={Explore} /> */}
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
