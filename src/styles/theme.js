import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'

const getTheme = () => {
  let overwrites = {
    "palette": {
        "primary1Color": "#26c6da",
        "primary2Color": "#039be5",
        "accent1Color": "#3949ab"
    }
};
  return getMuiTheme(baseTheme, overwrites);
}