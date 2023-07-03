import { User } from '../../types';
import { styled, Typography, Paper, Accordion, AccordionDetails, AccordionSummary, ExpandMoreIcon, Avatar, Button, Box } from '../../imports/Muiimports'
import { unfollowUser } from '../..';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: theme.palette.MyBackgroundColors.bg4,
    padding: 4,
    display: 'flex',
    flexDirection: 'column'
}));

const ConnectedUser = ({ user, blockshow }: { user: User, blockshow?: boolean }) => {

    const queryClient = useQueryClient();

    /* unfollow mutation */
    const unfollowmutation = useMutation({
        mutationFn: () => unfollowUser(user._id as string),
        mutationKey: ['unfollowRequest', user._id],
        onSuccess: (data: any) => {
            queryClient.invalidateQueries(['userinfo']);

            console.log(data.data);
        }
    })

    return <Item elevation={1} sx={{ margin: '10px 0px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box display={'flex'} alignItems={'center'}>
            <Avatar src={user.profilePic?.url}></Avatar>
            <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1, marginLeft: 1, color: 'white' }} component={'span'}>{user.name} </Typography>
        </Box>

        {
            blockshow ? (<Button variant='outlined'>
                Block
            </Button>) : (<Button variant="outlined" onClick={() => unfollowmutation.mutate()}>
                Unfollow
            </Button>)

        }

    </Item>
}


const UserInfo = (props: User) => {

    let { name, email, createdAt, followers, following } = props;

    return (
        <>

            <Item elevation={2} sx={{ margin: '10px 0px' }}>
                <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }} component={'span'}>Name </Typography>
                <Typography variant="h6" component={'span'}>{name}</Typography>
            </Item>

            <Item elevation={2} sx={{ margin: '10px 0px' }}>
                <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }} component={'span'}>Email </Typography>
                <Typography variant="h6" component={'span'} >{email}</Typography>
            </Item>

            <Item elevation={2} sx={{ margin: '10px 0px' }}>
                <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }} component={'span'}>Joined </Typography>
                <Typography variant="h6" component={'span'} >{createdAt ? createdAt.split('T')[0] : 'date not available'}</Typography>
            </Item>

            <Accordion sx={{ backgroundColor: '#1e1f23' }}>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography component="span">Followers</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {
                        followers?.map((follower) => {
                            return <ConnectedUser user={follower as User} blockshow />
                        })
                    }
                </AccordionDetails>

            </Accordion>

            <Accordion sx={{ backgroundColor: '#1e1f23', marginTop: 1 }}>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography component="span">Following</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {
                        following?.map((follower) => {
                            return <ConnectedUser user={follower as User} />
                        })
                    }
                </AccordionDetails>

            </Accordion>

        </>
    )
}

export default UserInfo