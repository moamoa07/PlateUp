import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { RecipeWithId } from '../api/model/recipeModel';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { addBookmark, removeBookmark } from '../redux/actions/bookmarkActions';
import { deleteRecipe } from '../redux/actions/recipeActions';
import { fetchUsers } from '../redux/actions/userActions';
import { selectBookmarks } from '../redux/reducers/bookmarks';
import { getUsers } from '../redux/reducers/users';
import BookmarkIcon from './icons/BookmarkIcon';
import ChevronDownIcon from './icons/ChevronIconDown';
import ChevronRightIcon from './icons/ChevronIconRight';
import DotsIcon from './icons/DotsIcon';
import EatIcon from './icons/EatIcon';
import FilledBookmarkIcon from './icons/FilledBookmarkIcon';
import LikeIcon from './icons/LikeIcon';
import TimerIcon from './icons/TimerIcon';

interface RecipeFeedProps {
  recipe: RecipeWithId;
}

function RecipeFeed({ recipe }: RecipeFeedProps) {
  const [showIngredients, setShowIngredients] = useState(true);
  const [showWholeRecipe, setShowWholeRecipe] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const auth = getAuth();
  const userId = auth.currentUser?.uid ?? '';
  const navigation = useNavigation();
  const users = useAppSelector(getUsers);
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector(selectBookmarks);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const user = users.find((user) => user.id === recipe.userId);

  useEffect(() => {
    // Fetch users when the component mounts
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setIsBookmarked(bookmarks.some((b) => b.id === recipe.id));
  }, [bookmarks, recipe.id]);

  const toggleWholeRecipe = () => {
    setShowWholeRecipe(!showWholeRecipe);
  };

  const toggleSection = (section: 'ingredients' | 'instructions') => {
    setShowIngredients(section === 'ingredients');
  };

  const handleBookmarkToggle = () => {
    const wasBookmarked = isBookmarked;
    // Optimistically update the UI
    setIsBookmarked(!isBookmarked);

    if (wasBookmarked) {
      dispatch(removeBookmark(userId, recipe.id));
    } else {
      dispatch(addBookmark(userId, recipe.id));
    }
  };

  const toggleDeleteModal = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
    setOverlayVisible(!isOverlayVisible);
  };

  const handleDeleteRecipe = () => {
    dispatch(deleteRecipe(recipe.id))
      .then(() => {
        // Close the delete modal and navigate back
        setDeleteModalVisible(false);
      })
      .catch((error) => {
        console.error('Error deleting recipe:', error);
        // Optionally handle the error, e.g., show a message
      });
  };

  if (!recipe) {
    return <Text style={styles.noRecipeFoundMessage}>No recipe found!</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.user}>
          <View style={styles.userInfo}>
            <Avatar.Image
              size={50}
              source={
                user?.photoURL
                  ? { uri: user.photoURL }
                  : require('../assets/cupcakeprofile.png')
              }
            />
            <Text style={styles.username}>{user?.displayName}</Text>
          </View>
          {user?.id === userId && (
            <TouchableOpacity onPress={toggleDeleteModal}>
              <DotsIcon size={32} fill={'#232323'} />
            </TouchableOpacity>
          )}
        </View>
        {recipe.imageUrl && (
          <Image
            source={{ uri: recipe.imageUrl }}
            style={{ width: 'auto', height: 500 }}
          />
        )}
        <View style={styles.textContainer}>
          <View style={styles.actions}>
            <LikeIcon size={32} fill={'#232323'} />
            <TouchableOpacity onPress={handleBookmarkToggle}>
              {isBookmarked ? (
                <FilledBookmarkIcon size={32} fill={'#232323'} />
              ) : (
                <BookmarkIcon size={32} fill={'#232323'} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.recipeInfo}>
            <Text style={styles.textMedium}>801 Likes</Text>
          </View>
          <View style={styles.nameTitleToggleBox}>
            <View style={styles.nameAndTitle}>
              <Text style={styles.usernameInRecipe}>
                {user?.displayName} {''}
                <Text style={styles.title}>{recipe.title}</Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={toggleWholeRecipe}
              style={styles.toggleBox}
            >
              {showWholeRecipe ? (
                <ChevronDownIcon size={32} fill={'#232323'} />
              ) : (
                <ChevronRightIcon size={32} fill={'#232323'} />
              )}
            </TouchableOpacity>
          </View>

          {showWholeRecipe && (
            <View style={styles.information}>
              <View style={styles.recipeNotes}>
                <View style={styles.servings}>
                  <EatIcon size={24} fill={'#232323'} />
                  <Text style={styles.text}>{recipe.servingDetails}</Text>
                </View>
                <View style={styles.time}>
                  <TimerIcon size={24} fill={'#232323'} />
                  <Text style={styles.text}>
                    <Text style={styles.textMedium}>Prep Time: </Text>
                    {recipe.prepTime}
                  </Text>
                  {recipe.cookTime && (
                    <View>
                      <Text style={styles.text}>
                        <Text style={styles.textMedium}>Cook Time: </Text>
                        {recipe.cookTime}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <Text style={styles.text}>{recipe.description}</Text>

              {/* Buttons to toggle between Ingredients and Instructions */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    showIngredients && styles.activeButton,
                  ]}
                  onPress={() => toggleSection('ingredients')}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      showIngredients && styles.activeButtonText,
                    ]}
                  >
                    Ingredients
                  </Text>
                </TouchableOpacity>
                <Text style={styles.divider}>|</Text>
                <TouchableOpacity
                  style={[
                    styles.button,
                    !showIngredients && styles.activeButton,
                  ]}
                  onPress={() => toggleSection('instructions')}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      !showIngredients && styles.activeButtonText,
                    ]}
                  >
                    Instructions
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Ingredients or Instructions */}
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
              )}

              {recipe.additionalNotes && (
                <View style={styles.additionalNotesContainer}>
                  <Text style={styles.additionalNotesTitle}>
                    Additional Notes
                  </Text>
                  <Text style={styles.additionalNotesText}>
                    {recipe.additionalNotes}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={toggleDeleteModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Are you sure you want to delete this recipe?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={handleDeleteRecipe}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleDeleteModal}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {isOverlayVisible && <View style={styles.overlay} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  noRecipeFoundMessage: {
    fontFamily: 'Crake-Regular',
    fontSize: 28,
    textAlign: 'center',
  },
  container: {
    paddingBottom: 16,
  },
  textContainer: {
    marginHorizontal: 8,
    paddingTop: 8,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4,
  },
  title: {
    fontFamily: 'Jost-Regular',
    fontSize: 20,
    paddingLeft: 10,
  },
  information: {
    marginHorizontal: 10,
    gap: 6,
  },
  subtitle: {
    fontFamily: 'Jost-Medium',
    fontSize: 16,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    // paddingHorizontal: 10,
    paddingVertical: 5,
    // marginHorizontal: 5,
    borderRadius: 5,
  },
  activeButton: {
    // backgroundColor: '#ccc',
  },
  buttonText: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  activeButtonText: {
    fontWeight: 'bold',
    fontFamily: 'Jost-Medium',
  },
  recipeNotes: {
    paddingTop: 8,
    paddingBottom: 8,
    gap: 8,
  },
  servings: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  time: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  divider: {
    marginHorizontal: 10,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 4,
  },
  ingredientQuantity: {
    width: 64,
    marginRight: 8,
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  ingredientName: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  ingredientsList: {
    // fontFamily: 'Jost-Regular',
    // fontSize: 16,
  },
  instructionsList: {
    // fontFamily: 'Jost-Regular',
    // fontSize: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10, // Space between instructions
  },
  stepNumber: {
    width: 22, // Fixed width for the step numbers
    marginRight: 6, // Space between number and instruction
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  instructionText: {
    flex: 1, // Take up the rest of the space in the row
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  additionalNotesContainer: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  additionalNotesTitle: {
    fontFamily: 'Jost-Medium',
    fontSize: 16,
    marginBottom: 5,
  },
  additionalNotesText: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  text: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  textMedium: {
    fontFamily: 'Jost-Medium',
    fontSize: 16,
  },
  recipeInfo: {
    marginHorizontal: 10,
  },
  nameTitleToggleBox: {
    paddingLeft: 10,
    paddingRight: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameAndTitle: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  usernameInRecipe: {
    fontFamily: 'Jost-Medium',
    fontSize: 20,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 9,
  },
  toggleBox: {
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
  group: { marginVertical: 5 },
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
  },
  username: {
    fontFamily: 'Jost-Medium',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: 'Jost-Medium',
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  deleteButton: {
    backgroundColor: '#232323',
    padding: 10,
    width: 100,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontFamily: 'Jost-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    width: 100,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#000',
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.342)', // Adjust the opacity as needed
    zIndex: 1,
  },
});

export default RecipeFeed;
