import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    main: '45 144 65',
    mainActive: '#1d5c2a',
    secondary: 'magenta',
    bodyBackground: '247 247 247',
    textA: '#000',
    textB: '#666',
    primaryBg: '#fff',
    secondaryBg: '#f9f9f9',
    outlineColor: '#ced4da',
    navsBackground: '255 255 255',
  },
};

export const darkTheme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    main: '45 144 65', //r g b
    mainActive: '#1d5c2a',
    secondary: 'magenta',
    bodyBackground: '24 24 24',
    textA: '#fafafa',
    textB: '#888',
    primaryBg: '#333',
    secondaryBg: '#444',
    outlineColor: '#555',
    navsBackground: '33 33 33',
  },
};