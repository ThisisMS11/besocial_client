import theme from "../../theme";
import { TextField, styled, Autocomplete } from '../imports/Muiimports'
import { useState, useEffect } from "../imports/Reactimports";
import { fetchUserInfo } from "..";
import { useQuery } from "@tanstack/react-query";
import { User } from '../types'

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

    const { status, data: userinfo } = useQuery({
        queryKey: ["userinfo"],
        queryFn: fetchUserInfo
    })

    const [allFriends, setAllFriends] = useState<User[] | []>([]);

    const handleSelectUser = (event: any, value: any) => {
        console.log(event.target.value);

        if (userinfo?.following && userinfo?.followers) {
            const selectedUser = (allFriends as any).find((user: any) => user.name === value);
            setChatuser(selectedUser);
        }
    };

    useEffect(() => {
        if (status === 'success') {
            const following = userinfo?.following as User[];
            const followers = userinfo?.followers as User[];

            const allFriends2: User[] = [];

            following.concat(followers).forEach((user: User) => {
                if (!allFriends2.some((friend) => friend._id === user._id)) {
                    allFriends2.push(user);
                }
            });

            setAllFriends(allFriends2);
        }
    }, [])

    if (status == 'loading') return <div>Loading...</div>;

    return (
        <>

            {userinfo && <Autocomplete
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
