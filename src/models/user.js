import mongoose from 'mongoose';

const userSchema = new mongoose.Schema( {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
},
    {
        timestamps: true
    })

export default userSchema;
