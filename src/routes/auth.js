import { Router } from 'express';
import {createUser, getUsers, loginUser, currentUser} from "../controllers/auth.js";
import middlewarePassportCall from "../middlewares/passport.js";

const APIAuth= new Router();

APIAuth.get('/', middlewarePassportCall('protected'), getUsers);
APIAuth.post('/login', middlewarePassportCall('login'), loginUser);
APIAuth.post('/register', middlewarePassportCall('register'), createUser);
APIAuth.post('/currentUser', middlewarePassportCall('jwt'), currentUser);

export default APIAuth;