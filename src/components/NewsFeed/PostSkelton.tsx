import { Skeleton, CardHeader, Card, CardContent } from '../imports/Muiimports'
import { Fragment } from 'react'

const PostSkelton = () => {
    return (
        <Card sx={{ maxWidth: '100%', my: 2 ,mx:4,height:400}}>
            <CardHeader
                avatar={
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                }
                title={
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />

                }
                subheader={
                    <Skeleton animation="wave" height={10} width="40%" />
                }
            />
            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

            <CardContent>
                <Fragment>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="80%" />
                </Fragment>
            </CardContent>
            <CardContent>
                <Fragment>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="80%" />
                </Fragment>
            </CardContent>
        </Card>
    )
}

export default PostSkelton