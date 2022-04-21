const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Service is Working',
  });
});

module.exports = router;
