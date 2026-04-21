function ResultTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/50">
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Qty</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cust Qty</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cust Price</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Qty Diff</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price Diff</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {data.map((row, i) => (
            <tr
              key={i}
              className="hover:bg-slate-50 transition-colors duration-150 group"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{row.Description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{row.Quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{row.Cust_Quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{row.Price}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{row.Cust_Price}</td>
              
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${row.Qty_Diff !== 0 ? 'text-red-600' : 'text-slate-600'}`}>
                {row.Qty_Diff}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${row.Price_Diff !== 0 ? 'text-red-600' : 'text-slate-600'}`}>
                {row.Price_Diff}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                  row.Final_Status === "Mismatch"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : row.Final_Status === "No_Issue"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                }`}>
                  {row.Final_Status === "Mismatch" && <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2"></span>}
                  {row.Final_Status === "No_Issue" && <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-2"></span>}
                  {row.Final_Status !== "Mismatch" && row.Final_Status !== "No_Issue" && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>}
                  {row.Final_Status.replace("_", " ")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;