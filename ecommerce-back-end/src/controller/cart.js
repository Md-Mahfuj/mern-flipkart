const Cart = require("../models/cart");

// exports.addItemToCart = (req, res) => {
//     // res.json({message:"cart"})
//     console.log( req.body.cartItems.product);
//     console.log( req.user._id);
//
//
//     Cart.find({user: req.user._id})
//         .exec((error, cart) => {
//             if (error) {
//                 return res.status(400).json({error});
//             }
//             if (cart) {
//
//                 //if cart already exists then update cart by quantity
//                 const product = req.body.cartItems.product;
//                 const item = cart.cartItems.find((c) => c.product === product);
//                 if (item) {
//                     Cart.findOneAndUpdate({"user": req.user._id, "cartItems.product": product}, {
//                         "$set": {
//                             "cartItems": {
//                                 ...req.body.cartItems,
//                                 quantity: item.quantity + req.body.cartItems.quantity
//                             }
//                         }
//                     }).exec((error, _cart) => {
//                         if (error) {
//                             return res.status(400).json({error});
//                         }
//                         if (_cart) {
//                             return res.status(201).json({cart: _cart});
//                         }
//                     });
//
//                 } else {
//                     Cart.findOneAndUpdate({user: req.user._id}, {
//                         "$push": {
//                             "cartItems": req.body.cartItems
//                         }
//                     }).exec((error, _cart) => {
//                         if (error) {
//                             return res.status(400).json({error});
//                         }
//                         if (_cart) {
//                             return res.status(201).json({cart: _cart});
//                         }
//                     });
//                 }
//
//
//                 // return  res.status(200).json({message:cart})
//
//             } else {
//
//                 // if cart not exist then create a nea cart
//                 const cart = new Cart({
//                     user: req.user._id,
//                     cartItems: [req.body.cartItems]
//
//                 });
//
//                 cart.save((error, cart) => {
//                     if (error) {
//                         return res.status(400).json({error});
//                     }
//                     if (cart) {
//                         return res.status(201).json({cart});
//                     }
//
//                 });
//
//             }
//         });
//
//
// };


exports.addItemToCart= async (req,res)=>{
    const { productId, quantity,  price } = req.body;
    const user= req.user._id;
    try{
        let cart = await Cart.findOne({ user});
        if(cart){
            let itemIndex = cart.cartItems.findIndex(p => p.productId === productId);
            // if (itemIndex) {
            //     Cart.findOneAndUpdate({"user": user, "cartItems.productId": productId}, {
            //         "$set": {
            //             "cartItems": {
            //                 ...req.body.cartItems,
            //                 quantity: itemIndex.quantity + req.body.cartItems.quantity
            //             }
            //         }
            //     })
            // }


            if (itemIndex > -1){
                let productItem = cart.cartItems[itemIndex];
                productItem.quantity = quantity;
                cart.cartItems[itemIndex] = productItem;
            } else {
                //product does not exists in cart, add new item
                cart.cartItems.push({ productId, quantity, price });
            }
            cart = await cart.save();
            return res.status(201).json(cart);

        }else {
            const newCart  = await Cart.create({
                user,
                cartItems: [{ productId, quantity, price }]
            });

            return res.status(201).json({newCart });

        }

    }catch (error){
        return res.status(500).send("Something went wrong");
    }

}






