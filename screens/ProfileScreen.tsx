import React from 'react';
import { View } from 'react-native';
import UserProfileRecipeGrid from '../components/UserProfileRecipeGrid';

function ProfileScreen({ navigation, route }: { navigation: any; route: any }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <UserProfileRecipeGrid route={route} navigation={navigation} />
    </View>
  );
}

export default ProfileScreen;
