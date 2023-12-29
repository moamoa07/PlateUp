import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { FIREBASE_AUTH } from './FirebaseConfig';
import theme from './Theme';
import Home from './app/screens/Home';
import List from './app/screens/List';
import SignIn from './app/screens/SignIn';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
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
        component={Home}
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
      console.log('user', user);
      setUser(user);
    });
  }, []);
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          {user ? (
            <Stack.Screen
              name="Inside"
              component={InsideLayout}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
