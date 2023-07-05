import { Box } from "@mui/material";
import theme from "../../theme";
import { useQuery, QueryStatus } from "@tanstack/react-query";
import { useUtils, MyUser, ProfileOverview, fetchOtherProfileInfo, fetchOtherProfilePosts } from '..';
import { User, PostProp } from '../types'
import { useParams } from "react-router";


const OtherProfile = () => {
    const utils = useUtils();

    /* fetching the user id from params */
    const { id: userId } = useParams<{ id: string }>();
    /* React Query Caching : when a react query is

    /* for fetching user information */
    const { error: error1, data: userinfo, isLoading: isLoading1 }: {
        status: QueryStatus
        error: Error | null
        data: User | undefined
        isLoading: boolean
    } = useQuery({
        queryKey: ["otheruserinfo", userId],
        queryFn: () => fetchOtherProfileInfo(userId),
    })


    /* for fetching user posts */
    const { error: error2, data: userposts, isLoading: isLoading2 }: {
        status: QueryStatus
        error: Error | null
        data: PostProp[] | undefined
        isLoading: boolean
    } = useQuery({
        queryKey: ["otheruserposts", userId],
        queryFn: () => fetchOtherProfilePosts(userId),
    })


    if (isLoading1 || isLoading2) {
        utils?.setLoading(true);
        return <div>Loading..</div>
    } else {
        utils?.setLoading(false);
    }

    if (error1) console.log(error1);
    if (error2) console.log(error2);


    return (
        <Box className="h-full" sx={{ backgroundColor: theme.palette.MyBackgroundColors.bg2, padding: 2, borderRadius: '10px', marginTop: 1 }}>
            {userinfo && userposts && (
                <>
                    <MyUser name={userinfo.name} profilePic={userinfo.profilePic} isVerified={userinfo.isVerified} unVerfiedEmail={userinfo.unVerfiedEmail} _id={userinfo._id} />

                    {/* i will send userid and other userinfo as prop to this and based on the tab requirement i'll make the successive api calls in the efficient manner */}

                    <ProfileOverview name={userinfo.name} email={userinfo.email} createdAt={userinfo.createdAt} userposts={userposts} followers={userinfo.followers as User[]} following={userinfo.following as User[]}/>
                </>
            )}

        </Box>
    )
}

export default OtherProfile;