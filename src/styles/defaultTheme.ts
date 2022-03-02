import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
      borderRadius: string;
  
      colors: {
        main: string;
        mainActive: string;
        secondary: string;
        bodyBackground: string;
        primaryBg: string;
        secondaryBg: string;
        textA: string;
        textB: string;
        textC: string;
        outlineColor: string;
        navsBackground: string;
      };
    }
}