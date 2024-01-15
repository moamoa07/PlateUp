import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
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
        {/* Buttons to toggle between Ingredients and Instructions */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
          // style={[styles.button, showIngredients && styles.activeButton]}
          // onPress={() => toggleSection('ingredients')}
          >
            <Text
            // style={[
            //   styles.buttonText,
            //   showIngredients && styles.activeButtonText,
            // ]}
            >
              Ingredients
            </Text>
          </TouchableOpacity>
          <Text>|</Text>
          <TouchableOpacity
          // style={[styles.button, !showIngredients && styles.activeButton]}
          // onPress={() => toggleSection('instructions')}
          >
            <Text
            // style={[
            //   styles.buttonText,
            //   !showIngredients && styles.activeButtonText,
            // ]}
            >
              Instructions
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.emptySearchTextContainer]}>
          <Text style={[styles.emptySearchText]}>
            Discover recipes and connect with others!
          </Text>
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
  searchbar: {
    borderRadius: 10,
    width: '90%',
  },
  emptySearchTextContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    paddingHorizontal: 10,
  },
  emptySearchText: {
    fontFamily: 'Crake-Regular',
    fontSize: 40,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default SearchScreen;
