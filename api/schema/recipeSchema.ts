import * as Yup from 'yup';

export const recipeSchema = Yup.object().shape({
  imageUrl: Yup.string().nullable(),
  title: Yup.string()
    .required('Please add a title')
    .max(100, 'Title cannot be more than 100 characters'),
  description: Yup.string()
    .required('Please add a description')
    .max(500, 'Description cannot be more than 500 characters'),
  servingDetails: Yup.string()
    .required('Please add serving details')
    .max(30, 'Serving details cannot be more than 30 characters'),
  prepTime: Yup.string()
    .required('Please add prep time')
    .max(20, 'Prep time description is too long'),
  cookTime: Yup.string().nullable(),
  ingredients: Yup.array().of(
    Yup.object().shape({
      ingredientSubtitle: Yup.string()
        .nullable()
        .max(100, 'Subtitle cannot be more than 100 characters'),
      items: Yup.array()
        .of(
          Yup.object().shape({
            quantity: Yup.string()
              .required('Please add quantity')
              .max(20, 'Quantity cannot be more than 20 characters'),
            name: Yup.string()
              .required('Please add ingredient')
              .max(50, 'Ingredient name cannot be more than 50 characters'),
          })
        )
        .required('At least one ingredient is required'),
    })
  ),
  instructions: Yup.array().of(
    Yup.object().shape({
      instructionSubtitle: Yup.string()
        .nullable()
        .max(100, 'Subtitle cannot be more than 100 characters'),
      steps: Yup.array()
        .of(
          Yup.object().shape({
            instruction: Yup.string()
              .required('Please add instruction')
              .max(350, 'Instruction cannot be more than 350 characters'),
          })
        )
        .required('At least one instruction step is required'),
    })
  ),
  additionalNotes: Yup.string()
    .nullable()
    .max(500, 'Additional notes cannot be more than 500 characters'),
});
