import { useState } from "react";
import { Upload, Loader2, FileImage } from "lucide-react";

function CompareUpload({ onCompare, isLoading }) {
  const [maricoFile, setMaricoFile] = useState(null);
  const [customerFile, setCustomerFile] = useState(null);
  const [maricoPreview, setMaricoPreview] = useState(null);
  const [customerPreview, setCustomerPreview] = useState(null);

  const handleFileSelect = (file, isMarico) => {
    if (file && file.type.startsWith("image/")) {
      if (isMarico) {
        setMaricoFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setMaricoPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setCustomerFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setCustomerPreview(e.target.result);
        reader.readAsDataURL(file);
      }
    } else {
      alert("Please select an image file");
    }
  };

  const handleDrop = (e, isMarico) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file, isMarico);
  };

  const handleCompareClick = () => {
    if (!maricoFile || !customerFile) {
      alert("Please upload both images");
      return;
    }
    onCompare(maricoFile, customerFile);
  };

  const handleClear = (isMarico) => {
    if (isMarico) {
      setMaricoFile(null);
      setMaricoPreview(null);
    } else {
      setCustomerFile(null);
      setCustomerPreview(null);
    }
  };

  return (
    <div className="mb-12 animate-in fade-in zoom-in-95 duration-300">
      {/* Upload Boxes Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Marico Upload Box */}
        <div
          onDrop={(e) => handleDrop(e, true)}
          onDragOver={(e) => e.preventDefault()}
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Marico Invoice</h3>

          {!maricoPreview ? (
            <label
              htmlFor="marico-upload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="bg-white p-3 rounded-full mb-3 ring-1 ring-slate-200">
                  <Upload className="w-6 h-6 text-slate-400" />
                </div>
                <p className="mb-1 text-sm text-slate-600">
                  <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-500">PNG, JPG, GIF (max. 10MB)</p>
              </div>
              <input
                id="marico-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files[0], true)}
              />
            </label>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={maricoPreview}
                alt="Marico preview"
                className="w-full h-48 object-cover rounded-lg mb-4 border border-slate-200"
              />
              <button
                onClick={() => handleClear(true)}
                className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        {/* Customer Upload Box */}
        <div
          onDrop={(e) => handleDrop(e, false)}
          onDragOver={(e) => e.preventDefault()}
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Customer Invoice</h3>

          {!customerPreview ? (
            <label
              htmlFor="customer-upload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="bg-white p-3 rounded-full mb-3 ring-1 ring-slate-200">
                  <Upload className="w-6 h-6 text-slate-400" />
                </div>
                <p className="mb-1 text-sm text-slate-600">
                  <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-500">PNG, JPG, GIF (max. 10MB)</p>
              </div>
              <input
                id="customer-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files[0], false)}
              />
            </label>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={customerPreview}
                alt="Customer preview"
                className="w-full h-48 object-cover rounded-lg mb-4 border border-slate-200"
              />
              <button
                onClick={() => handleClear(false)}
                className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Compare Button */}
      <div className="flex justify-center">
        <button
          onClick={handleCompareClick}
          disabled={isLoading || !maricoFile || !customerFile}
          className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Comparing...
            </>
          ) : (
            <>
              <FileImage className="w-5 h-5" />
              Compare Documents
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default CompareUpload;
