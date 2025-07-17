const mongoose = require('mongoose')

const ResourceSchema = new mongoose.Schema({
  type: String,
  title: String,
  url: String
})

const LessonSchema = new mongoose.Schema({
  title: String,
  resources: [ResourceSchema]
})

const ModuleSchema = new mongoose.Schema({
  title: String,
  lessons: [LessonSchema]
})

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  modules: [ModuleSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Course', CourseSchema)