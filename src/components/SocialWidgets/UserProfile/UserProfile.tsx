import { Box,Skeleton } from "@mui/material";
import theme from "../../../theme";
import { useQuery, QueryStatus } from "@tanstack/react-query";
import {  MyUser, ProfileOverview, fetchUserInfo, fetchUserPosts } from '../..';
import { User, PostProp } from '../../types'

const UserProfile = () => {

    /* for fetching user information */
    const { status: status1, error: error1, data: userinfo }: {
        status: QueryStatus
        error: Error | null
        data: User | undefined
    } = useQuery({
        queryKey: ["userinfo"],
        queryFn: fetchUserInfo
    })

    /* for fetching user posts */
    const { status: status2, error: error2, data: userposts }: {
        status: QueryStatus
        error: Error | null
        data: PostProp[] | undefined
    } = useQuery({
        queryKey: ["alluserposts"],
        queryFn: fetchUserPosts
    })

    if (status1 == 'loading' || status2 == 'loading') {
        return <Skeleton variant="rectangular" width={900} height={850} sx={{borderRadius:2}}/>
    }

    if (error1) console.log(error1)
    if (error2) console.log(error2)


    console.log(userinfo);

    return (
        <Box className="h-full" sx={{ backgroundColor: theme.palette.MyBackgroundColors.bg2, padding: 2, borderRadius: '10px', marginTop: 1 }}>
            {userinfo && userposts && (
                <>
                    <MyUser name={userinfo.name} profilePic={userinfo.profilePic} isVerified={userinfo.isVerified} unVerfiedEmail={userinfo.unVerfiedEmail} _id={userinfo._id} email={userinfo.email} />

                    {/* i will send userid and other userinfo as prop to this and based on the tab requirement i'll make the successive api calls in the efficient manner */}

                    <ProfileOverview name={userinfo.name} email={userinfo.email} createdAt={userinfo.createdAt} userposts={userposts} followers={userinfo.followers as User[]} following={userinfo.following as User[]} />
                </>
            )}

        </Box>
    )
}

export default UserProfile