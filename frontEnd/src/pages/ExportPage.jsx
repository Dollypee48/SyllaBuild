import { useCourse } from '../context/CourseContext'
import { exportToPDF, exportToJSON } from '../utils/exportUtils'
import { FiDownload, FiFileText, FiFile } from 'react-icons/fi'

const ExportPage = () => {
  const { currentCourse } = useCourse()

  const handleExportPDF = () => {
    if (!currentCourse) return
    exportToPDF(currentCourse)
  }

  const handleExportJSON = () => {
    if (!currentCourse) return
    exportToJSON(currentCourse)
  }

  if (!currentCourse) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No course selected. Please select or create a course first.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Export Course</h1>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{currentCourse.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* PDF Export Card */}
          <div
            className="group border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 bg-gray-50 cursor-pointer flex flex-col items-center"
            onClick={handleExportPDF}
          >
            <FiFileText className="text-4xl text-amber-600 mb-4 group-hover:scale-110 transition-transform duration-200" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">Export as PDF</h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Generate a printable PDF document of your course outline.
            </p>
            <button className="mt-auto flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
              <FiDownload className="mr-2" /> Download PDF
            </button>
          </div>

          {/* JSON Export Card */}
          <div
            className="group border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 bg-gray-50 cursor-pointer flex flex-col items-center"
            onClick={handleExportJSON}
          >
            <FiFile className="text-4xl text-amber-600 mb-4 group-hover:scale-110 transition-transform duration-200" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">Export as JSON</h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Export your course data in JSON format for integration with other systems.
            </p>
            <button className="mt-auto flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
              <FiDownload className="mr-2" /> Download JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExportPage
