const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/authMiddleware')
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController')

router.route('/')
  .get(protect, getCourses)
  .post(protect, createCourse)

router.route('/:id')
  .get(protect, getCourseById)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse)

module.exports = router