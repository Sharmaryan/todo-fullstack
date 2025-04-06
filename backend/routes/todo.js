const express = require('express')
const router = express.Router()

let todos = [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Build a Todo App" },
    { id: "3", title: "Profit 🚀" },
    { id: "4", title: "Deploy it online 🌐" },
]

router.get('/', (req, res) => {
    res.status(200).json(todos)
});

router.post('/add', (req, res) => {
    const id = crypto.randomUUID()
    const title = req.body.title
    const newTodo = { id, title }
    todos.push(newTodo)
    res.status(200).json(todos)
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    todos = todos.filter((todo) => todo.id !== id)
    res.status(200).json(todos)
});

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const title = req.body.title

    todos = todos.map((todo) => todo.id === id ? { ...todo, title } : todo)
    res.status(200).json(todos)
});

module.exports = router;
