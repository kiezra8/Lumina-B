import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('service')
            .populate('provider')
            .populate('user', '-password');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single booking
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('service')
            .populate('provider')
            .populate('user', '-password');
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create booking
router.post('/', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        const populatedBooking = await Booking.findById(booking._id)
            .populate('service')
            .populate('provider');
        res.status(201).json(populatedBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('service').populate('provider');

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete booking
router.delete('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
