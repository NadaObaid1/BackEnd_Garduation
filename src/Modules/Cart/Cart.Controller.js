import cartModel from '../../../DB/Model/Cart.Model.js'

export const CreateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartModel.findOne({ userId: req.user._id }).populate({
            path: 'products.productId',
            select: 'name image finalPrice stock',
        });

        if (!cart) {
            const newCart = await cartModel.create({
                userId: req.user._id,
                products: [{ productId, quantity}]
            })

            console.log("New Cart created:", newCart);
            return res.status(201).json({ message: "success", cart: newCart });
        }

        let matchedProduct = false;

        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].productId._id.equals(productId)) {
                cart.products[i].quantity = quantity;
                matchedProduct = true;
                break;
            }
        }

        if (!matchedProduct) {
            cart.products.push({ productId, quantity });
        }
        await cart.save();
        console.log("Cart updated:", cart);

        return res.status(201).json({ message: "success", cart });
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
        const cart = await cartModel.findOne({ userId: req.user._id }).populate('products.productId', 'name image finalPrice stock');

        return res.status(200).json({ message: "success", cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const increaseQuantity = async (req, res) => {
    try {
      const { productId } = req.body;
      console.log('Received productId:', productId);
      const userCart = await cartModel.findOne({ userId: req.user._id });
      console.log('ProductIds in cart:', userCart.products.map(product => product.productId));
      const productIndex = userCart.products.findIndex(product => product.productId.equals(productId));
      console.log('Product details:', productIndex);
  
      if (productIndex !== -1) {
        console.log('Product details:', userCart.products[productIndex]);
  
        if (userCart.products[productIndex].quantity !== undefined) {
          userCart.products[productIndex].quantity += 1;
  
          await userCart.save();
  
          return res.status(200).json({ message: "success", cart: userCart });
        } else {
          return res.status(500).json({ error: "Product in the cart has invalid structure" });
        }
      } else {
        return res.status(404).json({ error: "Product not found in the cart" });
      }
    } catch (error) {
      console.error('Error increasing quantity:', error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export const decreaseQuantity = async (req, res) => {
    try {
      const { productId } = req.body;
      console.log('Received productId:', productId);
      const userCart = await cartModel.findOne({ userId: req.user._id });
      console.log('ProductIds in cart:', userCart.products.map(product => product.productId));
      const productIndex = userCart.products.findIndex(product => product.productId.equals(productId));
      console.log('Product details:', productIndex);
  
      if (productIndex !== -1) {
        console.log('Product details:', userCart.products[productIndex]);
  
        if (userCart.products[productIndex].quantity > 0) {
          userCart.products[productIndex].quantity -= 1;
  
          await userCart.save();
  
          return res.status(200).json({ message: "success", cart: userCart });
        } else {
          return res.status(400).json({ error: "Product quantity cannot be negative" });
        }
      } else {
        return res.status(404).json({ error: "Product not found in the cart" });
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  