import { Router } from "express";
import {getSchedule, addNewSchedule, reserveSchedule} from "../controllers/schedule.js";

const APISchedule = Router();

APISchedule.get('/', getSchedule);
APISchedule.post('/', addNewSchedule);
APISchedule.put('/:sid',reserveSchedule);

export default APISchedule;