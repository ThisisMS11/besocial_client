import { Box, Typography } from "@mui/material"
import theme from "../../theme"
import { useState } from "react"
// import { useAuth } from ".."
const Message = () => {
    // const auth = useAuth();


    // const [position, setPosition] = useState<string>(message.user.id === auth.user?.userid ? 'end' : 'start');

    const [position, setPosition] = useState('start')


    return (
        <>
            <Box className={`border-red-600 mx-2 my-2 flex justify-${position}`}>
                <Box className='max-w-xl p-3 rounded-xl' bgcolor={theme.palette.MyBackgroundColors.bg3}>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, deserunt corporis. Fugiat provident eligendi ut ex dolores? Culpa, ipsam sed.
                    </Typography>

                    <Typography component={'span'} variant="caption" color="text.secondary">
                        26/11/23 5:00PM
                    </Typography>
                </Box>
            </Box>
            <Box className={`border-red-600 mx-2 my-2 flex justify-end`}>
                <Box className='max-w-xl p-3 rounded-xl' bgcolor={theme.palette.MyBackgroundColors.bg3}>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, deserunt corporis. Fugiat provident eligendi ut ex dolores? Culpa, ipsam sed.
                    </Typography>

                    <Typography component={'span'} variant="caption" color="text.secondary">
                        26/11/23 5:00PM
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default Message