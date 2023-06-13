import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import image from '../../assets/fakeimages/2.png'
import theme from '../../theme';
export default function JoinCommunity() {
    return (
        <Card sx={{ maxWidth: 345, backgroundColor: theme.palette.MyBackgroundColors.bg2,marginTop:2 }}>
            <CardActionArea >
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"

                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="span">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component={'span'}>
                        Lizards are a widespread group of squamate reptiles.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Join Community
                </Button>
            </CardActions>
        </Card>
    );
}