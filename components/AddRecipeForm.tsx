import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../Theme';
import { addRecipe } from '../api/service/recipeService';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [servingDetails, setServingDetails] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');

  const handleSubmit = async () => {
    if (title && description && servingDetails && prepTime) {
      try {
        const newRecipe = {
          title,
          description,
          servingDetails,
          prepTime,
          cookTime,
        };
        await addRecipe(newRecipe);
        console.log('Recipe added successfully');
        // Reset form here
        setTitle('');
        setDescription('');
        setServingDetails('');
        setPrepTime('');
        setCookTime('');
      } catch (error) {
        console.error('Failed to add recipe:', error);
      }
    } else {
      console.log('Please fill in all fields');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
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
          <Text style={styles.label}>How much will the recipe make?</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 4 servings, 12 cookies"
            placeholderTextColor="#888"
            value={servingDetails}
            onChangeText={setServingDetails}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Time</Text>
          <View style={styles.timeInputGroup}>
            <View style={styles.timeInputContainer}>
              <Text style={styles.label}>Prep Time</Text>
              <TextInput
                style={[styles.input, styles.timeInput]}
                placeholder="e.g., 20 min"
                placeholderTextColor="#888"
                value={prepTime}
                onChangeText={setPrepTime}
              />
            </View>
            <View style={styles.timeInputContainer}>
              <Text style={styles.label}>Cook Time</Text>
              <TextInput
                style={[styles.input, styles.timeInput]}
                placeholder="e.g., 20 min"
                placeholderTextColor="#888"
                value={cookTime}
                onChangeText={setCookTime}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonTouchable}>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Add Recipe
          </Button>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  description: {
    fontFamily: 'Jost-Regular',
    fontSize: 14,
    color: '#666', // Optional: Set the color to differentiate from other text
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
  descriptionInput: {
    height: 100, // Larger height for multi-line input
    textAlignVertical: 'top', // Aligns text to the top for multiline
    paddingTop: 8,
  },
  timeInputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  timeInputContainer: {
    flex: 1,
  },
  timeInput: {
    // You may adjust styles for time-specific inputs here
  },
  buttonTouchable: {
    borderRadius: 10, // Match the border radius of the button if any
    // Add any other styling as needed to match the button's appearance
  },
  button: {
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  buttonLabel: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
});

export default AddRecipeForm;
