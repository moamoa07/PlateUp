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
import { deleteRecipe } from '../api/service/recipeService';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchUsers } from '../redux/actions/userActions';
import { getUsers } from '../redux/reducers/users';
import BookmarkIcon from './icons/BookmarkIcon';
import DotsIcon from './icons/DotsIcon';
import EatIcon from './icons/EatIcon';
import LikeIcon from './icons/LikeIcon';
import TimerIcon from './icons/TimerIcon';

interface RecipeComponentProps {
  recipe: RecipeWithId;
}

function RecipeDetail({ recipe }: RecipeComponentProps) {
  const [showIngredients, setShowIngredients] = useState(true);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const auth = getAuth();
  const userId = auth.currentUser?.uid ?? '';
  const navigation = useNavigation();

  const users = useAppSelector(getUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch users when the component mounts
    dispatch(fetchUsers());
  }, [dispatch]);

  const toggleSection = (section: 'ingredients' | 'instructions') => {
    setShowIngredients(section === 'ingredients');
  };

  const toggleDeleteModal = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
    setOverlayVisible(!isOverlayVisible);
  };

  async function handleDeleteRecipe() {
    try {
      // Call the deleteRecipe function with the recipeId and userId
      await deleteRecipe(recipe.id, user?.id);
      // Close the delete modal after successful deletion
      setDeleteModalVisible(false);
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting recipe:', error);
      // Handle error (e.g., show an error message)
    }
  }

  if (!recipe) {
    return <Text style={styles.noRecipeFoundMessage}>No recipe found!</Text>;
  }

  const user = users.find((user) => user.id === recipe.userId);

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
            style={{ width: '100%', height: 500 }}
          />
        )}
        <View style={styles.textContainer}>
          <View style={styles.actions}>
            <LikeIcon size={32} fill={'#232323'} />
            <BookmarkIcon size={32} fill={'#232323'} />
          </View>
          <View style={styles.recipeInfo}>
            <Text style={styles.textMedium}>801 Likes</Text>
          </View>
          <View style={styles.information}>
            <Text style={styles.title}>{recipe.title}</Text>
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
                style={[styles.button, showIngredients && styles.activeButton]}
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
                style={[styles.button, !showIngredients && styles.activeButton]}
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
    fontFamily: 'Jost-Medium',
    fontSize: 20,
    marginTop: 10,
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
    width: 60,
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
  group: { marginVertical: 5 },
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
    zIndex: 1,
  },
});

export default RecipeDetail;
