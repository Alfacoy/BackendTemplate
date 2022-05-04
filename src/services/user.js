import Crud from "./crud.js";
import userSchema from "../models/user.js";

export default class User extends Crud{
    constructor() {
        super('Users', userSchema);
    }
}
