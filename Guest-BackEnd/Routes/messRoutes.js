const express = require('express');
const { completeRequest, getAllRequests , getCompletedRequests} = require('../Controllers/messController');
const authMiddleware = require('../Middlewares/authMiddleware'); // Ensure this is defined to check for mess role
const router = express.Router();

router.post('/complete', authMiddleware(['Mess']), completeRequest);
router.get('/all', authMiddleware(['Mess']), getAllRequests);

module.exports = router;
