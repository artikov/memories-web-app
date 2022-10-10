import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useGoogleLogin } from '@react-oauth/google';

import Icon from './icon'
import Input from './Input'

import useStyles from './styles'

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)

    const handleSubmit = () => {

    }

    const handleChange = () => {

    }
    
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        handleShowPassword(false)
    }

    const googleSuccess = (res) => {
        console.log(res)
    }
    const googleFailure = (error) => {
        console.log(error)
        console.log("Google sign in was unsuccessful. Try again later...")
    }

    const login = useGoogleLogin({
        onSuccess: googleSuccess,
        onError: googleFailure
    })

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
                                    <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name ="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name ="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handdleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{
                        isSignup ? "Sign Up" : "Sign In"
                    }</Button>
                    <Button 
                        className={classes.googleButton} 
                        color='primary' 
                        fullWidth 
                        onClick={() => login()}
                        startIcon=<Icon />
                        variant='contained'
                    >
                        Google Sign In
                    </Button>
                    {/* <GoogleLogin 
                        // clientId={GOOGLE_ID}
                        // render={(renderProps)=>(
                        //     <Button 
                        //         className={classes.googleButton} 
                        //         color='primary' 
                        //         fullWidth 
                        //         onClick={renderProps.onClick}
                        //         disabled={renderProps.disabled}
                        //         startIcon=<Icon />
                        //         variant='contained'
                        //     >
                        //         Google Sign In
                        //     </Button>
                        // )}
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                        // cookiePolicy="single_host_origin"
                    /> */}
                    <Grid container justify="flex0end">
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