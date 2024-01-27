import mongoose, {Schema, model, Types} from 'mongoose'

const FavoriteSchema = new Schema({
userId: {
type: Types.ObjectId,
ref: 'User',
required: true,
unique: true 
},
products : [{
productId: {type: Types. ObjectId, ref: 'Product', required: true}, //من خلالها بجيب اي معلومات عن البرودكت
}],
},
{
    timestamps: true,
}
)

const FavoriteModel = mongoose.models.Favorite || model('Favorite', FavoriteSchema);
export default FavoriteModel;
