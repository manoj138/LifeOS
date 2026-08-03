const express = require('express');
const router = express.Router();
const { getTasks, createTask, toggleTask, deleteTask } = require('../controllers/plannerController');

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id/toggle', toggleTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
