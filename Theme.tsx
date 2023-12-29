import { MD3LightTheme } from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#232323',
    secondary: '#D6DED1',
    background: '#fff',
  },

  fonts: {
    ...MD3LightTheme.fonts,
    regular: {
      fontFamily: 'Jost',
      fontWeight: 'normal',
    },
  },
};

export default theme;
