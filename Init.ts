import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export const initializeApp = async () => {
  await SplashScreen.hideAsync();
  await Font.loadAsync({
    'Crake-Regular': require('./assets/fonts/craketest-regular.otf'),
    'Crake-Bold': require('./assets/fonts/craketest-bold.otf'),
    'Jost-Regular': require('./assets/fonts/Jost-VariableFont_wght.ttf'),
  });
};
