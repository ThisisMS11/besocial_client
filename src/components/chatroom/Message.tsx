import { Box, Typography } from "@mui/material"
import theme from "../../theme"
import { MessageType } from "../types"
import { useUtils, useAuth } from ".."

const Message = ({ message }: { message: MessageType }) => {
    const auth = useAuth()

    // console.log(auth.user?.userid)
    // console.log(message.sender)

    const position = message.sender === auth.user?.userid ? 'end' : 'start'

    const utils = useUtils();

    // Construct the class name based on the position value

    const end = {
        display: 'flex',
        justifyContent: 'flex-end',
    }

    const start = {
        display: 'flex',
        justifyContent: 'flex-start',
    }

    return (
        <>
            <Box className='border-red-600 mx-2 my-2' sx={position === 'end' ? end : start}
            >
                <Box className="max-w-xl p-3 rounded-xl" bgcolor={theme.palette.MyBackgroundColors.bg3}>
                    <Typography>{message.message}</Typography>

                    <Typography component={'span'} variant="caption" color="text.secondary">
                        {utils?.getTimeDifference(message.createdAt).date +
                            " " +
                            utils?.getTimeDifference(message.createdAt).time}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default Message
