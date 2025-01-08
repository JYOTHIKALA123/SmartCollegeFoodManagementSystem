const express = require('express');
const { createRequest, getRequests } = require('../Controllers/departmentController');
const authMiddleware = require('../Middlewares/authMiddleware'); 
const router = express.Router();

router.post('/request-food', authMiddleware(['Department']), createRequest);
router.get('/requests', authMiddleware(['Department']), getRequests);

module.exports = router;
