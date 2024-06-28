import express from "express";
import { addProductToCart, increaseProductQuantity, decreaseProductQuantity, removeProductFromCart, fetchCart, clearCart, deleteCart, singleProductPayment, cartProductPayment, verifyPayment } from "../controllers/cart.controller.js";
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/addtocart', verifyToken, addProductToCart);
router.put('/increase', verifyToken, increaseProductQuantity);
router.put('/decrease', verifyToken, decreaseProductQuantity);
router.delete('/remove', verifyToken, removeProductFromCart);  
router.post('/fetch', verifyToken, fetchCart);
router.post('/clearCart', verifyToken, clearCart);
router.delete('/delete', verifyToken, deleteCart);

router.post('/payment', verifyToken, singleProductPayment);
router.post('/cartPayment', verifyToken, cartProductPayment);
router.post('/verifyPayment', verifyToken, verifyPayment);

export default router;