const PRIMARY_COLOR = '#3e4c5b';
const SECONDARY_COLOR = '#b3b3b3';

export const themeConfig = {
  overrides: {
    MuiFormLabel: {
      root: {
        marginBottom: '0.5rem',
        '&$focused': {
          color: '#fff',
        },
      },
    },
    MuiRadio: {
      root: {
        padding: '4px 9px 4px 9px',
      },
    },
  },
  palette: {
    primary: { main: PRIMARY_COLOR },
    secondary: { main: SECONDARY_COLOR },
  },
  typography: {
    fontSize: 12,
  },
};
