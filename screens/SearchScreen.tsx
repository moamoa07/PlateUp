import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

function SearchScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  return (
    <SafeAreaView>
      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
    </SafeAreaView>
  );
}

export default SearchScreen;
