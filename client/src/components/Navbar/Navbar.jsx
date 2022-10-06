import React from 'react'
import {AppBar, Avatar, Button, Typography, Toolbar} from '@material-ui/core'
import {Link} from 'react-router-dom'

import memories from '../../images/header-icon.png'


import useStyles from './styles'

const Navbar = () => {

    const classes = useStyles()

    const user = null

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
            <img className={classes.image} src={memories} alt="memories" height={60} />
            <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>emories
            </Typography>
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary">Logout</Button>
                </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                )}
        </Toolbar>
        </AppBar>
    )
}

export default Navbar