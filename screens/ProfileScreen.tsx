import { Link } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageGrid from '../components/ImageGrid';
import BookmarkIcon from '../components/icons/BookmarkIcon';
import LikeIcon from '../components/icons/LikeIcon';
import SettingsIcon from '../components/icons/SettingsIcon';

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
      <View style={styles.iconContainer}>
        <Link to={{ screen: 'Like' }}>
          <LikeIcon size={32} fill={'#232323'} />
        </Link>
        <Link to={{ screen: 'Bookmark' }}>
          <BookmarkIcon size={32} fill={'#232323'} />
        </Link>
        <Link to={{ screen: 'Setting' }}>
          <SettingsIcon size={32} fill={'#232323'} />
        </Link>
      </View>
      <View style={styles.avatar}>
        <Avatar.Image
          size={140}
          source={require('../assets/cupcakeprofile.png')}
        />
        <Text style={styles.textUsername}>MoaHedendahl</Text>
      </View>
      <View style={styles.profileInfo}>
        <View style={styles.profileInfoGroup}>
          <Text style={styles.textBold}>28</Text>
          <Text style={styles.text}>Recipes</Text>
        </View>
        <View style={styles.profileInfoGroup}>
          <Text style={styles.textBold}>38K</Text>
          <Text style={styles.text}>Likes</Text>
        </View>
        <View style={styles.profileInfoGroup}>
          <Text style={styles.textBold}>12K</Text>
          <Text style={styles.text}>Followers</Text>
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
    marginHorizontal: 10,
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
  },
  textUsername: {
    fontFamily: 'Jost',
    fontWeight: '900',
    marginTop: 10,
    fontSize: 24,
  },
  text: {
    fontFamily: 'Jost',
  },
  textBold: {
    fontFamily: 'Jost',
    fontWeight: 'bold',
    fontSize: 18,
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 10,
    gap: 4,
  },
});

export default ProfileScreen;
