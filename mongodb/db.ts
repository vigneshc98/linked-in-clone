import mongoose from "mongoose";

const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster-new.exuc4yx.mongodb.net/dashboard?retryWrites=true&w=majority&appName=Cluster-new`

if(!connectionString){
    throw new Error('Please provide a valid connection string');
}

const connnectDB = async () => {
    if(mongoose.connection.readyState >= 1){
        return;
    }

    try {
        console.log('Connecting to MonogoDB');
        await mongoose.connect(connectionString);
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}

export default connnectDB;