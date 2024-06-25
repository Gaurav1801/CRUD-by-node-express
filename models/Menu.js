const mongoose = require('mongoose');

const MenuitemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet', 'sour', 'spicy']
    },
    is_drink: {
        type: Boolean,
        default: true
    },
    ingredients: {
        type: [String],
        default: []
    },
    nums_sales: {
        type: Number,
        default: 1
    }
})
const Menuitem = mongoose.model('Menuitem', MenuitemSchema);
module.exports = Menuitem;