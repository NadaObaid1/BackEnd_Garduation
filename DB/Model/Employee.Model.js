import mongoose, { Schema, model, Types } from "mongoose";

const EmployeeSchema = new Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    experienceYears: {
        type: Number,
        required: true
    },
    image: {
        type: Object,
        
    },

    SalonId:{type: Types.ObjectId, ref: 'Salon', required: true},
    createdBy:{type: Types.ObjectId, ref: 'User'},
    updatedBy: {type: Types.ObjectId, ref: 'User'},
},
{
    timestamps: true
});

const EmployeeModel = model('Employee', EmployeeSchema, 'employees');

export default EmployeeModel;
