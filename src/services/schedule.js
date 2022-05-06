import Crud from "./crud.js";
import scheduleSchema from "../models/schedule.js";

export default class Schedule extends Crud {
    constructor() {
        super('Schedule',scheduleSchema);
    }
}