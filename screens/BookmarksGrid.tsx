import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { RecipeWithId } from '../api/model/recipeModel';

const { width } = Dimensions.get('window');
const numColumns = 3;
const marginSize = 4;
const imageSize = (width - (numColumns + 1) * marginSize) / numColumns;

interface BookmarksGridProps {
  updatedBookmarks: RecipeWithId[];
  onRecipePress: (item: RecipeWithId) => void;
}

const BookmarksGrid: React.FC<BookmarksGridProps> = ({
  updatedBookmarks,
  onRecipePress,
}) => {
  const renderBookmarkThumbnail = ({ item }: { item: RecipeWithId }) => (
    <TouchableOpacity onPress={() => onRecipePress(item)}>
      <Image
        source={{
          uri: item.imageUrl ?? 'https://via.placeholder.com/150',
        }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={updatedBookmarks}
      renderItem={renderBookmarkThumbnail}
      contentContainerStyle={styles.gridContainer}
      numColumns={numColumns}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: marginSize,
  },
  thumbnail: {
    width: imageSize,
    height: imageSize,
    margin: marginSize,
  },
});

export default BookmarksGrid;
