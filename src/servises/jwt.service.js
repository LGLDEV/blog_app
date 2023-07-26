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