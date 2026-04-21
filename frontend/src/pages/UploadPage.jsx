import { useState } from "react";
import { UploadCloud, FileText, Loader2, ArrowRight } from "lucide-react";

function UploadPage({ setData }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a file");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to backend");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 animate-in fade-in zoom-in-95 duration-300">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          Marico Smart Reconciliation
        </h1>
        <p className="mt-4 text-lg text-slate-500">
          Upload your latest transaction data. Our AI model will analyze mismatches instantly.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="max-w-xl mx-auto">
            {/* Drag & Drop Area visually styled */}
            <label
              htmlFor="file-upload"
              className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 ease-in-out ${
                file 
                  ? "border-blue-500 bg-blue-50/50" 
                  : "border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400"
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                {file ? (
                  <>
                    <div className="bg-blue-100 p-3 rounded-full mb-4 shadow-sm">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="mb-2 text-sm text-slate-900 font-semibold">{file.name}</p>
                    <p className="text-xs text-slate-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </>
                ) : (
                  <>
                    <div className="bg-white p-3 shadow-sm rounded-full mb-4 ring-1 ring-slate-900/5">
                      <UploadCloud className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="mb-2 text-sm text-slate-600">
                      <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">
                      CSV or Excel files only
                    </p>
                  </>
                )}
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white shadow-sm transition-all duration-200 ${
                  !file || isUploading
                    ? "bg-blue-400 cursor-not-allowed opacity-70"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing AI Analysis...
                  </>
                ) : (
                  <>
                    Analyze Data
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;