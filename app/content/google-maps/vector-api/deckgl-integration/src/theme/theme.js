import { themeConfig } from './themeConfig';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const theme = createMuiTheme(themeConfig);

export default responsiveFontSizes(theme);
