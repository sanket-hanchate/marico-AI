import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import UploadPage from "./pages/UploadPage";
import Dashboard from "./pages/Dashboard";
import ComparePage from "./pages/ComparePage";

function AppContent() {
  const [data, setData] = useState(null);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header / Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="bg-blue-600 p-2 rounded-xl text-white shadow-sm">
                <LayoutDashboard size={20} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">
                AI Reconciliation Dashboard
              </span>
            </Link>
            {data && (
              <div className="flex items-center gap-5">
                <button 
                  onClick={() => setData(null)}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Upload New File
                </button>
                <Link
                  to="/compare"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Compare Documents
                </Link>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm ring-2 ring-white">
                  AD
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={!data ? <UploadPage setData={setData} /> : <Dashboard data={data} />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;