import mongoose, {Schema, Types, model} from "mongoose";

const ManagerSchema = new Schema({
    userName:{
        type: String,
        min: 4,
        max: 20,
        required: true
    },
     email : {
        type: String,
        required: true,
        unique: true
    },
    salonId : {
        type: Types.ObjectId,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    phone : {
        type: String,
        required: true,
    },
    address : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true
    },
    confirmEmail:{
        type: Boolean,
        default: false
    },
    role: {
        type : String,
        default: 'Manager',
    },
    sendCode:{
        type: String,
        default: null
    },
    loginAttempts: {
        type: Number,
        default: 0 
    },

},
{ 
    timestamps : true 
})



const ManagerModel = mongoose.model.Manager || model('Manager', ManagerSchema)
export default ManagerModel