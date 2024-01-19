import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator, Avatar, Searchbar, Text } from 'react-native-paper';
import { CustomUser } from '../api/model/userModel';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchUsers } from '../redux/actions/userActions';
import { getUsers, isLoading } from '../redux/reducers/users';

type Recipe = {
  id: string;
  title: string;
  image: string;
};

function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<
    (CustomUser | Recipe)[]
  >([]);
  const [searchType, setSearchType] = useState<'users' | 'recipes'>('recipes');
  const dispatch = useAppDispatch();
  const usersFromRedux = useAppSelector(getUsers);
  const isSearchLoading = useAppSelector(isLoading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSearch = async (query: string) => {
    try {
      // Check if the current search type is 'users
      if (searchType === 'users') {
        const updateUsers = usersFromRedux;

        // Now users are available in the Redux store
        const filteredUsers = updateUsers.filter((user) =>
          user.displayName.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredResults(filteredUsers);
        console.log(filteredUsers);
      } else {
        // Fetch recipes from your mocked data or wherever you have it
        const filteredRecipes = allRecipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredResults(filteredRecipes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = filteredResults.filter(
    (result) => searchType === 'users'
  );
  const filteredRecipes = filteredResults.filter(
    (result) => searchType === 'recipes'
  );

  return (
    <SafeAreaView>
      <View
        style={[
          styles.container,
          Platform.OS === 'android' && { marginTop: 50 },
          Platform.OS === 'ios' && { marginTop: 20 },
        ]}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => {
            setSearchQuery(query);
            handleSearch(query);
          }}
          value={searchQuery}
          style={[styles.searchbar]}
          inputStyle={{
            fontFamily: 'Jost-Regular',
            color: 'black',
          }}
        />

        {/* Buttons to toggle between Users and Recipes */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              searchType === 'recipes' && styles.activeButton,
            ]}
            onPress={() => {
              setSearchType('recipes');
              setSearchQuery(''); // Clear the search query
            }}
          >
            <Text
              style={[
                styles.buttonText,
                searchType === 'recipes' && styles.activeButtonText,
              ]}
            >
              Recipes
            </Text>
          </TouchableOpacity>
          <Text style={[styles.divider]}>|</Text>
          <TouchableOpacity
            style={[
              styles.button,
              searchType === 'users' && styles.activeButton,
            ]}
            onPress={() => {
              setSearchType('users');
              setSearchQuery(''); // Clear the search query
            }}
          >
            <Text
              style={[
                styles.buttonText,
                searchType === 'users' && styles.activeButtonText,
              ]}
            >
              Users
            </Text>
          </TouchableOpacity>
        </View>

        {/* Display Users or Recipes based on the active section */}
        {isSearchLoading ? (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '70%',
            }}
          >
            <ActivityIndicator size="large" color="#D6DED1" />
          </View>
        ) : (
          <>
            {searchQuery.length > 0 && filteredResults.length > 0 ? (
              <ScrollView style={{ width: '100%', paddingHorizontal: 10 }}>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    paddingBottom: 300,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      gap: 10,
                      paddingHorizontal: 10,
                    }}
                  >
                    {filteredUsers.map((result) => (
                      <View key={result.id}>
                        <View style={[styles.userLayout]}>
                          <View style={[styles.userBox]}>
                            <Avatar.Image
                              size={50}
                              source={{
                                uri:
                                  (result as CustomUser).photoURL ||
                                  'https://github.com/moamoa07/PlateUp/assets/113519935/a3aa104c-d5ff-4d1b-bcd5-54a10fd00fd7',
                              }}
                            />
                            <Text style={[styles.userName]}>
                              {(result as CustomUser).displayName}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                  {/* // Render filtered results for recipes */}
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}
                  >
                    {filteredRecipes.map((result) => (
                      <View
                        key={result.id}
                        style={{ width: '48%', marginBottom: 10 }}
                      >
                        <View style={[styles.recipeBox]}>
                          <Image
                            style={[styles.recipeImage]}
                            source={{ uri: (result as Recipe).image }}
                          />
                          <Text style={[styles.recipeText]}>
                            {(result as Recipe).title}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </ScrollView>
            ) : (
              <View style={[styles.emptySearchTextContainer]}>
                <Text style={[styles.emptySearchText]}>
                  {searchQuery.length > 0
                    ? searchType === 'users'
                      ? 'No matching users found'
                      : 'No matching recipes found'
                    : searchType === 'users'
                    ? 'Discover amazing users and connect with them!'
                    : 'Explore delicious recipes and get inspired!'}
                </Text>
              </View>
            )}
          </>
        )}
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
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: '#fff',
  },
  emptySearchTextContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
    paddingHorizontal: 20,
  },
  emptySearchText: {
    fontFamily: 'Crake-Regular',
    fontSize: 35,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  button: {
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'Jost-Regular',
    fontSize: 17,
  },
  divider: {
    marginHorizontal: 10,
    fontSize: 19,
  },
  activeButtonText: {
    fontWeight: 'bold',
    fontFamily: 'Jost-Medium',
    fontSize: 17,
  },
  activeButton: {
    // backgroundColor: '#ccc',
  },
  searchResultLayout: {
    width: '100%',
  },
  userLayout: {
    marginBottom: 20,
  },
  userBox: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  userName: {
    fontFamily: 'Jost-Regular',
    fontSize: 20,
  },
  recipeBox: {
    gap: 5,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  recipeText: {
    fontFamily: 'Jost-Medium',
    fontSize: 18,
  },
});

export default SearchScreen;
