const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Library homepage');
});

module.exports = router;