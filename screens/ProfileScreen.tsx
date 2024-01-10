import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageGrid from '../components/ImageGrid';
import BookmarkIcon from '../components/icons/BookmarkIcon';
import LikeIcon from '../components/icons/LikeIcon';
import SettingsIcon from '../components/icons/SettingsIcon';

function ProfileScreen() {
  const theme = useTheme();

  const navigation = useNavigation<any>();

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigateToScreen('Like')}>
            <LikeIcon size={32} fill={'#232323'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen('Bookmark')}>
            <BookmarkIcon size={32} fill={'#232323'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen('Setting')}>
            <SettingsIcon size={32} fill={'#232323'} />
          </TouchableOpacity>
        </View>
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
    fontFamily: 'Jost-Regular',
    fontWeight: '900',
    marginTop: 10,
    fontSize: 24,
  },
  text: {
    fontFamily: 'Jost-Regular',
  },
  textBold: {
    fontFamily: 'Jost-Regular',
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
