import jwt from 'jsonwebtoken';


export const generateJwt = (id) => {
    const token = jwt.sign(
        {
            id:id
        },
        process.env.SECRET,
        {
            expiresIn: '1d'
        }
    )
    return token
}

export const verifyJWT = (token) => {
    try {
        const decoded = 0
        return decoded
    } catch (error) {
        console.log(error);
    }
}