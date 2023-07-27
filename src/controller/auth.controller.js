import { validationResult } from "express-validator"
import userModel from "../models/user.model.js";
import { generateHash, verifyHash } from "../servises/hash.service.js";
import { generateJwt } from "../servises/jwt.service.js";

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        const { email, name, password, image } = req.body
        if (!errors.isEmpty()) {
            return res.status(403).json({ msg: "Registration failed", info: errors.errors })
        }

        const condidate = await userModel.findOne({ email: email })

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

        const { passwordHash, ...userData } = user._doc

        return res.status(200).json({
            msg: "User registration success", data: {
                userData: userData,
                token: token
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Registration failed", info: "Internal server error" })
    }
}

export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){ 
            return res.status(403).json({ msg: "Auth failed", info: errors.errors })
        }
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: "Auth failed", info: "User not found" })
        }
        console.log(password);
        const isValid = await verifyHash(user.passwordHash, password);
        if (!isValid) {
            return res.status(404).json({
                msg: "Auth failed", info: "Password or email incorrect"
            });
        }

        const token = generateJwt(user._id)
        const { passwordHash, ...userData } = user._doc

        return res.status(201).json({
            msg: "User auth success", 
            data: {
                userData: userData,
                token: token
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Login failed", info: "Internal server error" })
    }

}


export const getMe = async (req,res) => {
    try {
        const id = req.userId;
        const user= await userModel.findById(id);
        if (!user) {
            return res.status(404).json({msg: "User not found", info:"No such user was found in the database"})
        }

        const { passwordHash, ...userData } = user._doc

        return res.status(201).json({
            msg: "User found", 
            data: {
                userData: userData
            }
        })
    } catch (error) {
       console.log(error); 
    }
}

