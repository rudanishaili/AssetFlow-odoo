const express = require('express');
const authModule = require('../modules/auth');
const dashboardModule = require('../modules/dashboard');
const masterDataModule = require('../modules/master-data');

const router = express.Router();

router.use('/auth', authModule.routes);
router.use('/dashboard', dashboardModule.routes);
router.use('/master-data', masterDataModule.routes);

module.exports = router;
