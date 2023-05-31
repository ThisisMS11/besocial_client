import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: theme.palette.MyBackgroundColors.bg4,
    padding: 4
}));

interface MyComponentProps {
    username: string;
    email: string;
    createdAt: string;
}


const UserInfo = (props: MyComponentProps) => {

    let { username, email, createdAt } = props;

    return (
        <>

            <Item elevation={2} sx={{ margin: '10px 0px' }}>
                <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>Name </Typography>
                <Typography variant="h6" >{username}</Typography>
            </Item>

            <Item elevation={2} sx={{ margin: '10px 0px' }}>
                <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>Email </Typography>
                <Typography variant="h6" >{email}</Typography>
            </Item>

            <Item elevation={2} sx={{ margin: '10px 0px' }}>
                <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>Joined </Typography>
                <Typography variant="h6" >{createdAt.split('T')[0]}</Typography>
            </Item>

        </>
    )
}

export default UserInfo