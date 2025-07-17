import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useCourse } from '../context/CourseContext';
import ModuleCard from '../components/ModuleCard';
import { FiPlus, FiSave, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CourseEditor = () => {
  const { 
    currentCourse, 
    updateCourse, 
    addModule, 
    deleteCourse  
  } = useCourse();
  
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentCourse) {
      setCourseTitle(currentCourse.title);
      setCourseDescription(currentCourse.description || '');
    }
  }, [currentCourse]);

  const handleAddModule = () => {
    const title = prompt('Enter module title:');
    if (title) {
      addModule(currentCourse.id, title);
    }
  };

  const handleSaveChanges = () => {
    try {
      updateCourse(currentCourse.id, {
        title: courseTitle,
        description: courseDescription
      });
      toast.success('Course updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to update course');
    }
  };

  // Add this function to handle course deletion
  const handleDeleteCourse = () => {
    if (window.confirm('Are you sure you want to delete this entire course?')) {
      deleteCourse(currentCourse.id);
      toast.success('Course deleted successfully');
      navigate('/dashboard');
    }
  };

  if (!currentCourse) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">No Course Selected</h2>
          <p className="text-gray-600 mb-6">
            Please select or create a course from the dashboard.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition flex items-center justify-center gap-2"
          >
            <FiArrowLeft />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full text-2xl font-bold border-none focus:ring-2 focus:ring-amber-500 rounded-md p-2 mb-2"
                placeholder="Course Title"
              />
              <textarea
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                className="w-full border-none focus:ring-2 focus:ring-amber-500 rounded-md p-2 resize-none"
                placeholder="Enter course description..."
                rows={2}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDeleteCourse}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2"
              >
                Delete Course
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition flex items-center gap-2"
              >
                <FiArrowLeft />
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition flex items-center gap-2"
              >
                <FiSave />
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Modules</h2>
            <button
              onClick={handleAddModule}
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition flex items-center gap-2"
            >
              <FiPlus />
              Add Module
            </button>
          </div>

          {currentCourse.modules.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">No modules yet. Add your first module to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentCourse.modules.map((module, index) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  index={index}
                  courseId={currentCourse.id}
                  onDelete={() => deleteCourse(module.id)}  // Pass delete function
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default CourseEditor;