const express = require('express');
const masterDataController = require('./masterData.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/categories', authMiddleware, masterDataController.getCategories);

module.exports = router;
