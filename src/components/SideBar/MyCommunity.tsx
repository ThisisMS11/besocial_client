import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useStyles } from "../styles/SideBar";

//import fake images here
import image1 from "../../assets/fakeimages/1.png";
import image2 from "../../assets/fakeimages/2.png";
import image3 from "../../assets/fakeimages/3.png";

export default function MyCommunity() {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" fontWeight={"bold"} color="text.secondary">My Community</Typography>
      <List sx={{ bgcolor: "background.black" }} >
        <ListItem alignItems="flex-start" className={classes.listitem}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={image1} />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>

        {/* <Divider variant="inset" component="li" /> */}

        <ListItem alignItems="flex-start" className={classes.listitem}>
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src={image2} />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        {/* <Divider variant="inset" component="li" /> */}
        <ListItem alignItems="flex-start" className={classes.listitem}>
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src={image3} />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </>
  );
}
