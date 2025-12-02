import express from 'express';
import Provider from '../models/Provider.js';

const router = express.Router();

// Get all providers
router.get('/', async (req, res) => {
    try {
        const { specialty, limit } = req.query;
        let query = {};

        if (specialty && specialty !== 'All') {
            query.specialty = specialty;
        }

        let providersQuery = Provider.find(query);

        if (limit) {
            providersQuery = providersQuery.limit(parseInt(limit));
        }

        const providers = await providersQuery;
        res.json(providers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single provider
router.get('/:id', async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);
        if (!provider) {
            return res.status(404).json({ error: 'Provider not found' });
        }
        res.json(provider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create provider
router.post('/', async (req, res) => {
    try {
        const provider = new Provider(req.body);
        await provider.save();
        res.status(201).json(provider);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update provider
router.put('/:id', async (req, res) => {
    try {
        const provider = await Provider.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!provider) {
            return res.status(404).json({ error: 'Provider not found' });
        }
        res.json(provider);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete provider
router.delete('/:id', async (req, res) => {
    try {
        const provider = await Provider.findByIdAndDelete(req.params.id);
        if (!provider) {
            return res.status(404).json({ error: 'Provider not found' });
        }
        res.json({ message: 'Provider deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
