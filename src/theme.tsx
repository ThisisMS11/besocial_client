import { createTheme, colors } from "@mui/material";
import { yellow } from "@mui/material/colors";
const { palette } = createTheme();

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#17181c",
    },
    text: {
      primary: "#ffffff",
      secondary: "#898b8e",
    },
    secondary: {
      main: "#26262e",
    },
    MyBackgroundColors: {
      bg1: "#ffffff",
      bg2: "#1e1f23",
      bg3: "#26262e",
      bg4: "#282a2f"
    },
  },
});

export default theme;
