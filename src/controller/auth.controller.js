import { validationResult } from "express-validator"
import userModel from "../models/user.model.js";
import { generateHash } from "../servises/hash.service.js";
import { generateJwt } from "../servises/jwt.service.js";

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        const { email, name, password, image } = req.body
        if (!errors.isEmpty()) {
            return res.status(403).json({ msg: "Registration failed", info: errors.errors })
        }

        const condidate = await userModel.findOne({email: email})

        if (condidate) {
            return res.status(403).json({ msg: "Registration failed", info: "This email address has already been registered" })
        }

        const hash = await generateHash(password)

        const doc = new userModel({
            email: email,
            name: name,
            passwordHash: hash,
            image: image
        })

        const user = await doc.save()
        const token = generateJwt(user._id)

        const {passwordHash, ...userData} = user._doc

        return res.status(200).json({ msg: "User registration success", data: {
            userData: userData,
            token: token
        }})
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: "Registration failed", info: "Internal server error"})
    }
}

export const login = (req, res) => {

}

export const logout = (req, res) => {

}