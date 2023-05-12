import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../theme";
/*  FOR TEXTFIELD CSS */
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.secondary.light,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.secondary.light,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.secondary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.light,
    },
  },
  input: {
    "&::placeholder": {
      fontStyle: "italic",
    },
  },
});
/*<------------*/

const Search = () => {
  return (
    <>
      <CssTextField
        label="Search"
        id="custom-css-outlined-input"
        InputLabelProps={{
          style: { color: "#fff" },
        }}
        sx={{ width: "100%" }}
      />
    </>
  );
};

export default Search;
