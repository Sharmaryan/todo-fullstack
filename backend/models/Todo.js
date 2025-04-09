const { default: mongoose } = require("mongoose");

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Todo is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

})

module.exports = mongoose.model('Todo', todoSchema)