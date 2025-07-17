import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);

  // Course operations
  const createCourse = (title, description) => {
    const newCourse = {
      id: uuidv4(),
      title,
      description,
      modules: [],
      createdAt: new Date().toISOString()
    };
    setCourses([...courses, newCourse]);
    toast.success('Course created successfully!');
    return newCourse;
  };

  const updateCourse = (id, updates) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, ...updates } : course
    ));
    if (currentCourse?.id === id) {
      setCurrentCourse({ ...currentCourse, ...updates });
    }
    toast.success('Course updated successfully!');
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
    if (currentCourse?.id === id) {
      setCurrentCourse(null);
    }
    toast.success('Course deleted successfully!');
  };

  // Module operations
  const addModule = (courseId, moduleTitle) => {
    const newModule = {
      id: uuidv4(),
      title: moduleTitle,
      lessons: []
    };
    
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          modules: [...course.modules, newModule]
        };
      }
      return course;
    });
    
    setCourses(updatedCourses);
    
    if (currentCourse?.id === courseId) {
      setCurrentCourse({
        ...currentCourse,
        modules: [...currentCourse.modules, newModule]
      });
    }
    
    toast.success('Module added successfully!');
    return newModule;
  };

  const editModuleTitle = (courseId, moduleId, newTitle) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          modules: course.modules.map(module => 
            module.id === moduleId ? { ...module, title: newTitle } : module
          )
        };
      }
      return course;
    });
    
    setCourses(updatedCourses);
    
    if (currentCourse?.id === courseId) {
      setCurrentCourse({
        ...currentCourse,
        modules: currentCourse.modules.map(module => 
          module.id === moduleId ? { ...module, title: newTitle } : module
        )
      });
    }
    
    toast.success('Module updated successfully!');
  };

  const deleteModule = (courseId, moduleId) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          modules: course.modules.filter(module => module.id !== moduleId)
        };
      }
      return course;
    });
    
    setCourses(updatedCourses);
    
    if (currentCourse?.id === courseId) {
      setCurrentCourse({
        ...currentCourse,
        modules: currentCourse.modules.filter(module => module.id !== moduleId)
      });
    }
    
    toast.success('Module deleted successfully!');
  };

  const moveModule = (courseId, dragIndex, hoverIndex) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    const newModules = [...course.modules];
    const draggedModule = newModules[dragIndex];
    
    newModules.splice(dragIndex, 1);
    newModules.splice(hoverIndex, 0, draggedModule);
    
    const updatedCourses = courses.map(c => 
      c.id === courseId ? { ...c, modules: newModules } : c
    );
    
    setCourses(updatedCourses);
    
    if (currentCourse?.id === courseId) {
      setCurrentCourse({
        ...currentCourse,
        modules: newModules
      });
    }
  };

  // Lesson operations
  const addLesson = (courseId, moduleId, lessonTitle) => {
    const newLesson = {
      id: uuidv4(),
      title: lessonTitle,
      resources: []
    };
    
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const updatedModules = course.modules.map(module => {
          if (module.id === moduleId) {
            return {
              ...module,
              lessons: [...module.lessons, newLesson]
            };
          }
          return module;
        });
        return { ...course, modules: updatedModules };
      }
      return course;
    });
    
    setCourses(updatedCourses);
    
    if (currentCourse?.id === courseId) {
      const updatedModules = currentCourse.modules.map(module => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: [...module.lessons, newLesson]
          };
        }
        return module;
      });
      setCurrentCourse({
        ...currentCourse,
        modules: updatedModules
      });
    }
    
    toast.success('Lesson added successfully!');
    return newLesson;
  };

  const editLessonTitle = (courseId, moduleId, lessonId, newTitle) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const updatedModules = course.modules.map(module => {
          if (module.id === moduleId) {
            const updatedLessons = module.lessons.map(lesson => {
              if (lesson.id === lessonId) {
                return { ...lesson, title: newTitle };
              }
              return lesson;
            });
            return { ...module, lessons: updatedLessons };
          }
          return module;
        });
        return { ...course, modules: updatedModules };
      }
      return course;
    });
    
    setCourses(updatedCourses);
    
    if (currentCourse?.id === courseId) {
      const updatedModules = currentCourse.modules.map(module => {
        if (module.id === moduleId) {
          const updatedLessons = module.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return { ...lesson, title: newTitle };
            }
            return lesson;
          });
          return { ...module, lessons: updatedLessons };
        }
        return module;
      });
      setCurrentCourse({
        ...currentCourse,
        modules: updatedModules
      });
    }
    
    toast.success('Lesson updated successfully!');
  };

  const deleteLesson = (courseId, moduleId, lessonId) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const updatedModules = course.modules.map(module => {
          if (module.id === moduleId) {
            return {
              ...module,
              lessons: module.lessons.filter(lesson => lesson.id !== lessonId)
            };
          }
          return module;
        });
        return { ...course, modules: updatedModules };
      }
      return course;
    });
    
    setCourses(updatedCourses);
    
    if (currentCourse?.id === courseId) {
      const updatedModules = currentCourse.modules.map(module => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.filter(lesson => lesson.id !== lessonId)
          };
        }
        return module;
      });
      setCurrentCourse({
        ...currentCourse,
        modules: updatedModules
      });
    }
    
    toast.success('Lesson deleted successfully!');
  };

  // Resource operations
  const addResource = (courseId, moduleId, lessonId, resource) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const updatedModules = course.modules.map(module => {
          if (module.id === moduleId) {
            const updatedLessons = module.lessons.map(lesson => {
              if (lesson.id === lessonId) {
                return {
                  ...lesson,
                  resources: [...lesson.resources, resource]
                };
              }
              return lesson;
            });
            return { ...module, lessons: updatedLessons };
          }
          return module;
        });
        return { ...course, modules: updatedModules };
      }
      return course;
    });
    
    setCourses(updatedCourses);
    
    if (currentCourse?.id === courseId) {
      const updatedModules = currentCourse.modules.map(module => {
        if (module.id === moduleId) {
          const updatedLessons = module.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                resources: [...lesson.resources, resource]
              };
            }
            return lesson;
          });
          return { ...module, lessons: updatedLessons };
        }
        return module;
      });
      setCurrentCourse({
        ...currentCourse,
        modules: updatedModules
      });
    }
    
    toast.success('Resource added successfully!');
  };

  const deleteResource = (courseId, moduleId, lessonId, resourceId) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const updatedModules = course.modules.map(module => {
          if (module.id === moduleId) {
            const updatedLessons = module.lessons.map(lesson => {
              if (lesson.id === lessonId) {
                return {
                  ...lesson,
                  resources: lesson.resources.filter(res => res.id !== resourceId)
                };
              }
              return lesson;
            });
            return { ...module, lessons: updatedLessons };
          }
          return module;
        });
        return { ...course, modules: updatedModules };
      }
      return course;
    });
    
    setCourses(updatedCourses);
    
    if (currentCourse?.id === courseId) {
      const updatedModules = currentCourse.modules.map(module => {
        if (module.id === moduleId) {
          const updatedLessons = module.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                resources: lesson.resources.filter(res => res.id !== resourceId)
              };
            }
            return lesson;
          });
          return { ...module, lessons: updatedLessons };
        }
        return module;
      });
      setCurrentCourse({
        ...currentCourse,
        modules: updatedModules
      });
    }
    
    toast.success('Resource deleted successfully!');
  };

  const value = {
    courses,
    currentCourse,
    setCurrentCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    addModule,
    editModuleTitle,
    deleteModule,
    moveModule,
    addLesson,
    editLessonTitle,
    deleteLesson,
    addResource,
    deleteResource
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  return useContext(CourseContext);
}