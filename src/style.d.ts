import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;
    pallets?: {
      [name : string]: {
        [i: number] : string
      }
    };
    colors: {
      main: string;
      mainActive: string;
      secondary: string;
      bodyBackground: string;
      primaryBg: string;
      secondaryBg: string;
      systemMenu: {
        border: string;
        background: string; // use only RGB "inside" values. e.g.: rgb(THIS)
        link: string;
        icon: string;
      };
      textA: string;
      textB: string;
      textC: string;
      outlineColor: string;
    };
  }
}
