const express = require('express');
const advancedResults = require('../middlewares/advancedResults');
const Bootcamp = require('../models/Bootcamp');
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcamps');
const { protect, authorize } = require('../middlewares/auth');

// Include other resource routers
const coursesRouter = require('./courses');

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', coursesRouter);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('admin', 'publisher'), createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('admin', 'publisher'), updateBootcamp)
  .delete(protect, authorize('admin', 'publisher'), deleteBootcamp);

router
  .route('/:id/photo')
  .put(protect, authorize('admin', 'publisher'), bootcampPhotoUpload);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

module.exports = router;
