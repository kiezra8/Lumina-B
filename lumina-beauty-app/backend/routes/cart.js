import express from 'express';

const router = express.Router();

// Simple cart routes (in-memory for now, can be moved to database later)
let carts = {};

// Get cart
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const cart = carts[userId] || [];
    res.json(cart);
});

// Add to cart
router.post('/:userId', (req, res) => {
    const { userId } = req.params;
    const item = req.body;

    if (!carts[userId]) {
        carts[userId] = [];
    }

    const existingItemIndex = carts[userId].findIndex(i => i.id === item.id);

    if (existingItemIndex > -1) {
        carts[userId][existingItemIndex].quantity += item.quantity || 1;
    } else {
        carts[userId].push({ ...item, quantity: item.quantity || 1 });
    }

    res.json(carts[userId]);
});

// Update cart item quantity
router.patch('/:userId/:itemId', (req, res) => {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;

    if (!carts[userId]) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    const itemIndex = carts[userId].findIndex(i => i.id === itemId);

    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found in cart' });
    }

    if (quantity <= 0) {
        carts[userId].splice(itemIndex, 1);
    } else {
        carts[userId][itemIndex].quantity = quantity;
    }

    res.json(carts[userId]);
});

// Remove from cart
router.delete('/:userId/:itemId', (req, res) => {
    const { userId, itemId } = req.params;

    if (!carts[userId]) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    carts[userId] = carts[userId].filter(i => i.id !== itemId);
    res.json(carts[userId]);
});

// Clear cart
router.delete('/:userId', (req, res) => {
    const { userId } = req.params;
    carts[userId] = [];
    res.json({ message: 'Cart cleared' });
});

export default router;
