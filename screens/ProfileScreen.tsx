import { Link } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserProfileRecipeGrid from '../components/UserProfileRecipeGrid';
import BookmarkIcon from '../components/icons/BookmarkIcon';
import LikeIcon from '../components/icons/LikeIcon';
import SettingsIcon from '../components/icons/SettingsIcon';
import { useAppSelector } from '../hooks/reduxHooks';

function ProfileScreen({ navigation }: { navigation: any }) {
  const user = useAppSelector((state) => state.user.user);

  console.log(user);

  return (
    <SafeAreaView style={styles.container}>
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
          size={40}
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

      <View>
        {/* <ImageGrid /> */}
        <UserProfileRecipeGrid navigation={navigation} />
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
