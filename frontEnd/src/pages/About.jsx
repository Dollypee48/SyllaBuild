import { FiBook, FiUsers, FiCode, FiGlobe } from 'react-icons/fi';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About SyllaBuild</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A powerful tool for educators and content creators to design, organize, and structure their courses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
              <FiBook className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-600">
            SyllaBuild was created to simplify the course creation process. We believe that organizing educational
            content should be intuitive and efficient, allowing creators to focus on what matters most - delivering
            quality learning experiences.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-amber-100 rounded-full text-amber-600">
              <FiUsers className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Who It's For</h2>
          </div>
          <p className="text-gray-600">
            Whether you're a university professor, online course creator, corporate trainer, or self-taught educator,
            SyllaBuild provides the tools you need to structure your content effectively and export it for use in any
            learning environment.
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <FiCode className="w-6 h-6" />,
              title: "Intuitive Interface",
              description: "Drag-and-drop functionality makes organizing content simple and visual."
            },
            {
              icon: <FiGlobe className="w-6 h-6" />,
              title: "Flexible Export",
              description: "Export your course outlines as PDF or JSON for use anywhere."
            },
            {
              icon: <FiBook className="w-6 h-6" />,
              title: "Resource Management",
              description: "Attach resources directly to lessons for complete organization."
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg">
              <div className="text-indigo-600 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">The Team</h2>
        <p className="text-gray-600 mb-6">
          SyllaBuild is developed by a small team of educators and developers passionate about improving the course
          creation process. We're constantly working to add new features and improve the user experience.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="text-indigo-600 hover:text-indigo-800">Contact Us</a>
          <a href="#" className="text-indigo-600 hover:text-indigo-800">Feature Requests</a>
          <a href="#" className="text-indigo-600 hover:text-indigo-800">Report an Issue</a>
        </div>
      </div>
    </div>
  );
};

export default About;