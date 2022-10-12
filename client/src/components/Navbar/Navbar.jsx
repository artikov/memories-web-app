import React, {useState, useEffect} from 'react'
import {AppBar, Avatar, Button, Typography, Toolbar} from '@material-ui/core'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import memories from '../../images/header-icon.png'


import useStyles from './styles'

const Navbar = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const logout = () => {
        dispatch({type: 'LOGOUT'})

        navigate('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])



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
                    <Avatar className={classes.purple} src={user?.result.imageUrl} alt={user?.result.name}>{user?.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                )}
        </Toolbar>
        </AppBar>
    )
}

export default Navbar