const express = require('express');
const { approveRequest, getPendingRequests, getCompletedRequests, deleteCompletedRequest } = require('../Controllers/officeController'); // Include the deleteCompletedRequest here
const authMiddleware = require('../Middlewares/authMiddleware'); // Ensure this is defined to check for office role
const router = express.Router();

router.post('/approve', authMiddleware(['Office']), approveRequest);
router.get('/pending', authMiddleware(['Office']), getPendingRequests);
router.get('/completed', authMiddleware(['Office']), getCompletedRequests);
router.delete('/deleteCompletedRequest', authMiddleware(['Office']), deleteCompletedRequest); // Add middleware here if needed
module.exports = router;
