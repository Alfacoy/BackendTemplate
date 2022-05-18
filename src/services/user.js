import Crud from "./crud.js";
import userSchema from "../models/user.js";

export default class User extends Crud{
    constructor() {
        super('Users', userSchema);
    }

    async getUserByEmail(email) {
        try {
            const res = await this.DB.findOne({email: email});
            if(!res) return {status: 'Error', message: 'No existe el usuario en la base de datos.'}
            return {status: 'Success', payload: res}
        } catch (error) {
            return {status: 'Error', message: error};
        }
    }
}
