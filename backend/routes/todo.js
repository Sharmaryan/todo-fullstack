const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const Todo = require('../models/Todo');
const router = express.Router()


router.get('/', verifyToken, async (req, res) => {
    const todos = await Todo.find({user:req.user.userId})
    res.status(200).json(todos)
});

router.post('/add', verifyToken, async (req, res) => {
    const title = req.body.title
    const currentUser = req.user
    const todos = await Todo.create({ title, user: currentUser.userId })
    res.status(200).json(todos)
});

router.delete('/:id', verifyToken, async (req, res) => {
    const _id = req.params.id
    await Todo.findByIdAndDelete({ _id })
    const todos = await Todo.find({})
    res.status(200).json(todos)
});

router.patch('/:id', verifyToken, async (req, res) => {
    const id = req.params.id
    const title = req.body.title
    await Todo.findByIdAndUpdate(id, { title })
    const todos = await Todo.find({})
    res.status(200).json(todos)
});

module.exports = router;
