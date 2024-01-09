import FavoriteModel from '../../../DB/Model/Favorite.Model.js'
import productModel from '../../../DB/Model/Product.model.js';


export const AddFavorite = async (req, res) => {
    try {
      const { productId } = req.body;
      let favorite = await FavoriteModel.findOne({ userId: req.user._id });
  
      if (!favorite) {
        favorite = await FavoriteModel.create({
          userId: req.user._id,
          products: [{ productId }],
        });
        await productModel.findByIdAndUpdate(productId, { $inc: { favoriteCount: 1 } });
  
        return res.status(201).json({ message: "success", favorite });
      }
      const isProductInFavorites = favorite.products.some((product) => product.productId.equals(productId));
  
      if (!isProductInFavorites) {
        favorite.products.push({ productId });
        await productModel.findByIdAndUpdate(productId, { $inc: { favoriteCount: 1 } });
  
        await favorite.save();
        return res.status(201).json({ message: "success", favorite });
      } else {
        return res.status(400).json({ message: "Product already in favorites" });
      }
    } catch (error) {
      console.error('Error adding product to favorites:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

export const removeItem = async(req, res)=>{
    const {productId} = req.body;
    await FavoriteModel.updateOne({userId:req.user._id},{
    $pull: {
        products : {
            productId
        }
    }
})
return res.status(200).json({message:"success"});
}

export const getFavorite = async (req, res) => {
    try {
        const Favorite = await FavoriteModel.findOne({ userId: req.user._id }).populate('products.productId', 'name image finalPrice');

        return res.status(200).json({ message: "success", Favorite });
    } catch (error) {
        console.error('Error fetching Favorite:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const clearFavorite = async(req, res)=>{
    const clearFavorite = await FavoriteModel.updateOne({userId:req.user._id},
    {products : [ ]},
    )
    return res.status(200) .json({message:"success"});
}