import { Box, Button, IconButton, Stack } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { styled } from "@mui/material";

// const styledBox = styled(Box)(({ theme }) => ({
//   height: "250px",
//   width: "200px",
//   backgroundColor: theme.status.danger,
// }));

const Buttons = () => {
  return (
    <>
      {/* to add a button without text just icon */}

      <Stack spacing={2} direction="row">
        <Button variant="text" color="success">
          Text
        </Button>
        <Button variant="contained">Contained</Button>

        {/* disableElevation will nullify the shadow that is seen below the buttons */}
        <Button variant="contained" disableElevation>
          Contained
        </Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>

      <IconButton aria-label="add" disableRipple>
        <AddCircleRoundedIcon color="success" />
      </IconButton>

      <IconButton aria-label="add" sx={{ bgcolor: "secondary.light" }}>
        <AddCircleRoundedIcon color="success" />
      </IconButton>
      
      {/* <styledBox/> */}
    </>
  );
};

export default Buttons;
