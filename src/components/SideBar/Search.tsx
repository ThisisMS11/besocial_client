import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../theme";
import Autocomplete from '@mui/material/Autocomplete';
import { getSearchUsers } from "..";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();


  /* using react query to fetch all users info for search and assigning values to allusers*/
  const { status, data: allusers } = useQuery({
    queryKey: ["allusers"],
    queryFn: getSearchUsers
  })


  if (status == 'loading') return <div>loading...</div>

  const handleSelectUser = (event: any, value: any) => {
    // Assuming each user object has a unique ID
    const selectedUser = allusers.find((user: any) => user.name === value);

    /* ok i have got the user */
    console.log(selectedUser._id);
    navigate(`/user/${selectedUser._id}`);
  };


  return (
    <>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        sx={{
          display: 'inline-block',
          width: '100%',
        }}
        onChange={handleSelectUser}
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
