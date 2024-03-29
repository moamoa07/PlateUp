import React from 'react';
import { View } from 'react-native';
import UserProfileRecipeGrid from '../components/UserProfileRecipeGrid';

function ProfileScreen({ navigation }: { navigation: any }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <UserProfileRecipeGrid navigation={navigation} />
    </View>
  );
}

export default ProfileScreen;
