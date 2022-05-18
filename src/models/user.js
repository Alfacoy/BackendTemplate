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
        },
        role: {
            type: String,
            enum: {
                values: ['Admin','User'],
                message: 'El rol {VALUE} no es válido.'
            },
            default: 'User'
        }
    },
    {
        timestamps: true
    })

export default userSchema;
