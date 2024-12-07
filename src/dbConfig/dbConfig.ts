import mongoose from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Mong db connected successfully");
            
        })
        connection.on('error', (err) => {
            console.log("Mong db connected successfully" +err);
            process.exit()
            
        })
    } catch (error) {
        console.log("Something wrong in db config file");
        console.log(error);
        
    }
}