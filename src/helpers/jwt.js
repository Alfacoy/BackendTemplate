import jwt from 'jsonwebtoken';
import config from '../config.js';

const signToken = async (uid) => {
    try{
        const sign = await jwt.sign(uid,config.jwt.secret)
        return sign;
    }catch (error){
        return false;
    }
}

const verifyToken = async (token) => {
    try {
        const verify = await jwt.verify(token, config.jwt.secret);
        return verify;
    } catch (error) {
        return false;
    }
}

export {
    signToken,
    verifyToken
}