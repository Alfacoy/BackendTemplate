import { request, response } from "express";
import { hashingPass, compareHash } from "../helpers/bcrypt.js";
import User from '../services/user.js'

const UserDB = new User();

const createUser = async (req = request, res = response) => {
    const {firstName, lastName, email, password } = req.user;
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

const loginUser = (req = request, res = response) => {
    res.status(200).send({status: 'Success', payload: req.user})
}

const getUsers = (req = request, res = response) => {
    UserDB.getAll()
        .then(data => res.status(200).send(data))
        .catch(error => res.status(500).send(error));
}

const currentUser = (req = request, res = response) => {
    res.status(200).send({status: 'Success', payload: req.user});
}

export {
    createUser,
    loginUser,
    getUsers,
    currentUser
}
