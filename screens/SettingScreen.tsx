import { Link } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import ExploreIcon from '../components/icons/ExploreIcon';

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
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <Link to={{ screen: 'Home' }} style={styles.link}>
          <View style={styles.linkContent}>
            <ExploreIcon size={32} fill={'#232323'} />
            <Text style={styles.text}>Edit Profile</Text>
          </View>
        </Link>
        <Link to={{ screen: 'Home' }} style={styles.link}>
          <View style={styles.linkContent}>
            <ExploreIcon size={32} fill={'#232323'} />
            <Text style={styles.text}>Help</Text>
          </View>
        </Link>

        <Button
          mode="outlined"
          onPress={() => FIREBASE_AUTH.signOut()}
          style={styles.button}
        >
          <View style={styles.linkContent}>
            <ExploreIcon size={32} fill={'#232323'} />
            <Text style={styles.text}>Sign Out</Text>
          </View>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    fontFamily: 'CrakeBold',
    fontSize: 24,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Jost',
    marginLeft: 10,
  },
  link: {
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },

  linkContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    marginTop: 40,
    borderRadius: 10,
  },
});

export default SettingScreen;
