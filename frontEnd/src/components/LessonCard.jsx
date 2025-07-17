import { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { FiPlus, FiTrash2, FiPaperclip, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const LessonCard = ({ lesson, moduleId, courseId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(lesson.title);

  const { addResource, deleteLesson, updateLessonTitle } = useCourse(); // Make sure `updateLessonTitle` exists in your context

  const handleAddResource = () => {
    const url = prompt('Enter resource URL:');
    if (url) {
      addResource(courseId, moduleId, lesson.id, {
        id: Date.now().toString(),
        type: 'link',
        url,
        title: url,
      });
      toast.success('Resource added!');
    }
  };

  const handleDeleteLesson = () => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      try {
        deleteLesson(courseId, moduleId, lesson.id);
        toast.success('Lesson deleted!');
      } catch (error) {
        toast.error('Failed to delete lesson');
      }
    }
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      updateLessonTitle(courseId, moduleId, lesson.id, editedTitle.trim());
      toast.success('Lesson updated!');
      setIsEditing(false);
    } else {
      toast.error('Title cannot be empty');
    }
  };

  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
        onClick={() => !isEditing && setIsExpanded(!isExpanded)}
      >
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1 mr-2 px-2 py-1 border rounded text-sm text-gray-800"
            autoFocus
          />
        ) : (
          <h4 className="text-sm font-medium text-gray-800 truncate">{lesson.title}</h4>
        )}

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveEdit();
                }}
                title="Save"
                className="p-1 rounded hover:bg-green-100 text-green-600"
              >
                <FiSave />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(false);
                  setEditedTitle(lesson.title);
                }}
                title="Cancel"
                className="p-1 rounded hover:bg-gray-100 text-gray-600"
              >
                <FiX />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddResource();
                }}
                title="Add Resource"
                className="p-1 rounded hover:bg-amber-100 text-amber-600"
              >
                <FiPaperclip />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                title="Edit Lesson"
                className="p-1 rounded hover:bg-blue-100 text-blue-600"
              >
                <FiEdit2 />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteLesson();
                }}
                title="Delete Lesson"
                className="p-1 rounded hover:bg-red-100 text-red-600"
              >
                <FiTrash2 />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Expandable Resources */}
      {isExpanded && !isEditing && (
        <div className="px-4 py-3 border-t bg-gray-50">
          {lesson.resources.length > 0 ? (
            <ul className="space-y-2">
              {lesson.resources.map((resource) => (
                <li key={resource.id} className="text-sm text-gray-700 flex items-center">
                  <FiPaperclip className="mr-2 text-gray-500" />
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-600 break-all"
                  >
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">No resources added yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonCard;
