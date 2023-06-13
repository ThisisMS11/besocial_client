import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useStyles } from "../styles/SideBar";


//import fake images here
import image1 from '../../assets/fakeimages/5.jpg'
import image2 from '../../assets/fakeimages/6.jpg'

export default function RecentChats() {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" component={'span'} fontWeight={"bold"} color="text.secondary">Recent Chats</Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.black" }}>
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
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="span" />

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
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="span" />
      </List>
    </>
  );
}
