import dotenv from 'dotenv';
dotenv.config();

const config = {
    server: {
        port: process.env.PORT || 8080
    },
    mongo: {
        connect: ''
    }
}

export default config;