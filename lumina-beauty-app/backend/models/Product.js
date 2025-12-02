import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
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
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    inStock: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema);
