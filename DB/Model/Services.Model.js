import mongoose, {Schema, Types, model} from "mongoose";

const ServicesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    finalPrice: {
        type: Number
    },
    discount: {
        type : Number,
        default:0
    },
    time: {
        type: Number,
        default: 60,
        required: true,
    },
    image: {
        type:Object,
        required:true
    },
    subServices:{
        type:String,
        required: true,
        default: 'Body',
        enum: ['Body', 'Face']
    },
    status: {
        type:String,
        default: 'Active',
        enum: ['Active', 'Inactive']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
    },
    {
        timestamps: true
    })

const ServicesModel = mongoose.models.Services || model('Services', ServicesSchema)
export default ServicesModel