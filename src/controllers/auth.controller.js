import Auth from '../models/auth.model.js'
import { createAccessToken } from '../libs/jwt.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    const { email, password } = req.body

    try {

        const authFound = await Auth.findOne({ email })
        if (authFound)
            return res.status(400).json({ message: "The Email is registered"})
        
        const passHash = await bcrypt.hash(password, 10)

        const newAuth = new Auth({
            email, 
            password: passHash
        })

        const authSaved = await newAuth.save()

        const token = await createAccessToken ({id: authSaved._id})
        res.cookie("token", token)
        res.json({
            id: authSaved._id,
            email: authSaved.email,
            createdAt: authSaved.createdAt,
            updatedAt: authSaved.updatedAt
        })

    } catch (error) {
        console.log(error)
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {

        const userFound = await Auth.findOne({ email })
        if (!userFound) return res.status(400).json({messagge: "Email not fount"})

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json({message: "Incorrect Password"})
        
        const token = await createAccessToken ({id: userFound._id})
        res.cookie("token", token)
        res.json({
            id: userFound._id,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })

    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await Auth.findById(req.user.id)

    if (!userFound) return res.status(400).json({message: "User not found"})

    return res.json({
        id: userFound._id,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}