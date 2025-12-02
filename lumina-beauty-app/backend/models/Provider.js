import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        default: 'Uganda'
    },
    rating: {
        type: Number,
        default: 4.0,
        min: 0,
        max: 5
    },
    specialty: {
        type: String,
        required: true,
        enum: ['Hair', 'Nails', 'Barber', 'Makeup', 'Skincare', 'Massage']
    },
    bio: {
        type: String,
        default: 'Experienced professional dedicated to bringing out your best look. Certified and vetted by Lumina Beauty.'
    },
    image: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: true
    },
    jobsDone: {
        type: Number,
        default: 0
    },
    onTimeRate: {
        type: Number,
        default: 98
    }
}, {
    timestamps: true
});

export default mongoose.model('Provider', providerSchema);
