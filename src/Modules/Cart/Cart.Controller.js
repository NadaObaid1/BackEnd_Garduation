import cartModel from '../../../DB/Model/Cart.Model.js'

export const CreateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartModel.findOne({ userId: req.user._id }).populate('products.productId', 'name image');

        if (!cart) {
            const newCart = await cartModel.create({
                userId: req.user._id,
                products: [{ productId, quantity }]
            });

            //return res.status(201).json({ message: "success", newCart });
        }

        let matchedProduct = false;

        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].productId == productId) {
                cart.products[i].quantity = quantity;
                matchedProduct = true;
                break;
            }
        }

        if (!matchedProduct) {
            cart.products.push({ productId, quantity });
        }

        await cart.save();

        // Populate product details again for the response
        const populatedCart = await cartModel.findOne({ userId: req.user._id }).populate('products.productId', 'name image');

        return res.status(201).json({ message: "success", cart: populatedCart });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const removeItem = async(req, res)=>{
    const {productId} = req.body;
    await cartModel.updateOne({userId:req.user._id},{
    $pull: {
        products : {
            productId
        }
    }
})
return res.status(200).json({message:"success"});
}

export const clearCart = async(req, res)=>{
    const clearCart = await cartModel.updateOne({userId:req.user._id},
    {products : [ ]},
    )
    return res.status(200) .json({message:"success"});
}


export const getCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ userId: req.user._id }).populate('products.productId', 'name image');

        return res.status(200).json({ message: "success", cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


