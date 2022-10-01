import React, {useState, useEffect} from 'react'
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import { useDispatch } from 'react-redux'

import {getPosts} from './actions/posts'

import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'

import useStyles from './styles'

import memories from './images/header-icon.png'

const App = () => {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <img className={classes.image} src={memories} alt="memories" height={60} />
                <Typography className={classes.heading} variant='h2' align='center'>emories</Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={12} md={8}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Form  currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App