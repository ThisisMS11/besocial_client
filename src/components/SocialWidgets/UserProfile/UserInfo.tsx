import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useUtils } from '../..';

import { useEffect, useState } from 'react';
import axios from 'axios';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: theme.palette.MyBackgroundColors.bg4,
    padding: 4
}));


const UserInfo = () => {

    const utils = useUtils();

    const [userinfo, setUserinfo] = useState<object | null>(null);

    useEffect(() => {
        /* axios call to fetch userinfo using token */
        async function fetchUserInfo() {
            utils?.setLoading(true);
            const token = localStorage.getItem('token');

            if (token) {

                const config = {
                    headers: {
                        'authorisation': `Bearer ${token}`
                    }
                }
                await axios.get('http://localhost:1983/api/v1/user/', config).then((response) => {
                    setUserinfo(response.data.data);
                }).catch((error) => {
                    console.log('axios error : ', error);
                })

            }
            utils?.setLoading(false);
        }

        fetchUserInfo();
    }, [])

    if (utils?.loading) {
        return <div>Loading...</div>;
    }

    return (
        <>


            {userinfo && Object.entries(userinfo).map(([key, value]) => {
                if (key !== 'profilePic') {
                    return (<>
                        <Item elevation={2} sx={{ margin: '10px 0px' }}>
                            <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>{key} </Typography>
                            <Typography variant="h6" >{value}</Typography>
                        </Item>
                    </>)
                }

            })}


        </>
    )
}

export default UserInfo