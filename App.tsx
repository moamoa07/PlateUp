import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { FIREBASE_AUTH } from './FirebaseConfig';
import theme from './Theme';
import RootNavigator from './navigators/RootNavigator';
import BookmarkScreen from './screens/BookmarkScreen';
import SettingScreen from './screens/SettingScreen';
import SignInScreen from './screens/SignInScreen';

const Stack = createNativeStackNavigator();
// const InsideStack = createNativeStackNavigator();
// function InsideLayout() {
//   return (
//     <InsideStack.Navigator>
//       <InsideStack.Screen
//         name="List"
//         component={ListScreen}
//         options={{ headerShown: false }}
//       />
//       <InsideStack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{ headerShown: false }}
//       />
//       {/* <InsideStack.Screen name="Profile" component={Profile} />
//       <InsideStack.Screen name="Explore" component={Explore} /> */}
//     </InsideStack.Navigator>
//   );
// }

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
            <>
              <Stack.Screen
                name="Inside"
                component={RootNavigator}
                // component={InsideLayout} using Root Navigator instead
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
              name="SignIn"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
