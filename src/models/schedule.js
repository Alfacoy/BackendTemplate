import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    date: {
        day: {
            type: String,
            required: true
        },
        month: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        hours: {
            type: String,
            required: true
        },
        minutes: {
            type: String,
            required: true
        }
    },
    owner: {
        name: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        payment: {
            type: String
        }
    },
    reserved: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default scheduleSchema;