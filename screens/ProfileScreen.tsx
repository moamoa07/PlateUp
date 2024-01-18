import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserProfileHeader from '../components/UserProfileHeader';
import UserProfileRecipeGrid from '../components/UserProfileRecipeGrid';

function ProfileScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView>
      <View>
        <UserProfileHeader />
        <UserProfileRecipeGrid navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;
