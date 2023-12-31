import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export const initApp = async () => {
  await Font.loadAsync({
    'Crake-Regular': require('./assets/fonts/craketest-regular.otf'),
    'Crake-Bold': require('./assets/fonts/craketest-bold.otf'),
    'Jost-Regular': require('./assets/fonts/Jost-VariableFont_wght.ttf'),
    'Jost-Medium': require('./assets/fonts/Jost-Medium.ttf'),
  });
  await SplashScreen.hideAsync();
};
