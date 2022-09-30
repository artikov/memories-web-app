import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'

import useStyles from './styles'

const Post = ({ post }) => {
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: "white"}} size ="small" onClick={()=> {}}>
                    <MoreHorizIcon fontSize='default' />
                </Button>
            </div>
        </Card>
    )
}

export default Post