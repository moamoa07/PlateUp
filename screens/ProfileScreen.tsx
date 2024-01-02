import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageGrid from '../components/ImageGrid';

function ProfileScreen() {
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
    <SafeAreaView style={styles.container} onLayout={handleOnLayout}>
      <View style={styles.avatar}>
        <Avatar.Image size={140} source={require('../assets/cupcake.png')} />
        <Text style={styles.textBold}>MoaHedendahl</Text>
      </View>
      <View style={styles.profileInfo}>
        <View style={styles.profileInfoGroup}>
          <Text>28</Text>
          <Text>Recipes</Text>
        </View>
        <View style={styles.profileInfoGroup}>
          <Text>38K</Text>
          <Text>Likes</Text>
        </View>
        <View style={styles.profileInfoGroup}>
          <Text>12K</Text>
          <Text>Followers</Text>
        </View>
      </View>

      <View>
        <ImageGrid />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
  },
  textBold: {
    fontFamily: 'Jost',
    fontWeight: '900',
    marginTop: 10,
    fontSize: 24,
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  profileInfoGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
  imageFlex: {
    flex: 1,
  },
});

export default ProfileScreen;
