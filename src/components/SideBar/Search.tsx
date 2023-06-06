import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../theme";
import Autocomplete from '@mui/material/Autocomplete';
import { getSearchUsers, useUtils } from "..";
import { useQuery } from "@tanstack/react-query";

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

  const utils = useUtils();

  /* using react query to fetch all users info for search and assigning values to allusers*/
  const { status, error, data: allusers } = useQuery({
    queryKey: ["allusers"],
    queryFn: getSearchUsers
  })


  if (status == 'loading') return <div>loading...</div>
  if (error) {
    utils?.errornotify(error.message)
  }
  return (
    <>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        sx={{
          display: 'inline-block',
          width: '100%',
        }}
        disableClearable
        options={allusers.map((user: any) => user.name)}
        renderInput={(params) => (
          <CssTextField
            {...params}
            label="Search"
            id="custom-css-outlined-input"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </>
  );
};

export default Search;
