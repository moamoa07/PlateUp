import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export const initializeApp = async () => {
  await SplashScreen.hideAsync();
  await Font.loadAsync({
    CrakeRegular: require('./assets/fonts/craketest-regular.otf'),
    CrakeBold: require('./assets/fonts/craketest-bold.otf'),
    Jost: require('./assets/fonts/Jost-VariableFont_wght.ttf'),
  });
};
