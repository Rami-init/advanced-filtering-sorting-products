const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide the name']
    },
    rating: {
        type: Number,
        required: [true, 'please provide the rating']
    },
    description: {
        type: String,
        required: [true, 'please provide the description']
    },
    price: {
        type: Number,
        required: [true, 'please privide the price']
    }
},{
    timestamps: true
})

const Posts = mongoose.model('Posts', PostSchema)
module.exports = Posts