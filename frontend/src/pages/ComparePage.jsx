import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CompareUpload from "../components/CompareUpload";
import CompareResult from "../components/CompareResult";

function ComparePage() {
  const [compareResult, setCompareResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = async (maricoFile, customerFile) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("marico_file", maricoFile);
    formData.append("customer_file", customerFile);

    try {
      const response = await fetch("http://localhost:5000/compare-documents", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to compare documents");
      }

      const result = await response.json();
      setCompareResult(result);
    } catch (error) {
      console.error("Error:", error);
      alert("Error comparing documents. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-700 transition-colors">
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Dashboard</span>
      </Link>

      {/* Page Title */}
      <div className="mb-8 animate-in fade-in zoom-in-95 duration-300">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Compare Documents
        </h1>
        <p className="text-slate-500 mt-2">
          Upload two invoices to compare quantities and prices side by side.
        </p>
      </div>

      {/* Upload Section */}
      <CompareUpload onCompare={handleCompare} isLoading={isLoading} />

      {/* Results Section */}
      {compareResult && (
        <CompareResult data={compareResult} />
      )}
    </div>
  );
}

export default ComparePage;
