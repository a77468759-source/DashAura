import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { revenueByMonth } from "../../data/mockData";

function RevenueChart() {
  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card md:p-6" aria-labelledby="revenue-chart-heading">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 id="revenue-chart-heading" className="font-semibold text-ink">Revenue overview</h3>
          <p className="mt-1 text-xs text-slate-500">Monthly revenue and expenses</p>
        </div>
        <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">This year</span>
      </div>
      <div className="h-[270px]" role="img" aria-label="Line chart showing monthly revenue growing from 28 thousand dollars in January to 82 thousand dollars in December, with expenses also trending upward.">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueByMonth} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid stroke="#eef0f5" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} dy={8} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} tickFormatter={(value) => `$${value}k`} />
            <Tooltip formatter={(value, name) => [`$${value}k`, name]} contentStyle={{ borderRadius: 10, borderColor: "#e2e8f0", fontSize: 12 }} />
            <Legend verticalAlign="top" align="right" iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingBottom: 15 }} />
            <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#6747dc" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#a8b1c2" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default RevenueChart;
