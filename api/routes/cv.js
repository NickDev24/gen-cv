const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');

router.post('/', cvController.createCv);
router.get('/:id', cvController.getCv);
router.get('/:id/pdf', cvController.downloadPdf);

module.exports = router;
