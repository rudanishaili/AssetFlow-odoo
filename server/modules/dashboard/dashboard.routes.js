const express = require('express');
const dashboardController = require('./dashboard.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/metrics', authMiddleware, dashboardController.getMetrics);

module.exports = router;
