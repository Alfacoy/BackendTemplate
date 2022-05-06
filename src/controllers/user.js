import { request, response } from "express";
import { hashingPass,compareHash } from "../helpers/bcrypt.js";
import User from '../services/user.js'

const UserDB = new User();

const createUser = async (req = request, res = response) => {
    const {firstName, lastName, email, password } = req.body;
    if(!firstName || !lastName || !email || !password) return res.status(400).send({status: 'Error', messsage: 'Datos insuficientes para crear un usuario.'});
    const obj = {
        firstName,
        lastName,
        email,
        password: await hashingPass(password)
    };
    UserDB.save(obj)
        .then(data => res.status(200).send(data))
        .catch(error => res.status(500).send(error));
}

const getUsers = (req = request, res = response) => {
    UserDB.getAll()
        .then(data => res.status(200).send(data))
        .catch(error => res.status(500).send(error));
}

export {
    createUser,
    getUsers
}