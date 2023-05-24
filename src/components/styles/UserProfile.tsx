import { makeStyles } from "@material-ui/core/styles";
import theme from "../../theme";
const useStyles = makeStyles({
    menuItem: {
        backgroundColor: `${theme.palette.MyBackgroundColors.bg4} !important`,
        color: 'white !important',
        '&:hover': {
            backgroundColor: theme.palette.MyBackgroundColors.bg4,
        },
        margin: '0 !important',
    },
    Menu: {
        padding: '0px !important',
        paddingTop: '0px !important'
    }
});

export default useStyles;
