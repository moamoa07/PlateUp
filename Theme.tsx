import { MD3LightTheme } from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#232323',
    secondary: '#D6DED1',
    background: '#fff',
    secondaryContainer: '#D6DED1',
  },

  fonts: {
    ...MD3LightTheme.fonts,
    regular: {
      fontFamily: 'Jost-Regular',
      fontWeight: 'normal',
    },
    labelMedium: {
      fontFamily: 'Jost-Regular',
    },
    labelLarge: {
      fontFamily: 'Jost-Regular',
    },
  },
};

export default theme;
