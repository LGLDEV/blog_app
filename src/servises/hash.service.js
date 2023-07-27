import bcrypt from 'bcrypt'

export const generateHash = async (password) => {
    return await bcrypt.hash(password, 10)
}

export const verifyHash = async (hash, password) => {
    console.log(hash, password);
    return await bcrypt.compare(password, hash)
}