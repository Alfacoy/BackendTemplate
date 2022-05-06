import dotenv from 'dotenv';
dotenv.config();

const config = {
    server: {
        port: process.env.PORT || 8080
    },
    mongo: {
        connect: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.r7whn.mongodb.net/${process.env.MONGO_COLLECTION}`
    }
}

export default config;