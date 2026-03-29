const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/bookingController');

router.get('/confirm/:id', controller.getConfirmation);
router.get('/',            controller.getBookings);
router.post('/',           controller.createBooking);
router.put('/:id/cancel',  controller.cancelBooking);

module.exports = router;