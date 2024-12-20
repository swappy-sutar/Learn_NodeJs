import mongoose from "mongoose";

const DBconnection = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('🤝 DB Connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export { DBconnection };