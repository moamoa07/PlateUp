import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';

type User = {
  id: string;
  name: string;
  // ... other properties
};

function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // Mocked list of users (replace with your actual list of users)
  const allUsers: User[] = [
    { id: '1', name: 'Nathalie' },
    { id: '2', name: 'Moa' },
    { id: '3', name: 'Lisa-Marie' },
    // ... other users
  ];

  const handleSearch = (query: string) => {
    const filtered = allUsers.filter((user) =>
      user.name.toLocaleLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => {
            setSearchQuery(query);
            handleSearch(query);
          }}
          value={searchQuery}
          style={[styles.searchbar]}
        />

        {searchQuery.length > 0 && filteredUsers.length > 0 ? (
          <View>
            {filteredUsers.map((user) => (
              <View key={user.id}>
                <Text>{user.name}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={[styles.emptySearchTextContainer]}>
            <Text style={[styles.emptySearchText]}>
              {searchQuery.length > 0
                ? 'No matching users found'
                : 'Discover recipes and connect with others!'}
            </Text>
          </View>
        )}

        {/* Buttons to toggle between Ingredients and Instructions
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button]}
            // style={[styles.button, showIngredients && styles.activeButton]}
            // onPress={() => toggleSection('ingredients')}
          >
            <Text
              style={[styles.buttonText]}
              // style={[
              //   styles.buttonText,
              //   showIngredients && styles.activeButtonText,
              // ]}
            >
              Ingredients
            </Text>
          </TouchableOpacity>
          <Text style={[styles.divider]}>|</Text>
          <TouchableOpacity
            style={[styles.button]}
            // style={[styles.button, !showIngredients && styles.activeButton]}
            // onPress={() => toggleSection('instructions')}
          >
            <Text
              style={[styles.buttonText]}
              // style={[
              //   styles.buttonText,
              //   !showIngredients && styles.activeButtonText,
              // ]}
            >
              Instructions
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* Users or Recipes /*}
        {showIngredients ? (
              // Ingredients list
              <View style={styles.ingredientsList}>
                {recipe.ingredients?.map((group, index) => (
                  <View key={index} style={styles.group}>
                    {group.ingredientSubtitle && (
                      <Text style={styles.subtitle}>
                        {group.ingredientSubtitle}
                      </Text>
                    )}
                    {group.items?.map((ingredient, i) => (
                      <View key={i} style={styles.ingredientItem}>
                        <Text
                          style={styles.ingredientQuantity}
                        >{`${ingredient.quantity}`}</Text>
                        <Text style={styles.ingredientName}>
                          {ingredient.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            ) : (
              // Instructions list
              <View style={styles.instructionsList}>
                {recipe.instructions?.map((group, index) => (
                  <View key={index} style={styles.group}>
                    {group.instructionSubtitle && (
                      <Text style={styles.subtitle}>
                        {group.instructionSubtitle}
                      </Text>
                    )}
                    {group.steps?.map((step, i) => (
                      <View key={i} style={styles.instructionItem}>
                        <Text style={styles.stepNumber}>{`${i + 1}.`}</Text>
                        <Text style={styles.instructionText}>
                          {step.instruction}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )} */}
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
    marginTop: 25,
  },
  button: {
    // paddingHorizontal: 10,
    paddingVertical: 5,
    // marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  divider: {
    marginHorizontal: 10,
  },
});

export default SearchScreen;
