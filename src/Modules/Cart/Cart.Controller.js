import cartModel from '../../../DB/Model/Cart.Model.js'
import productModel from '../../../DB/Model/Product.model.js';

export const CreateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartModel.findOne({ userId: req.user._id }).populate({
      path: 'products.productId',
      select: 'name image finalPrice stock',
    });
    const product = await productModel.findById(productId);

    if (!cart) {
      if (product.stock > 0) {
        const newCart = await cartModel.create({
          userId: req.user._id,
          products: [{ productId, quantity }]
        });
        await productModel.findByIdAndUpdate(productId, { stock: product.stock - 1 });
        return res.status(201).json({ message: "success", cart: newCart });
      } else {
        return res.status(400).json({ message: "Product out of stock" });
      }
    }

    let matchedProduct = false;

    for (let i = 0; i < cart.products.length; i++) {
      if (cart.products[i].productId._id.equals(productId)) {
        cart.products[i].quantity = quantity;
        matchedProduct = true;
        break;
      }
    }

    if (!matchedProduct && product.stock > 0) {
      await productModel.findByIdAndUpdate(productId, { stock: product.stock - 1 });
      cart.products.push({ productId, quantity });
    } else if (!matchedProduct) {
      return res.status(400).json({ message: "Product out of stock" });
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

export const calculateTotalPrice = async (req, res) => {
  try {
      const cart = await cartModel.findOne({ userId: req.user._id }).populate('products.productId', 'finalPrice');

      if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
      }
      const cartWithTotalPrice = cart.products.map(cartItem => {
          const product = cartItem.productId;
          const totalPrice = cartItem.quantity * product.finalPrice;
          return {
              ...cartItem.toObject(),
              totalPrice
          };
      });
      const totalCartPrice = cartWithTotalPrice.reduce((total, item) => total + item.totalPrice, 0);
      return res.status(200).json({ message: "success", cart: cartWithTotalPrice, totalCartPrice });
  } catch (error) {
      console.error('Error fetching cart:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};


export const increaseQuantity = async (req, res) => {
  try {
    const { productId } = req.body;
    const userCart = await cartModel.findOne({ userId: req.user._id }).populate({path: 'products.productId', select: 'stock'});
    const productIndex = userCart.products.findIndex(product => product.productId.equals(productId));

    if (productIndex !== -1) {
      if (userCart.products[productIndex].quantity !== undefined) {
        if (userCart.products[productIndex].productId.stock > 0) {
          const updatedQuantity = userCart.products[productIndex].quantity + 1;
          userCart.products[productIndex].quantity = updatedQuantity;
          await userCart.save();

          const product = userCart.products[productIndex].productId;
          product.stock -= 1;
          await product.save();

          if (userCart.products.length === 0) {
            return res.status(201).json({ message: "Cart is empty now." });
          }
          return res.status(200).json({ message: "Success", cart: userCart });

        } else {
          return res.status(401).json({ error: "The product is not available" });
        }
      } else {
        return res.status(500).json({ error: "Product not found" });
      }
    } else {
      return res.status(404).json({ error: "Product not found in the cart" });
    }
  } catch (error) {
    return res.status(501).json({ error: "Internal Server Error" });
  }
};


export const decreaseQuantity = async (req, res) => {
  try {
    const { productId } = req.body;
    const userCart = await cartModel.findOne({ userId: req.user._id }).populate({path: 'products.productId', select: 'stock'});
    const productIndex = userCart.products.findIndex(product => product.productId.equals(productId));

    if (productIndex !== -1) {
      const cartProduct = userCart.products[productIndex];

      cartProduct.quantity -= 1;

      const productIds = userCart.products.map(product => product.productId);
      const products = await productModel.find({ _id: { $in: productIds } });

      const product = products.find(product => product._id.equals(productId));

      if (product) {
        product.stock += 1;
        await Promise.all([product.save(), userCart.save()]);

        if (cartProduct.quantity === 0) {
          userCart.products.splice(productIndex, 1);
          await userCart.save();
        }
        return res.status(200).json({ message: "Success", cart: userCart });
      } else {
        return res.status(404).json({ error: "Product not found" });
      }
    } else {
      return res.status(404).json({ error: "Product not found in the cart" });
    }
  } catch (error) {
    console.error('Error decreasing quantity:', error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
