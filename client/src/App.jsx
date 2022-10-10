import React from 'react'
import { Container} from '@material-ui/core'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'


const App = () => {
    const GOOGLE_ID = process.env.REACT_APP_CLIENT_ID
    return (
        <GoogleOAuthProvider clientId={GOOGLE_ID}>

        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/auth" exact element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>

        </GoogleOAuthProvider>
    )
}

export default App