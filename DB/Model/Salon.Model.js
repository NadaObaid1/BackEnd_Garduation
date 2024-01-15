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
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
})

    SalonSchema.virtual('Product', { //زي كنه حقل وهمي
    localField:'_id', //مفتاح اساسي
    foreignField: 'ProductId', // المفتاح الاجنبي
    ref: 'Product' //جبتها من اسم المودل الي موجودة بال Product model
})

    SalonSchema.virtual('Post', { 
    localField:'_id', 
    foreignField: 'PostId', 
    ref: 'Post' 
})

SalonSchema.virtual('Job', { 
    localField:'_id', 
    foreignField: 'JobId', 
    ref: 'Job' 
})

;

const SalonModel = model('Salon', SalonSchema, 'salons');

export default SalonModel;
