import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

const SECRET = process.env.JWT_SECRET || 'test'

export const signin = async (req, res) => {
    const {email, password} = req.body

    try {
        const existingUser = await User.findOne({email})

        if(!existingUser) return res.status(404).json({message: "User doesn't exist..."})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid Password..."})

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, SECRET, {expiresIn: "1h"})

        res.status(200).json({result: existingUser, token})

    } catch (error){
        res.status(500).json({message: "Something is wrong", error})
    }
}


export const signup = async (req, res) => {

    const {email, password, firstName, lastName, confirmPassword} = req.body

    try {
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({message: "User already exists..."})
        
        if(password != confirmPassword) return res.status(400).json({message: "Passwords do not match..."})

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})

        const token = jwt.sign({email: result.email, id: result._id}, SECRET, {expiresIn: "1h"})

        res.status(200).json({result: result, token})

    } catch (error) {
        res.status(500).json({message: "Something is wrong", error})
    }

}