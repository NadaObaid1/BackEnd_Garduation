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
});

const SalonModel = model('Salon', SalonSchema, 'salons');

export default SalonModel;
