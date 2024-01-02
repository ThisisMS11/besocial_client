import * as React from "react";
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Skeleton } from '../imports/Muiimports'
import { useStyles } from "../styles/SideBar";
import { useQuery } from "@tanstack/react-query";
import { fetchAllMessages } from "..";
import { useState, useEffect } from "../imports/Reactimports";


export default function RecentChats() {
  const classes = useStyles();

  const [myMessages, setMyMessages] = useState([]);


  const fetchMyMessageQuery = useQuery({
    queryFn: fetchAllMessages,
    queryKey: ['messages'],
    onSuccess: (data) => {
      setMyMessages(data.data.data)
    }
  })

  if (!myMessages) return <Skeleton variant="rectangular" width={350} height={60} />

  useEffect(() => {
    const { error } = fetchMyMessageQuery;

    if (error) {
      console.log(error);
    }

  }, [fetchMyMessageQuery.status])



  return (
    <>
      <Typography variant="h6" component={'span'} fontWeight={"bold"} color="text.secondary">Recent Chats</Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.black" }}>


        {
          fetchMyMessageQuery.status === 'loading' ? <Skeleton variant="rectangular" width={350} height={60} /> :


            myMessages.map((message: any,index:number) => {

              return <div key={index}>
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
              </div>
            })

        }


      </List>
    </>
  );
}
