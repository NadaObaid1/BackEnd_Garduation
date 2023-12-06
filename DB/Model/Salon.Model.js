import mongoose, { Schema, model } from "mongoose";

const SalonSchema = new Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: true
    },
    branches: {
        type: String,
        required: true
    },
    
    image: {
        type: Object,
        
    },
},
{
    timestamps: true
});

const SalonModel = model('Salon', SalonSchema, 'salons');

export default SalonModel;
