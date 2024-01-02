import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

function SettingScreen() {
  const theme = useTheme();
  const [isLoaded] = useFonts({
    CrakeRegular: require('../assets/fonts/craketest-regular.otf'),
    CrakeBold: require('../assets/fonts/craketest-bold.otf'),
    Jost: require('../assets/fonts/Jost-VariableFont_wght.ttf'),
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <SafeAreaView onLayout={handleOnLayout}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <Button icon="account-edit-outline" mode="outlined">
          Edit profile
        </Button>
        <Button icon="help-circle-outline" mode="outlined">
          Help
        </Button>
        <Button icon="logout" mode="outlined">
          Sign out
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'CrakeBold',
    fontSize: 24,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Jost',
  },
});

export default SettingScreen;
