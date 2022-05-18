import mongoose from "mongoose";
import config from "../config.js";

try{
    mongoose.connect(config.mongo.connect).then(() => console.log(`La base de datos se conecto correctamente.`));
} catch (error) {
    console.log(`Error al tratar de conectar la base de datos Mongo: ${error}`);
}

export default class Crud {
    constructor(collection, schema) {
        this.DB = mongoose.model(collection, schema);
    }

    async save(data) {
        try {
            const {_id} = await this.DB.create(data);
            return {status: 'Success', payload: _id};
        } catch (error) {
            return {status: 'Error', message: error};
        }
    }

    async getAll(filter) {
        try {
            const res = await this.DB.find(filter);
            if (res.length === 0) return {status: 'Error', message: 'No hay un registro con los datos suministrados.'}
            return {status: 'Success', q: res.length, payload: res}
        } catch (error) {
            return {status: 'Error', message: error};
        }
    }

    async getById(id) {
        try {
            const res = await this.DB.find({_id: id});
            if (res.length === 0) return {status: 'Error', message: 'No existe el registro solicitado.'}
            return {status: 'Success', payload: res[0]}
        } catch (error) {
            return {status: 'Error', message: error};
        }
    }

    async update(filter, data) {
        try {
            const res = await this.DB.updateOne(filter, data);
            if (res.matchedCount === 0) return {
                status: 'Error',
                message: 'No hay un registro que coincida con el ID proporcionado.'
            }
            return {status: 'Success', message: 'Registro actualizado correctamente.'}
        } catch (error) {
            return {status: 'Error', message: error};
        }
    }

    //TESTEAR LOS DELETE
    async deleteAll() {
        try {
            await this.DB.deleteMany();
            return {status: 'Success', message: 'Los registros fueron eliminados correctamente.'}
        } catch (error) {
            return {status: 'Error', message: error};
        }
    }

    async delete(filter) {
        try {
            const res = await this.DB.deleteOne(filter);
            if (res.deletedCount === 0) return {
                status: 'Error',
                message: 'No hay un registro que coincida con el ID proporcionado.'
            }
            return {status: 'Success', message: 'Registro eliminado correctamente.'}
        } catch (error) {
            return {status: 'Error', message: error};
        }
    }
}