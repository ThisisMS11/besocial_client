import * as React from "react";
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography } from '../imports/Muiimports'
import { useStyles } from "../styles/SideBar";
import { useQuery } from "@tanstack/react-query";
import { fetchAllMessages } from "..";


export default function RecentChats() {
  const classes = useStyles();

  const { error, data: myMessages } = useQuery({
    queryFn: fetchAllMessages,
    queryKey: ['messages']
  })

  if (error) console.log(error);
  if (!myMessages) return <div> loading...</div>


  return (
    <>
      <Typography variant="h6" component={'span'} fontWeight={"bold"} color="text.secondary">Recent Chats</Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.black" }}>


        {myMessages.data.data.map((message: any) => {

          return <>
            <ListItem alignItems="flex-start" className={classes.listitem} >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={message.receiver.profilePic?.url} />
              </ListItemAvatar>
              <ListItemText
                primary={message.receiver.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {message.name}
                    </Typography>
                    {message.message}
                  </React.Fragment>
                }
              />
            </ListItem>


            <Divider variant="inset" component="span" />
          </>
        })

        }
      </List>
    </>
  );
}
