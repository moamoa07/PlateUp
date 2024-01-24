import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import theme from '../Theme';
import { RecipeWithId } from '../api/model/recipeModel';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchBookmarks } from '../redux/actions/bookmarkActions';
import { selectBookmarks } from '../redux/reducers/bookmarks';

// Get the screen width
// Calculation for styling of grid container
const { width } = Dimensions.get('window');
const containerPadding = 10; // This is the padding you want for the grid container
const numColumns = 3;
const marginSize = 8;

const totalMarginSpace = (numColumns - 1) * marginSize;
const imageSize =
  (width - totalMarginSpace - containerPadding * 2) / numColumns;

const BookmarkGrid = ({ navigation }: { navigation: any }) => {
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector(selectBookmarks);
  const auth = getAuth();
  const userId = auth.currentUser?.uid ?? '';

  useEffect(() => {
    dispatch(fetchBookmarks(userId));
  }, [dispatch, userId]);

  const renderBookmarkItem = ({ item }: { item: RecipeWithId }) => (
    <TouchableOpacity
      onPressIn={() =>
        navigation.navigate('RecipeDetail', { recipeId: item.id })
      }
    >
      <Image
        source={{
          uri:
            item.imageUrl ??
            require('../assets/img/add-new-recipe-placeholder.png'),
        }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      {/* <Text style={styles.titleText}>{item.title}</Text> */}
    </TouchableOpacity>
  );

  const renderNoBookmarksMessage = () => {
    if (bookmarks.length === 0) {
      return (
        <View style={styles.noRecipeMessageContainer}>
          <Text style={styles.noRecipeMessage}>
            You haven't bookmarked any recipes yet.
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <FlatList
      data={bookmarks}
      renderItem={renderBookmarkItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      contentContainerStyle={styles.gridContainer}
      ListEmptyComponent={renderNoBookmarksMessage}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: containerPadding,
    width: '100%',
    // backgroundColor: 'mistyrose',
  },
  titleText: {
    maxWidth: 100,
  },
  endOfListMessage: {
    fontFamily: 'Jost-Regular',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
    color: '#888',
  },
  thumbnail: {
    backgroundColor: theme.colors.secondary,
    width: imageSize,
    height: imageSize,
    margin: marginSize / 2, // Apply half margin size to each side
  },
  noRecipeMessage: {
    fontFamily: 'Crake-Regular',
    fontSize: 35,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  noRecipeMessageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    marginTop: 240,
  },
});

export default BookmarkGrid;
