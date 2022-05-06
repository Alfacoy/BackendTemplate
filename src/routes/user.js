import { Router } from 'express';
import {createUser, getUsers} from "../controllers/user.js";

const APIAuth= new Router();

APIAuth.get('/', getUsers);
APIAuth.post('/', createUser);


export default APIAuth;