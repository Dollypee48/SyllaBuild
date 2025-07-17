import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Section 1: Hero */}
      <section className="flex items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            Plan & Structure Your Courses with Ease
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10">
            <span className="text-amber-700 font-semibold">SyllaBuild</span> helps instructors and content creators organize professional course outlines, build lessons, and export them effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {currentUser ? (
              <Link
                to="/dashboard"
                className="px-6 py-3 text-base font-medium rounded-xl text-white bg-amber-600 hover:bg-amber-700 shadow transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-6 py-3 text-base font-medium rounded-xl text-white bg-amber-600 hover:bg-amber-700 shadow transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 text-base font-medium rounded-xl text-amber-700 bg-amber-100 hover:bg-amber-200 border border-amber-200 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section className="bg-white px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          SyllaBuild simplifies your workflow in 3 easy steps: Create a course, add modules and lessons, then export your outline as a document.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-amber-50 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-amber-800 mb-2">1. Create Course</h3>
            <p className="text-gray-600">Start by setting your course name, description, and objectives.</p>
          </div>
          <div className="p-6 bg-amber-50 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-amber-800 mb-2">2. Add Modules</h3>
            <p className="text-gray-600">Break your course into structured modules and detailed lessons.</p>
          </div>
          <div className="p-6 bg-amber-50 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-amber-800 mb-2">3. Export & Share</h3>
            <p className="text-gray-600">Download your course outline or share with collaborators easily.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Features */}
      <section className="bg-amber-50 px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why SyllaBuild?</h2>
          <p className="text-gray-600 mb-10">Built for educators and course creators who want to stay organized and professional.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-amber-700">📋 Clean Course Layouts</h3>
              <p className="text-gray-600 mt-2">Professional format with titles, descriptions, and objectives.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-amber-700">🧠 Organized Learning Path</h3>
              <p className="text-gray-600 mt-2">Structure lessons with ease using our intuitive module system.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-amber-700">📤 One-Click Export</h3>
              <p className="text-gray-600 mt-2">Export to PDF or share with collaborators in one click.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-amber-700">💻 Works Anywhere</h3>
              <p className="text-gray-600 mt-2">Fully responsive — works on desktop, tablet, and mobile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Final CTA */}
      <section className="bg-white px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Creating Today</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">Join thousands of educators creating better learning experiences with SyllaBuild.</p>
        <Link
          to={currentUser ? "/dashboard" : "/register"}
          className="px-6 py-3 text-base font-medium rounded-xl text-white bg-amber-600 hover:bg-amber-700 shadow transition"
        >
          {currentUser ? 'Go to Dashboard' : 'Get Started for Free'}
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-amber-100 text-center py-6 border-t border-amber-200 text-sm text-amber-800">
        © {new Date().getFullYear()} SyllaBuild. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
