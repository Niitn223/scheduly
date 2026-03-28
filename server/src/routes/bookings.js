const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/BookingController');

router.get('/confirm/:id', controller.getConfirmation);
router.get('/',            controller.getBookings);
router.post('/',           controller.createBooking);
router.put('/:id/cancel',  controller.cancelBooking);

module.exports = router;