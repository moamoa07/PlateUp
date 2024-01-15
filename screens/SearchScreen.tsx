import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';

function SearchScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={[styles.searchbar]}
        />
        <View>
          <Text>Discover recipes and connect with others!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  searchbar: { borderRadius: 10, width: '90%' },
});

export default SearchScreen;
