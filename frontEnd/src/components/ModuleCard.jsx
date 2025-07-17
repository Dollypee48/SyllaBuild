import { useDrag, useDrop } from 'react-dnd';
import { useCourse } from '../context/CourseContext';
import { FiMove, FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import LessonCard from './LessonCard';

const ModuleCard = ({ module, index, courseId }) => {
  const { moveModule, addLesson, deleteModule, editModuleTitle } = useCourse();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'MODULE',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: 'MODULE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveModule(courseId, draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const handleAddLesson = () => {
    const title = prompt('Enter lesson title:');
    if (title) {
      addLesson(courseId, module.id, title);
    }
  };

  const handleEditModule = () => {
    const newTitle = prompt('Edit module title:', module.title);
    if (newTitle && newTitle.trim() !== '' && newTitle !== module.title) {
      editModuleTitle(courseId, module.id, newTitle.trim());
    }
  };

  const handleDeleteModule = () => {
    if (confirm('Are you sure you want to delete this module?')) {
      deleteModule(courseId, module.id);
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`rounded-xl border shadow-sm mb-6 transition-opacity ${
        isDragging ? 'opacity-40' : 'opacity-100'
      } bg-white`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 bg-amber-50 border-b rounded-t-xl">
        <div className="flex items-center gap-2 text-amber-700 font-medium text-base">
          <FiMove className="text-gray-500 cursor-move text-lg" />
          <h3 className="truncate">{module.title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddLesson}
            className="p-2 rounded hover:bg-amber-100 text-amber-600 transition"
            title="Add Lesson"
          >
            <FiPlus />
          </button>
          <button
            onClick={handleEditModule}
            className="p-2 rounded hover:bg-amber-100 text-amber-600 transition"
            title="Edit Module"
          >
            <FiEdit />
          </button>
          <button
            onClick={handleDeleteModule}
            className="p-2 rounded hover:bg-red-100 text-red-600 transition"
            title="Delete Module"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* Lessons */}
      <div className="p-5 space-y-3">
        {module.lessons.length > 0 ? (
          module.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              moduleId={module.id}
              courseId={courseId}
            />
          ))
        ) : (
          <p className="text-sm text-gray-400 italic">No lessons yet</p>
        )}
      </div>
    </div>
  );
};

export default ModuleCard;
