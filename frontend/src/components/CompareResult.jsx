import { AlertCircle, CheckCircle2, BarChart3 } from "lucide-react";
import CompareChart from "./CompareChart";

function CompareResult({ data }) {
  const { marico, customer, comparison } = data;
  const qtyDiff = comparison.qty_diff;
  const priceDiff = comparison.price_diff;
  const status = comparison.status;

  const isQtyDiffPositive = qtyDiff > 0;
  const isPriceDiffPositive = priceDiff > 0;

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      {/* Results Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Comparison Results</h2>
        <p className="text-slate-500 mt-1">Analysis of Marico vs Customer invoices</p>
      </div>

      {/* Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Marico Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 group-hover:w-1.5 transition-all"></div>
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Marico Invoice</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Quantity</p>
              <p className="text-3xl font-bold text-blue-600">{marico.qty}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Price</p>
              <p className="text-3xl font-bold text-blue-600">₹{marico.price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Customer Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 group-hover:w-1.5 transition-all"></div>
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Customer Invoice</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Quantity</p>
              <p className="text-3xl font-bold text-orange-600">{customer.qty}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Price</p>
              <p className="text-3xl font-bold text-orange-600">₹{customer.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Differences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quantity Difference */}
        <div className={`p-8 rounded-2xl shadow-sm border transition-shadow ${
          qtyDiff === 0
            ? "bg-green-50 border-green-200 hover:shadow-md"
            : "bg-red-50 border-red-200 hover:shadow-md"
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Quantity Difference</p>
              <p className={`text-4xl font-bold ${
                qtyDiff === 0
                  ? "text-green-600"
                  : isQtyDiffPositive
                  ? "text-red-600"
                  : "text-red-600"
              }`}>
                {qtyDiff === 0 ? "✓ No Diff" : isQtyDiffPositive ? `+${qtyDiff}` : `${qtyDiff}`}
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              qtyDiff === 0
                ? "bg-green-100"
                : "bg-red-100"
            }`}>
              {qtyDiff === 0 ? (
                <CheckCircle2 className={`w-6 h-6 ${
                  qtyDiff === 0 ? "text-green-600" : "text-red-600"
                }`} />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
          </div>
        </div>

        {/* Price Difference */}
        <div className={`p-8 rounded-2xl shadow-sm border transition-shadow ${
          priceDiff === 0
            ? "bg-green-50 border-green-200 hover:shadow-md"
            : "bg-red-50 border-red-200 hover:shadow-md"
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Price Difference</p>
              <p className={`text-4xl font-bold ${
                priceDiff === 0
                  ? "text-green-600"
                  : isPriceDiffPositive
                  ? "text-red-600"
                  : "text-red-600"
              }`}>
                {priceDiff === 0 ? "✓ No Diff" : isPriceDiffPositive ? `+₹${priceDiff.toFixed(2)}` : `₹${priceDiff.toFixed(2)}`}
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              priceDiff === 0
                ? "bg-green-100"
                : "bg-red-100"
            }`}>
              {priceDiff === 0 ? (
                <CheckCircle2 className={`w-6 h-6 ${
                  priceDiff === 0 ? "text-green-600" : "text-red-600"
                }`} />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg ring-1 ring-blue-200">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Comparison Chart</h3>
        </div>
        <CompareChart marico={marico} customer={customer} />
      </div>

      {/* Status Badge */}
      <div className="flex justify-center">
        <div
          className={`px-12 py-6 rounded-full shadow-lg text-center flex flex-col items-center gap-3 ${
            status === "Mismatch"
              ? "bg-red-500"
              : status === "No_Issue"
              ? "bg-green-500"
              : "bg-yellow-500"
          }`}
        >
          <div className={`text-4xl font-bold text-white tracking-tight`}>
            {status === "Mismatch" ? "⚠ MISMATCH" : status === "No_Issue" ? "✓ NO ISSUE" : "→ NORMAL"}
          </div>
          <p className="text-white/80 text-sm font-medium">
            {status === "Mismatch"
              ? "Discrepancies found between invoices"
              : status === "No_Issue"
              ? "All values match perfectly"
              : "Minor variations detected"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompareResult;
