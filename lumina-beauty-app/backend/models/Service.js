import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    time: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['braids', 'twists', 'locs', 'natural', 'styling', 'nails', 'weave', 'wig']
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Service', serviceSchema);
