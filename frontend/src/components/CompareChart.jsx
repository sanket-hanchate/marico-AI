import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function CompareChart({ marico, customer }) {
  const data = [
    {
      name: "Quantity",
      Marico: marico.qty,
      Customer: customer.qty,
    },
    {
      name: "Price",
      Marico: Math.round(marico.price),
      Customer: Math.round(customer.price),
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e2e8f0"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#64748b", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
          formatter={(value) => (
            <span className="font-semibold text-slate-900">{value.toLocaleString()}</span>
          )}
        />
        <Legend
          wrapperStyle={{
            paddingTop: "20px",
          }}
          iconType="square"
          wrapperStyle={{
            color: "#64748b",
            fontSize: "13px",
            fontWeight: "500",
          }}
        />
        <Bar
          dataKey="Marico"
          fill="#3b82f6"
          radius={[8, 8, 0, 0]}
          barSize={40}
        />
        <Bar
          dataKey="Customer"
          fill="#f97316"
          radius={[8, 8, 0, 0]}
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CompareChart;
