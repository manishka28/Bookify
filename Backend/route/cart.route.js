import express from 'express';
import bodyParser from 'body-parser'; // Import bodyParser correctly
import { addCartItem, removeCartItem, getCartItems, updateCartItem } from '../controller/cart.controller.js';
import { authMiddleware } from '../middleware/auth.middlewar.js';
const router = express.Router();

// Middleware to parse JSON and URL-encoded bodies
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Add item to cart
router.post('/',authMiddleware, addCartItem); // Correct route for adding item

// Remove item from cart
router.delete('/:userId/:id', authMiddleware,removeCartItem); // Correct route for removing item

// Get all items from cart for a specific user
router.get('/:userId', authMiddleware,getCartItems); // Correct route for getting items

// Update a cart item
router.put('/:userId/:id', authMiddleware,updateCartItem); // Correct route for updating item

export default router;
