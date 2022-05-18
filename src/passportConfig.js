import passport from "passport";
import local from 'passport-local'
import {Strategy, ExtractJwt}from 'passport-jwt';

import User from './services/user.js';
import { compareHash } from './helpers/bcrypt.js';
import {signToken} from "./helpers/jwt.js";
import config from './config.js';

// PASSPORT-LOCAL
const LocalStrategy = local.Strategy;

const UserDB = new User();

const passportInitialize = () => {
    passport.use('register', new LocalStrategy({passReqToCallback: true, usernameField: 'email',session: false}, async (req,email,password,done)=>{
        try{
            const {firstName, lastName, email, password } = req.body;
            if(!firstName || !lastName || !email || !password) return done(null,false,{status: 'Error', messsage: 'Datos insuficientes para crear un usuario.'});

            const userExist = await UserDB.getUserByEmail(email);
            if(userExist.status !== 'Error') return done(null,false,{status: 'Error', message: 'El usuario que intenta registrar ya existe en la base de datos.'});

            const token = await signToken({uid: userExist.payload._id});
            if(!token) return done(null, false, {status: 'Error', message: 'Hubo un problema al generar el token, por favor, vuelva a internarlo.'});

            const body = {
                body: req.body,
                token
            }

            return done(null, body);
        } catch (error) {
            done(error);
        }
    }));

    passport.use('login', new LocalStrategy({usernameField: 'email',session: false}, async (email,password,done)=>{
        try{
            if(!email || !password) return done(null,false,{status:'Error',message:'Se debe ingresar un email y contraseña.'});

            const userExist = await UserDB.getUserByEmail(email);
            if(userExist.status !== 'Success') return done(null,false,{status: 'Error', message: 'El usuario no existe en la base de datos.'});

            const isValidPass = await compareHash(password,userExist.payload.password);
            if(!isValidPass) return done(null,false,{status: 'Error', message: 'La contraseña no coincide con la registrada por el usuario.'});

            const token = await signToken({uid: userExist.payload._id});
            if(!token) return done(null, false, {status: 'Error', message: 'Hubo un problema al generar el token, por favor, vuelva a internarlo.'});

            const user = {
                firstName: userExist.payload.firstName,
                lastName: userExist.payload.lastName,
                fullName: `${userExist.payload.firstName} ${userExist.payload.lastName}`,
                email: email,
                role: userExist.payload.role,
                token
            };

            return done(null,user);
        } catch (error) {
            done(error);
        }
    }));

    passport.use('jwt', new Strategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: config.jwt.secret,
        passReqToCallback: true
    },async (req,jwt_payload, done)=> {
        try{
            const userExist = await UserDB.getById(jwt_payload.uid);
            if(userExist.status !== 'Success') return done(null,false,{status: 'Error', message: 'El usuario no existe en la base de datos.'});
            if(!userExist.payload.isActive) return done(null,false,{status: 'Error', message: 'Este usuario está inactivo.'});

            const currentUser = {
                firstName: userExist.payload.firstName,
                lastName: userExist.payload.lastName,
                fullName: `${userExist.payload.firstName} ${userExist.payload.lastName}`,
                email: userExist.payload.email,
                role: userExist.payload.role
            }

            done(null, currentUser);
        } catch (error) {
            done(error);
        }
    }) )

    passport.use('protected', new Strategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: config.jwt.secret
    },async (jwt_payload, done)=> {
        try{
            const userExist = await UserDB.getById(jwt_payload.uid);
            if(userExist.status !== 'Success') return done(null,false,{status: 'Error', message: 'El usuario no existe en la base de datos.'});
            if(!userExist.payload.isActive) return done(null,false,{status: 'Error', message: 'Este usuario está inactivo.'});
            if(userExist.payload.role !== 'Admin') return done(null,false,{status: 'Error', message: 'Debe ser un administrador para manipular esta ruta.'});

            done(null, true);
        } catch (error) {
            done(error);
        }
    }) )
}

export default passportInitialize;