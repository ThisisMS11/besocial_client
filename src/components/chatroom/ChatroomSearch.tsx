import theme from "../../theme";

import { TextField, styled, Autocomplete,Skeleton } from '../imports/Muiimports'
import { useState, useEffect } from "../imports/Reactimports";
import { useQuery } from "@tanstack/react-query";
import { User } from '../types'
import { fetchUserInfo } from "..";

/*  FOR TEXTFIELD CSS */
const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "white",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: theme.palette.secondary.light,
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: theme.palette.secondary.light,
        },
        "&:hover fieldset": {
            borderColor: theme.palette.secondary.light,
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.secondary.light,
        },
    },
    input: {
        "&::placeholder": {
            fontStyle: "italic",
        },
    },
});
/*<------------*/

const ChatroomSearch = ({ setChatuser }: { setChatuser: React.Dispatch<React.SetStateAction<User | null>> }) => {

    const [myself, setMyself] = useState<User>()

    const fetchMyselfQuery = useQuery({
        queryKey: ["myself"],
        queryFn: fetchUserInfo
    })

    const [allFriends, setAllFriends] = useState<User[] | []>([]);

    const handleSelectUser = (event: any, value: any) => {
        console.log(event.target.value);

        if (myself?.following && myself?.followers) {
            const selectedUser = (allFriends as any).find((user: any) => user.name === value);
            setChatuser(selectedUser);
        }
    };

    useEffect(() => {

        const { status,error,data:me } = fetchMyselfQuery;

        if(error) console.log(error);

        if (status === 'success') {
            setMyself(me);

            const following = me?.following as User[];
            const followers = me?.followers as User[];

            const allFriends2: User[] = [];

            following.concat(followers).forEach((user: User) => {
                if (!allFriends2.some((friend) => friend._id === user._id)) {
                    allFriends2.push(user);
                }
            });

            setAllFriends(allFriends2);
        }
    }, [fetchMyselfQuery.status])

    if (fetchMyselfQuery.status == 'loading') return <Skeleton variant="rectangular" width={350} height={60} />


    return (
        <>

            {myself && <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                sx={{
                    display: 'inline-block',
                    width: '100%',
                }}
                onChange={handleSelectUser}
                disableClearable
                options={allFriends.map((user: any) => user.name) ?? []}

                renderInput={(params) => (
                    <CssTextField
                        {...params}
                        label="Search Users you follow"
                        id="custom-css-outlined-input"
                        InputLabelProps={{
                            style: { color: "#fff" },
                        }}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />}
        </>
    );
};

export default ChatroomSearch;
