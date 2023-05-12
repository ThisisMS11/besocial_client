import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

/*  FOR TEXTFIELD CSS */
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
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
      />
    </>
  );
};

export default Search;
