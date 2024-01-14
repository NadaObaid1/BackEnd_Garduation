import mongoose, {Schema, model, Types} from 'mongoose'

const productschema = new Schema({
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
    stock: { // الكمية الموجودة
        type: Number,
        default:1
    },
    price:{
        type: Number,
        required: true
    },
    discount: {
        type : Number,
        default:0
    },
    finalPrice:{
        type : Number
    },
    number_sellers: {
        type: Number,
        default:0
    },
    image: {
        type:Object,
        required:true
    },
    rate: {
        type: Number
    },
    status: {
        type:String,
        default: 'Active',
        enum: ['Active', 'Inactive']
    },
    subProducts:{
        type:String,
        required: true,
        default: 'Body',
        enum: ['Body', 'Face']
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    SalonId:{type: Types.ObjectId, ref: 'Salon', required: true},
    createdBy:{type: Types.ObjectId, ref: 'User'},
    updatedBy: {type: Types.ObjectId, ref: 'User'},
    })    
    const productModel = mongoose.models.Product || model('Product', productschema)
    export default productModel;
