// MATERIAL
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import colors from "./bases/colors";

const checkBoxStyles = {
  root: {
    color: colors.messages.info,
    "&$checked": {
      color: colors.green.light
    }
  },
  checked: {}
};

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);
export default CustomCheckbox;
