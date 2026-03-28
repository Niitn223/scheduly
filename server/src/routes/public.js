const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/BookingController');

router.get('/:slug',       controller.getEventBySlug);
router.get('/:slug/slots', controller.getAvailableSlots);

module.exports = router;