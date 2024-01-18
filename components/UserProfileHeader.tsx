import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { useAppSelector } from '../hooks/reduxHooks';
import BookmarkIcon from './icons/BookmarkIcon';
import LikeIcon from './icons/LikeIcon';
import SettingsIcon from './icons/SettingsIcon';

function UserProfileHeader() {
  const user = useAppSelector((state) => state.user.user);

  console.log(user);

  const navigation = useNavigation<any>();

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <LikeIcon size={32} fill={'#232323'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen('Bookmark')}>
            <BookmarkIcon size={32} fill={'#232323'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen('Setting')}>
            <SettingsIcon size={32} fill={'#232323'} />
          </TouchableOpacity>
        </View>
        <View style={styles.avatar}>
          <Avatar.Image
            size={120}
            source={
              user?.photoURL
                ? { uri: user.photoURL }
                : require('../assets/img/chokladkaka.jpeg')
            }
          />
          <Text style={styles.textUsername}>{user?.displayName}</Text>
        </View>
        <View style={styles.profileInfo}>
          <View style={styles.profileInfoGroup}>
            <Text style={styles.textBold}>10</Text>
            <Text style={styles.text}>Recipes</Text>
          </View>
          <View style={styles.profileInfoGroup}>
            <Text style={styles.textBold}>38K</Text>
            <Text style={styles.text}>Likes</Text>
          </View>
          <View style={styles.profileInfoGroup}>
            <Text style={styles.textBold}>500K</Text>
            <Text style={styles.text}>Followers</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
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
    backgroundColor: 'lightblue',
  },
});

export default UserProfileHeader;
