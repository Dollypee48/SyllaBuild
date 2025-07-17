import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

export const exportToPDF = (course) => {
  const doc = new jsPDF()
  
  
  doc.setFontSize(20)
  doc.text(course.title, 14, 20)
  
  // Add description if exists
  if (course.description) {
    doc.setFontSize(12)
    const splitDesc = doc.splitTextToSize(course.description, 180)
    doc.text(splitDesc, 14, 30)
  }
  
 
  let yPosition = 50
  course.modules.forEach((module, moduleIndex) => {
    doc.setFontSize(14)
    doc.text(`Module ${moduleIndex + 1}: ${module.title}`, 14, yPosition)
    yPosition += 10
    
    const lessonData = module.lessons.map((lesson, lessonIndex) => [
      lessonIndex + 1,
      lesson.title,
      lesson.resources.length > 0 ? 'Yes' : 'No'
    ])
    
    doc.autoTable({
      startY: yPosition,
      head: [['#', 'Lesson Title', 'Resources']],
      body: lessonData,
      margin: { left: 14 },
      styles: { fontSize: 10 },
      headStyles: { fillColor: [99, 102, 241] }
    })
    
    yPosition = doc.lastAutoTable.finalY + 10
  })
  
  doc.save(`${course.title.replace(/ /g, '_')}_outline.pdf`)
}

export const exportToJSON = (course) => {
  const dataStr = JSON.stringify(course, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
  
  const exportFileDefaultName = `${course.title.replace(/ /g, '_')}_outline.json`
  
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}