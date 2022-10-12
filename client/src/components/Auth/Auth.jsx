import React, { useState, useEffect } from 'react'

import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { GoogleLogin } from 'react-google-login';
import {gapi} from 'gapi-script'

import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import Icon from './icon'
import Input from './Input'
import {signin, signup} from '../../actions/auth'

import useStyles from './styles'

const initialState = {firstName: '', lastName: '', email:'', password:'', confirmPassword:''}

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // handle google oauth error
    useEffect(() => {
        const clientId = '19645035945-gjliusjii9063d4hvd4gucemkcm7cvo6.apps.googleusercontent.com'
        function start(){
            gapi.auth2.init({clientId: clientId, scope: ""})
        }
        gapi.load("client:auth2", start)
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if(isSignup){
            dispatch(signup(formData, navigate))
        }else{
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }
    
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj  // ?. used to avoid error if value is not present
        const token = res?.tokenObj

        try {
            dispatch({
                type: "AUTH",
                data: {result, token}
            })

            navigate('/')
        } catch(error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google sign in was unsuccessful. Try again later...")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avater}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up': 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name ="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name ="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handdleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button 
                        type="submit" 
                        fullWidth 
                        variant="contained" 
                        color="primary" 
                        className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>

                    <GoogleLogin 
                        render={(renderProps) => (
                        <Button 
                            className={classes.googleButton} 
                            color='primary' 
                            fullWidth 
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon=<Icon />
                            variant='contained'
                        >
                            Google Sign In
                        </Button>)}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>{
                                isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"
                                }</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth  