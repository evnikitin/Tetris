import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    custom?: {
      headerBackground?: string;
    };
  }
  interface Palette {
    custom: {
      headerBackground: string;
    };
  }
}

const themeOptions: ThemeOptions = {
  spacing: 8,
  palette: {
    custom: {
      headerBackground: '#276ed9',
    },
  },
};

const defaultTheme = createTheme(themeOptions);

export default defaultTheme;