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
import { Recipe } from '../api/model/recipeModel';
import { addRecipe } from '../api/service/recipeService';
import TimerIcon from './icons/TimerIcon';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [servingDetails, setServingDetails] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [ingredientGroups, setIngredientGroups] = useState([
    { subtitle: '', items: [{ quantity: '', name: '' }] },
  ]);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const isFirstGroup = (groupIndex: number) => groupIndex === 0;

  const addIngredientGroup = () => {
    setIngredientGroups([
      ...ingredientGroups,
      { subtitle: '', items: [{ quantity: '', name: '' }] },
    ]);
  };

  const addIngredientItem = (groupIndex: number) => {
    const newGroups = [...ingredientGroups];
    newGroups[groupIndex].items.push({ quantity: '', name: '' });
    setIngredientGroups(newGroups);
  };

  const handleIngredientChange = (
    groupIndex: number,
    itemIndex: number,
    field: 'quantity' | 'name',
    value: string
  ) => {
    const newGroups = [...ingredientGroups];
    newGroups[groupIndex].items[itemIndex][field] = value;
    setIngredientGroups(newGroups);
  };

  const handleSubtitleChange = (groupIndex: number, value: string) => {
    const newGroups = [...ingredientGroups];
    newGroups[groupIndex].subtitle = value;
    setIngredientGroups(newGroups);
  };

  const handleSubmit = async () => {
    const isIngredientGroupsValid = ingredientGroups.every((group) =>
      group.items.some((item) => item.quantity || item.name)
    );
    if (
      title &&
      description &&
      servingDetails &&
      prepTime &&
      isIngredientGroupsValid
    ) {
      try {
        const newRecipe: Recipe = {
          title,
          description,
          servingDetails,
          prepTime,
          cookTime,
          ingredients: ingredientGroups,
          additionalNotes,
        };
        await addRecipe(newRecipe);
        console.log('Recipe added successfully');
        // Reset form here
        setTitle('');
        setDescription('');
        setServingDetails('');
        setPrepTime('');
        setCookTime('');
        setIngredientGroups([
          { subtitle: '', items: [{ quantity: '', name: '' }] },
        ]);
        setAdditionalNotes('');
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
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the title of the recipe"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description *</Text>
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
          <Text style={styles.label}>How much will the recipe make? *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 4 servings, 12 cookies"
            placeholderTextColor="#888"
            value={servingDetails}
            onChangeText={setServingDetails}
          />
        </View>
        <View style={styles.inputGroup}>
          <View style={styles.timeLabelContainer}>
            <Text style={styles.label}>Time</Text>
            <View style={styles.iconWrapper}>
              <TimerIcon size={28} fill={'#232323'} />
            </View>
          </View>

          <View style={styles.timeInputGroup}>
            <View style={styles.timeInputContainer}>
              <Text style={styles.subLabel}>Prep Time *</Text>
              <TextInput
                style={[styles.input, styles.timeInput]}
                placeholder="e.g., 20 min"
                placeholderTextColor="#888"
                value={prepTime}
                onChangeText={setPrepTime}
              />
            </View>
            <View style={styles.timeInputContainer}>
              <Text style={styles.subLabel}>Cook Time</Text>
              <TextInput
                style={[styles.input, styles.timeInput]}
                placeholder="e.g., 1 h"
                placeholderTextColor="#888"
                value={cookTime}
                onChangeText={setCookTime}
              />
            </View>
          </View>
        </View>
        <View style={styles.ingredientsContainer}>
          <Text style={styles.label}>Ingredients</Text>
          {ingredientGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.ingredientsGroup}>
              <Text style={styles.subLabel}>Subtitle</Text>
              <TextInput
                style={styles.input}
                placeholder="Add a subtitle"
                value={group.subtitle}
                onChangeText={(text) => handleSubtitleChange(groupIndex, text)}
              />
              <View style={styles.subLabelRow}>
                <Text style={[styles.subLabel, styles.quantityLabel]}>
                  Quantity *
                </Text>
                <Text style={[styles.subLabel, styles.ingredientLabel]}>
                  Ingredient *
                </Text>
              </View>
              {group.items.map((item, itemIndex) => (
                <View
                  key={itemIndex}
                  style={styles.quantityAndIngredientsInputGroup}
                >
                  <TextInput
                    style={[styles.input, styles.quantityInput]}
                    placeholder="Quantity"
                    value={item.quantity}
                    onChangeText={(text) =>
                      handleIngredientChange(
                        groupIndex,
                        itemIndex,
                        'quantity',
                        text
                      )
                    }
                  />
                  <TextInput
                    style={[styles.input, styles.ingredientsInput]}
                    placeholder="Ingredient"
                    value={item.name}
                    onChangeText={(text) =>
                      handleIngredientChange(
                        groupIndex,
                        itemIndex,
                        'name',
                        text
                      )
                    }
                  />
                </View>
              ))}
              <TouchableOpacity
                onPress={() => addIngredientItem(groupIndex)}
                style={styles.buttonTouchable}
              >
                <Button
                  mode="outlined"
                  style={styles.ingredientButton}
                  labelStyle={styles.buttonLabel}
                >
                  Add Ingredient
                </Button>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            onPress={addIngredientGroup}
            style={styles.buttonTouchable}
          >
            <Button
              mode="outlined"
              style={styles.ingredientGroupButton}
              labelStyle={styles.buttonLabel}
              onPress={addIngredientGroup}
            >
              Add Ingredient Group
            </Button>
          </TouchableOpacity>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Additional notes</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Add extra details to your recipe"
            placeholderTextColor="#888"
            value={additionalNotes}
            onChangeText={setAdditionalNotes}
            multiline
          />
        </View>
        <Text style={styles.message}>
          Please note: Fields marked with an asterisk (*) must be filled in to
          complete the submission.
        </Text>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonTouchable}>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Share Recipe
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
    color: theme.colors.primary,
  },
  inputGroup: {
    display: 'flex',
    gap: 5,
  },
  label: {
    fontFamily: 'Jost-Medium',
    fontSize: 16,
    marginBottom: 5,
    color: theme.colors.primary,
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
  subLabel: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    marginBottom: 5,
    color: theme.colors.primary,
  },
  timeLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconWrapper: {
    paddingBottom: 7, // Adjust as needed
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
  ingredientsContainer: {
    gap: 8,
  },
  ingredientsGroup: {
    // gap: 8,
  },
  quantityAndIngredientsInputGroup: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  subLabelRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 32,
  },
  quantityLabel: {
    flex: 2,
  },
  ingredientLabel: {
    flex: 6,
  },
  quantityInput: {
    flex: 2,
  },
  ingredientsInput: {
    flex: 6,
  },
  ingredientButton: {
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginBottom: 10,
  },
  ingredientGroupButton: {
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  buttonTouchable: {
    borderRadius: 10,
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
  message: {
    fontFamily: 'Jost-Regular',
    fontSize: 14,
  },
});

export default AddRecipeForm;
