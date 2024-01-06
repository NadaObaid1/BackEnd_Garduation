import cartModel from '../../../DB/Model/Cart.Model.js'

export const CreateCart = async(req,res)=>{
    try{
    const {productId, quantity} = req.body;
    const cart = await cartModel.findOne({userId:req.user._id});
    if(!cart){
        const newCart = await cartModel.create({
        userId:req.user._id,
        products: {productId, quantity}
        })
        return res.status(201).json({message:"sucess", newCart});
    }
    let matchedProducut = false
    for(let i=0; i<cart.products.length; i++){ //عشان اعدل ع الكمية بالسلة
        if(cart.products[i].productId == productId) { 
            cart.products[i].quantity = quantity;
            matchedProducut = true
            break;
    }}
    if(!matchedProducut) {
        cart.products.push({productId,quantity});
    }
    await cart.save()
    return res.status(201).json({message:"success", cart});
}catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
}
}

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


export const getCart = async(req,res)=>{
    const cart = await cartModel.findOne({userId:req.user._id});// ون لانه فش الا سلة وحدة لكل يوزر وبترجعها مباشرة مش جوا اري
    return res.status(200).json({message: "success", cart: cart});
}

