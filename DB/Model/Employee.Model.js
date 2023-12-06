import mongoose, { Schema, model } from "mongoose";

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
},
{
    timestamps: true
});

const EmployeeModel = model('Employee', EmployeeSchema, 'employees');

export default EmployeeModel;
