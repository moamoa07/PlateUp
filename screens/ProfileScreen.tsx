import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserProfileRecipeGrid from '../components/UserProfileRecipeGrid';

function ProfileScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <UserProfileRecipeGrid navigation={navigation} />
    </SafeAreaView>
  );
}

export default ProfileScreen;
