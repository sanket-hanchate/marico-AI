import React, { useMemo } from 'react';
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line
} from 'recharts';

const COLORS = {
  Mismatch: '#ef4444',
  No_Issue: '#22c55e',
  Normal: '#3b82f6'
};

const AnalyticsCharts = ({ data }) => {
  // Aggregate data for Pie and Bar charts
  const statusData = useMemo(() => {
    const counts = { Mismatch: 0, No_Issue: 0, Normal: 0 };
    data.forEach(item => {
      const status = item.Final_Status;
      if (counts[status] !== undefined) {
        counts[status]++;
      } else if (status === 'No Issue') {
        counts['No_Issue']++;
      }
    });

    return [
      { name: 'Mismatch', value: counts.Mismatch, color: COLORS.Mismatch },
      { name: 'No Issue', value: counts.No_Issue, color: COLORS.No_Issue },
      { name: 'Normal', value: counts.Normal, color: COLORS.Normal }
    ].filter(item => item.value > 0); // Only show categories that have data
  }, [data]);

  // Aggregate data for Line chart (Month-wise)
  const trendData = useMemo(() => {
    const monthCounts = {};
    data.forEach(item => {
      if (item.InvoiceDate) {
        const date = new Date(item.InvoiceDate);
        if (!isNaN(date)) {
          const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
          if (!monthCounts[monthYear]) {
            monthCounts[monthYear] = { name: monthYear, timestamp: date.getTime(), Mismatch: 0, No_Issue: 0, Normal: 0 };
          }
          const status = item.Final_Status === 'No Issue' ? 'No_Issue' : item.Final_Status;
          if (monthCounts[monthYear][status] !== undefined) {
            monthCounts[monthYear][status]++;
          }
        }
      }
    });
    
    // Sort chronologically
    return Object.values(monthCounts).sort((a, b) => a.timestamp - b.timestamp);
  }, [data]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-semibold text-slate-800 mb-1">{payload[0].name || payload[0].payload.name}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: entry.color }}></span>
              <span className="text-slate-600">{entry.name}: <span className="font-bold text-slate-900">{entry.value}</span></span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Analytics Overview</h2>
        <p className="text-slate-500 mt-1">Visual insights from reconciliation data.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart Card */}
        <div className="bg-white p-6 shadow-sm border border-slate-200 rounded-2xl hover:shadow-md transition-shadow group">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Status Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity" />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="bg-white p-6 shadow-sm border border-slate-200 rounded-2xl hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Transaction Counts</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Line Chart Card (Bonus) */}
      {trendData.length > 0 && (
        <div className="bg-white p-6 shadow-sm border border-slate-200 rounded-2xl hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Trend Over Time</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Line type="monotone" dataKey="Mismatch" stroke={COLORS.Mismatch} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="No_Issue" name="No Issue" stroke={COLORS.No_Issue} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Normal" stroke={COLORS.Normal} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsCharts;
