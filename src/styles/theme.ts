import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    main: '45 144 65',
    mainActive: '#1d5c2a',
    secondary: 'magenta',
    bodyBackground: '247 247 247',
    systemMenu: {
      border: '#ced4da',
      background: '255 255 255',
      link: '#000',
      icon: "",
    },
    textA: '#000',
    textB: '#666',
    textC: '#4e5860',
    primaryBg: '#fff',
    secondaryBg: '#f9f9f9',
    outlineColor: '#ced4da',
  },
};

export const darkTheme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    main: '45 144 65', //r g b
    mainActive: '#1d5c2a',
    secondary: 'magenta',
    bodyBackground: '24 24 24',
    systemMenu: {
      border: 'transparent',
      background: '33 33 33',
      link: '#000',
      icon: "",
    },
    textA: '#fafafa',
    textB: '#888',
    textC: '#fff',
    primaryBg: '#333',
    secondaryBg: '#444',
    outlineColor: '#555',
  },
};