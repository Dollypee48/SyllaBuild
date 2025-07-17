const Course = require('../models/Course')
const asyncHandler = require('express-async-handler')


const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ createdBy: req.user._id })
  res.json(courses)
})


const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findOne({
    _id: req.params.id,
    createdBy: req.user._id
  })
  
  if (course) {
    res.json(course)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})


const createCourse = asyncHandler(async (req, res) => {
  const { title, description } = req.body
  
  const course = new Course({
    title,
    description,
    createdBy: req.user._id,
    modules: []
  })
  
  const createdCourse = await course.save()
  res.status(201).json(createdCourse)
})


const updateCourse = asyncHandler(async (req, res) => {
  const { title, description, modules } = req.body
  
  const course = await Course.findOne({
    _id: req.params.id,
    createdBy: req.user._id
  })
  
  if (course) {
    course.title = title || course.title
    course.description = description || course.description
    course.modules = modules || course.modules
    
    const updatedCourse = await course.save()
    res.json(updatedCourse)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})


const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findOne({
    _id: req.params.id,
    createdBy: req.user._id
  })
  
  if (course) {
    await course.remove()
    res.json({ message: 'Course removed' })
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
}