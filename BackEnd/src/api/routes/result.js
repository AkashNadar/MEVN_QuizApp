const express = require('express');
const router = express.Router();
const resultController = require('../controllers/result.js');

router.get('/', resultController.getResults);
router.post('/', resultController.addResults);
router.get('/getResults/:userId', resultController.getResultsByUserId);

module.exports = router;

