import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../Theme';
import { addRecipe } from '../api/service/recipeService';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (title && description) {
      try {
        const newRecipe = { title, description };
        await addRecipe(newRecipe);
        console.log('Recipe added successfully');
        // Optionally reset form here
        setTitle('');
        setDescription('');
      } catch (error) {
        console.error('Failed to add recipe:', error);
      }
    } else {
      console.log('Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h3}>Add new recipe</Text>
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
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Serving Details</Text>
        <TextInput
          style={styles.input}
          placeholder="eg. 4 people, 2 portions, 12 cookies"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Add Recipe
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 16,
    marginTop: 16,
    gap: 24,
  },
  h3: {
    fontSize: 28,
    fontFamily: 'Crake-Regular',
    textAlign: 'center',
  },
  inputGroup: {
    display: 'flex',
    gap: 5,
  },
  label: {
    fontFamily: 'Jost-Medium',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    fontFamily: 'Jost-Regular',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
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
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    marginTop: 10,
  },
  buttonLabel: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
});

export default AddRecipeForm;
