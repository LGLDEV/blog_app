import { verifyJWT } from "../servises/jwt.service.js";
import jwt from "jsonwebtoken"

export const authChecker = async (req,res,next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    
    if(token !== '') {
        try {
            const decode = jwt.verify(token, process.env.SECRET);
            req.userId = decode.id
            next()
        } catch (error) {
            console.log(error);
            return res.status(403).json({
                msg: "No access",
                info: "User un authorized"
            })
        }
    }else {
        return res.status(403).json({
            msg: "No access",
            info: "User un authorized"
        })
    }

}