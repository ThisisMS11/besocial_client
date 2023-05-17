import { makeStyles } from "@material-ui/core/styles";
import theme from "../../theme";

const useStyles = makeStyles({
    PostGrid: {
        overflowY: 'scroll',
        maxHeight: 'calc(100vh - 0px)',
        '&::-webkit-scrollbar': {
            width: 0
        }
    }
});

export { useStyles };
