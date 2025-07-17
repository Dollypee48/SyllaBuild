import { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function Dashboard() {
  const { courses, createCourse, setCurrentCourse, deleteCourse } = useCourse();
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleCreateCourse = async () => {
    if (!newCourseTitle.trim()) {
      toast.error('Please enter a course title');
      return;
    }

    setIsCreating(true);
    try {
      const course = createCourse(newCourseTitle, '');
      setCurrentCourse(course);
      setNewCourseTitle('');
      navigate('/editor');
    } catch (error) {
      toast.error('Failed to create course');
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditCourse = (course) => {
    setCurrentCourse(course);
    navigate('/editor');
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(courseId);
      toast.success('Course deleted successfully');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Your Courses
      </h1>

      {/* Create Course Input */}
      <div className="mb-8 flex items-center gap-3">
        <input
          type="text"
          placeholder="Enter course title..."
          value={newCourseTitle}
          onChange={(e) => setNewCourseTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreateCourse()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
        />
        <button
          onClick={handleCreateCourse}
          disabled={isCreating}
          className={`flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition ${
            isCreating ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isCreating ? 'Creating...' : (
            <>
              <FiPlus />
              Create
            </>
          )}
        </button>
      </div>

      {/* Course List */}
      {courses.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No courses yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first course
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border border-gray-200 shadow-sm rounded-lg p-4 bg-white hover:shadow-md transition flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-gray-800 truncate">
                    {course.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 truncate">
                    {course.description || 'No description'}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="ml-2 text-gray-400 hover:text-red-500 transition"
                  aria-label="Delete course"
                >
                  <FiTrash2 />
                </button>
              </div>
              
              <div className="mt-auto">
                <button
                  onClick={() => handleEditCourse(course)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition"
                >
                  <FiEdit2 />
                  Edit Course
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}