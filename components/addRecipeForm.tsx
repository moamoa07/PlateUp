import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../Theme';
import { addRecipe } from '../api/service/recipeService';
import PickImage from './PickImage';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(''); // Change the initial state type

  const handleSubmit = async () => {
    if (title && description) {
      try {
        const newRecipe = { title, description, imageUrl };
        await addRecipe(newRecipe);
        console.log('Recipe added successfully');
        // Optionally reset form here
        setTitle('');
        setDescription('');
        setImageUrl('');

        Keyboard.dismiss();
      } catch (error) {
        console.error('Failed to add recipe:', error);
      }
    } else {
      console.log('Please fill in all fields');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the title of the recipe"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Describe your recipe"
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        <PickImage onChange={setImageUrl} />

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Add Recipe
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 16,
    marginTop: 48,
    gap: 24,
  },
  inputGroup: {
    display: 'flex',
    gap: 5,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  titleInput: {
    height: 40, // Fixed height for single-line input
  },
  descriptionInput: {
    height: 100, // Larger height for multi-line input
    textAlignVertical: 'top', // Aligns text to the top for multiline
    paddingTop: 8,
  },
  button: {
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    marginTop: 10,
  },
});

export default AddRecipeForm;
