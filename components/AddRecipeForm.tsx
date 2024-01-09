import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';
import theme from '../Theme';
import { recipeSchema } from '../api/schema/recipeSchema';
import { addRecipe } from '../api/service/recipeService';
import { FormErrors } from '../types/FormErrors';
import PickImage from './PickImage';
import RemoveIcon from './icons/RemoveIcon';
import TimerIcon from './icons/TimerIcon';

const AddRecipeForm = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [servingDetails, setServingDetails] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [ingredientGroups, setIngredientGroups] = useState([
    { ingredientSubtitle: '', items: [{ quantity: '', name: '' }] },
  ]);
  const [instructionGroups, setInstructionGroups] = useState([
    { instructionSubtitle: '', steps: [{ instruction: '' }] },
  ]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Function to add ingredient group
  const addIngredientGroup = () => {
    setIngredientGroups([
      ...ingredientGroups,
      { ingredientSubtitle: '', items: [{ quantity: '', name: '' }] },
    ]);
  };

  // Function to add ingredient item with quantity and name of ingredient
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

  // For ingredient subtitle changes
  const handleIngredientSubtitleChange = (
    groupIndex: number,
    value: string
  ) => {
    const newGroups = [...ingredientGroups];
    newGroups[groupIndex].ingredientSubtitle = value;
    setIngredientGroups(newGroups);
  };

  // Function to handle removal of an ingredient item
  const removeIngredientItem = (groupIndex: number, itemIndex: number) => {
    const newGroups = [...ingredientGroups];
    newGroups[groupIndex].items.splice(itemIndex, 1);
    setIngredientGroups(newGroups);
  };

  const addInstructionGroup = () => {
    setInstructionGroups([
      ...instructionGroups,
      { instructionSubtitle: '', steps: [{ instruction: '' }] },
    ]);
  };

  const addInstructionStep = (groupIndex: number) => {
    const newGroups = [...instructionGroups];
    newGroups[groupIndex].steps.push({ instruction: '' });
    setInstructionGroups(newGroups);
  };

  const handleInstructionChange = (
    groupIndex: number,
    stepIndex: number,
    value: string
  ) => {
    const newGroups = [...instructionGroups];
    newGroups[groupIndex].steps[stepIndex].instruction = value;
    setInstructionGroups(newGroups);
  };

  const removeInstructionStep = (groupIndex: number, stepIndex: number) => {
    const newGroups = [...instructionGroups];
    newGroups[groupIndex].steps.splice(stepIndex, 1);
    setInstructionGroups(newGroups);
  };

  // For instruction subtitle changes
  const handleInstructionSubtitleChange = (
    groupIndex: number,
    value: string
  ) => {
    const newGroups = [...instructionGroups];
    newGroups[groupIndex].instructionSubtitle = value;
    setInstructionGroups(newGroups);
  };

  // Handle submit function
  const handleSubmit = async () => {
    Keyboard.dismiss();

    try {
      // Validate form data using Yup
      await recipeSchema.validate(
        {
          imageUrl,
          title,
          description,
          servingDetails,
          prepTime,
          cookTime,
          ingredients: ingredientGroups,
          instructions: instructionGroups,
          additionalNotes,
        },
        { abortEarly: false }
      );

      const newRecipe = {
        imageUrl,
        title,
        description,
        servingDetails,
        prepTime,
        cookTime,
        ingredients: ingredientGroups,
        instructions: instructionGroups,
        additionalNotes,
      };

      await addRecipe(newRecipe);
      console.log('Recipe added successfully');

      // Reset form fields after successful submission
      setImageUrl(null);
      setTitle('');
      setDescription('');
      setServingDetails('');
      setPrepTime('');
      setCookTime('');
      setIngredientGroups([
        { ingredientSubtitle: '', items: [{ quantity: '', name: '' }] },
      ]);
      setInstructionGroups([
        { instructionSubtitle: '', steps: [{ instruction: '' }] },
      ]);
      setAdditionalNotes('');
      setFormSubmitted((prev) => !prev);

      // Alert user of success
      Alert.alert('Success', 'Your recipe has been shared!', [{ text: 'OK' }]);
    } catch (error) {
      console.error('Failed to add recipe:', error);

      if (error instanceof Yup.ValidationError) {
        // Reduce Yup errors into a single object
        const newErrors = error.inner.reduce((acc, err) => {
          // Assert that err.path is a string
          const path = err.path || '';
          return { ...acc, [path]: err.message };
        }, {});
        setFormErrors(newErrors);
      } else {
        // Handle other types of errors (like network errors)
        Alert.alert('Error', 'Failed to add recipe. Please check your input.');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.h3}>Add new recipe</Text>
          <PickImage onChange={setImageUrl} resetTrigger={formSubmitted} />
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the title of your recipe"
              placeholderTextColor="#888"
              value={title}
              onChangeText={setTitle}
            />
            {formErrors.title && (
              <Text style={styles.errorMessage}>{formErrors.title}</Text>
            )}
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
            {formErrors.description && (
              <Text style={styles.errorMessage}>{formErrors.description}</Text>
            )}
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
            {formErrors.servingDetails && (
              <Text style={styles.errorMessage}>
                {formErrors.servingDetails}
              </Text>
            )}
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
                {formErrors.prepTime && (
                  <Text style={styles.errorMessage}>{formErrors.prepTime}</Text>
                )}
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
                  value={group.ingredientSubtitle}
                  onChangeText={(text) =>
                    handleIngredientSubtitleChange(groupIndex, text)
                  }
                />
                <View style={styles.subLabelQuantityAndIngredientRow}>
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
                    {formErrors[
                      `ingredients[${groupIndex}].items[${itemIndex}].quantity`
                    ] && (
                      <Text style={styles.errorMessage}>
                        {
                          formErrors[
                            `ingredients[${groupIndex}].items[${itemIndex}].quantity`
                          ]
                        }
                      </Text>
                    )}
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
                    {formErrors[
                      `ingredients[${groupIndex}].items[${itemIndex}].name`
                    ] && (
                      <Text style={styles.errorMessage}>
                        {
                          formErrors[
                            `ingredients[${groupIndex}].items[${itemIndex}].name`
                          ]
                        }
                      </Text>
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        removeIngredientItem(groupIndex, itemIndex)
                      }
                    >
                      <RemoveIcon size={28} fill={'#232323'} />
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity
                  onPress={() => addIngredientItem(groupIndex)}
                  style={styles.buttonTouchable}
                >
                  <Button
                    mode="outlined"
                    style={styles.addIngredientButton}
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
                style={styles.addIngredientGroupButton}
                labelStyle={styles.buttonLabel}
                onPress={addIngredientGroup}
              >
                Add Ingredient Group
              </Button>
            </TouchableOpacity>
          </View>

          <View style={styles.instructionsContainer}>
            <Text style={styles.label}>Instructions</Text>
            {instructionGroups.map((group, groupIndex) => (
              <View key={groupIndex} style={styles.instructionGroup}>
                <Text style={styles.subLabel}>Subtitle</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Add a subtitle"
                  value={group.instructionSubtitle}
                  onChangeText={(text) =>
                    handleInstructionSubtitleChange(groupIndex, text)
                  }
                />
                <View style={styles.subLabelStepsAndInstructionRow}>
                  <Text style={[styles.subLabel, styles.stepLabel]}>Step</Text>
                  <Text style={[styles.subLabel, styles.instructionLabel]}>
                    Instruction *
                  </Text>
                </View>
                {group.steps.map((step, stepIndex) => (
                  <View key={stepIndex} style={styles.stepAndinstructionGroup}>
                    <Text style={styles.stepNumber}>{stepIndex + 1}.</Text>
                    <TextInput
                      style={[styles.input, styles.instructionInput]}
                      placeholder="Instruction"
                      value={step.instruction}
                      onChangeText={(text) =>
                        handleInstructionChange(groupIndex, stepIndex, text)
                      }
                    />
                    {formErrors[
                      `instructions[${groupIndex}].steps[${stepIndex}].instruction`
                    ] && (
                      <Text style={styles.errorMessage}>
                        {
                          formErrors[
                            `instructions[${groupIndex}].steps[${stepIndex}].instruction`
                          ]
                        }
                      </Text>
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        removeInstructionStep(groupIndex, stepIndex)
                      }
                    >
                      <RemoveIcon size={28} fill={'#232323'} />
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity
                  onPress={() => addInstructionStep(groupIndex)}
                  style={styles.buttonTouchable}
                >
                  <Button
                    mode="outlined"
                    style={styles.addStepButton}
                    labelStyle={styles.buttonLabel}
                  >
                    Add Instruction
                  </Button>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              onPress={addInstructionGroup}
              style={styles.buttonTouchable}
            >
              <Button
                mode="outlined"
                style={styles.addInstructionGroupButton}
                labelStyle={styles.buttonLabel}
              >
                Add Instruction Group
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
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.buttonTouchable}
          >
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
    </TouchableWithoutFeedback>
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
    gap: 24,
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
  subLabelQuantityAndIngredientRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 16,
  },
  quantityAndIngredientsInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 16,
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
  addIngredientButton: {
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginBottom: 10,
  },
  addIngredientGroupButton: {
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  buttonTouchable: {
    borderRadius: 10,
  },
  instructionsContainer: {
    gap: 8,
  },
  instructionGroup: {
    // gap: 8,
  },
  subLabelStepsAndInstructionRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8,
  },
  stepAndinstructionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  stepLabel: {
    flex: 1,
  },
  instructionLabel: {
    flex: 9,
  },
  stepNumber: {
    fontFamily: 'Jost-Regular',
    textAlign: 'center',
    fontSize: 16,
    color: theme.colors.primary,
    flex: 1,
  },
  instructionInput: {
    flex: 9,
  },
  addStepButton: {
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginBottom: 10,
  },
  addInstructionGroupButton: {
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
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
  errorMessage: {
    fontFamily: 'Jost-Regular',
    color: 'red',
    fontSize: 16,
  },
  message: {
    fontFamily: 'Jost-Regular',
    fontSize: 14,
  },
});

export default AddRecipeForm;
