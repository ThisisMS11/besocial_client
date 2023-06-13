import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { User } from '../../types';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: theme.palette.MyBackgroundColors.bg4,
    padding: 4
}));


const UserInfo = (props: User) => {

    let { name, email, createdAt } = props;

    return (
        <>

            <Item elevation={2} sx={{ margin: '10px 0px' }}>
                <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}component={'span'}>Name </Typography>
                <Typography variant="h6" component={'span'}>{name}</Typography>
            </Item>

            <Item elevation={2} sx={{ margin: '10px 0px' }}>
                <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}component={'span'}>Email </Typography>
                <Typography variant="h6"component={'span'} >{email}</Typography>
            </Item>

            <Item elevation={2} sx={{ margin: '10px 0px' }}>
                <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}component={'span'}>Joined </Typography>
                <Typography variant="h6" component={'span'} >{createdAt ? createdAt.split('T')[0] : 'date not available'}</Typography>
            </Item>

        </>
    )
}

export default UserInfo