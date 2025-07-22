import CartItem from '../modal/cart.model.js'

// Fetch all cart items for a user
export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log("user",userId);
    
    
    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const cartItems = await CartItem.find({ userId });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Error fetching cart items' });
  }
};

// Add an item to the cart
export const addCartItem = async (req, res) => {
  try {
    const { userId, id, volumeInfo, saleInfo,accessInfo } = req.body;

    // Validate request body
    if (!userId || !id || !volumeInfo || !saleInfo || !accessInfo) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if item already exists in the cart
    const existingItem = await CartItem.findOne({ userId, id });
    if (existingItem) {
      return res.status(400).json({ message: 'Item already in cart' });
    }

    const cartItem = new CartItem({
      userId,
      id,
      volumeInfo,
      saleInfo,
      accessInfo,
    });

    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Error adding item to cart' });
  }
};

// Remove an item from the cart
export const removeCartItem = async (req, res) => {
  try {
    const { userId, id } = req.params;

    if (!userId || !id) {
      return res.status(400).json({ message: 'User ID and Item ID are required' });
    }

    const deletedItem = await CartItem.findOneAndDelete({ userId, _id: id });

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Error removing item from cart' });
  }
};


// Update a cart item (e.g., change quantity or other fields)
export const updateCartItem = async (req, res) => {
  try {
    const { userId, id } = req.params;
    const updates = req.body;

    if (!userId || !id) {
      return res.status(400).json({ message: 'User ID and Item ID are required' });
    }

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No update data provided' });
    }

    const updatedItem = await CartItem.findOneAndUpdate(
      { userId, _id: id },
      updates,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Error updating cart item' });
  }
};
