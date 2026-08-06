const express = require('express');
const router = express.Router();
const { getTasks, createTask, toggleTask, deleteTask } = require('../controllers/plannerController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/tasks', authMiddleware, getTasks);
router.post('/tasks', authMiddleware, createTask);
router.put('/tasks/:id/toggle', authMiddleware, toggleTask);
router.delete('/tasks/:id', authMiddleware, deleteTask);

module.exports = router;
