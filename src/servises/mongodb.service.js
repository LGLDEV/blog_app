import mongoose from 'mongoose';


export const connection = async (url) => {
    try {
        await mongoose.set('strictQuery', false);
        await mongoose.connect(url, (err) => {
            if (err) {
                console.error(err);
            }

            console.log('> Mongodb connected');
        })
    } catch (error) {
        console.error(error);
    }

}