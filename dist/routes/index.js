const express = require('express');
const health = require('./health');

const router = express.Router();

router.use('/api/health', health);

module.exports = router;
