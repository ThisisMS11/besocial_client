import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Tooltip } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import InfoIcon from '@mui/icons-material/Info';
import theme from '../../../theme';

/* to remove section */
import { Post, UserInfo } from '../..';

import { PostProp } from '../../types';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

/* User info as props */
interface MyComponentProps {
    name: string;
    email?: string;
    createdAt?: string;
    userposts?: PostProp[];
}


export default function ProfileOverview(props: MyComponentProps) {

    let { name, email, createdAt, userposts } = props;

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event.target);
        setValue(newValue);
    };

    return (


        <Box>

            <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" centered sx={{ backgroundColor: theme.palette.MyBackgroundColors.bg2 }}>
                <Tooltip title='timeline' >
                    <Tab icon={<TimelineIcon />} />
                </Tooltip>
                <Tooltip title='Photos'>
                    <Tab icon={<PhotoSizeSelectActualIcon />} />

                </Tooltip>
                <Tooltip title='Videos'>
                    <Tab icon={<VideoCameraBackIcon />} />
                </Tooltip>
                <Tooltip title='About'>
                    <Tab icon={<InfoIcon />} />
                </Tooltip>
            </Tabs>

            {/* corresponding  tab panels starts  */}

            <TabPanel value={value} index={0}>
                {userposts && userposts.map((post) => {
                    return <Post key={post.id} images={post.photos} PostContent={post.PostString} user={post.user} likes={post.likes} postId={post.id} createdAt={post.createdAt} comments={post.comments} />

                })}

            </TabPanel>
            <TabPanel value={value} index={1}>
                Photos
            </TabPanel>
            <TabPanel value={value} index={2}>
                Videos
            </TabPanel>

            <TabPanel value={value} index={3}>
                <UserInfo name={name} email={email} createdAt={createdAt} />
            </TabPanel>

            {/* corresponding  tab panels ends  */}



        </Box >

    );
}