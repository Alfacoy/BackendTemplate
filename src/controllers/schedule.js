import { request,response } from "express";
import Schedule from '../services/schedule.js';

const ScheduleDB = new Schedule();

const getSchedule = (req = request, res = response) => {
    ScheduleDB.getAll()
        .then(data => res.status(200).send(data))
        .catch(error => res.status(500).send(error));
}

const addNewSchedule = (req = request, res = response) => {
    const { day,month,year,hours,minutes } = req.body;
    if(!day || !month || !year || !hours || !minutes) return res.status(400).send({status: 'Error', message: 'Es necesario el día, mes, año, horas y minutos para crear un turno.'})
    const obj = {
        date: {
            day,
            month,
            year,
            hours,
            minutes
        }
    };
    ScheduleDB.save(obj)
        .then(data => res.send(data))
        .catch(error => res.send(error));
}

const reserveSchedule = (req = request, res = response ) => {
    const { name, email, phone, payment } = req.body;
    const { sid } = req.params;
    if(!name || !email || !phone || !sid) return res.status(400).send({status: 'Error', message: 'Se debe agregar un nombre, email, teléfono, método de pago y turno para reservar.'})
    const obj = {
        owner: {
            name,
            email,
            phone,
            payment
        },
        reserved: true
    };
    ScheduleDB.update({_id: sid},obj)
        .then(data => res.status(200).send(data))
        .catch(error => res.status(500).send(error));
}

export {
    getSchedule,
    addNewSchedule,
    reserveSchedule
}