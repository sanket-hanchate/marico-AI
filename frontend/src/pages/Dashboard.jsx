import ResultTable from "../components/ResultTable";
import AnalyticsCharts from "../components/AnalyticsCharts";
import { AlertCircle, CheckCircle2, FileStack } from "lucide-react";

function Dashboard({ data }) {
  const total = data.length;

  const mismatch = data.filter(d => d.Final_Status === "Mismatch").length;
  const noIssue = data.filter(d => d.Final_Status === "No_Issue").length;
  const normal = data.filter(d => d.Final_Status === "Normal").length;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
        <p className="text-slate-500 mt-1">Summary of the latest reconciliation analysis.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Card */}
        <div className="bg-white p-6 shadow-sm border border-slate-200 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-slate-100 p-3 rounded-xl">
            <FileStack className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Transactions</p>
            <p className="text-2xl font-bold text-slate-900">{total}</p>
          </div>
        </div>
        
        {/* Mismatch Card */}
        <div className="bg-white p-6 shadow-sm border border-slate-200 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500 group-hover:w-1.5 transition-all"></div>
          <div className="bg-red-50 p-3 rounded-xl ring-1 ring-red-100">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Mismatches Found</p>
            <p className="text-2xl font-bold text-slate-900">{mismatch}</p>
          </div>
        </div>

        {/* No Issue Card */}
        <div className="bg-white p-6 shadow-sm border border-slate-200 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-green-500 group-hover:w-1.5 transition-all"></div>
          <div className="bg-green-50 p-3 rounded-xl ring-1 ring-green-100">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">No Issues</p>
            <p className="text-2xl font-bold text-slate-900">{noIssue}</p>
          </div>
        </div>

      </div>

      <AnalyticsCharts data={data} />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">Detailed Results</h2>
        </div>
        <ResultTable data={data} />
      </div>
    </div>
  );
}

export default Dashboard;