import React from 'react';
import { SafeAreaView, View } from 'react-native';
import BookmarkGrid from '../components/BookmarkGrid';

function BookmarkScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView>
      <View>
        <BookmarkGrid navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

export default BookmarkScreen;
