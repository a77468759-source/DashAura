import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download, TrendingUp, UsersRound, Wallet } from "lucide-react";
import PageHeading from "../components/common/PageHeading";
import StatCard from "../components/dashboard/StatCard";
import { revenueByMonth, userGrowth } from "../data/mockData";

const ranges = {
  "Last 30 days": 2,
  "Last 90 days": 4,
  "Last 12 months": 12,
};

function Reports() {
  const [range, setRange] = useState("Last 12 months");
  const reportData = revenueByMonth.slice(-ranges[range]);
  const growthData = userGrowth.slice(-ranges[range]);

  function downloadReport() {
    const rows = [["Month", "Revenue ($k)", "Expenses ($k)"], ...reportData.map(({ month, revenue, expenses }) => [month, revenue, expenses])];
    const csv = rows.map((row) => row.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "dashaura-revenue-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <PageHeading eyebrow="Workspace insights" title="Reports & analytics" description="Track performance and understand how your workspace is growing.">
        <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700" onClick={downloadReport}>
          <Download size={16} aria-hidden="true" /> Export report
        </button>
      </PageHeading>

      <section className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between sm:px-5" aria-label="Report filters">
        <div>
          <p className="text-sm font-semibold text-ink">Performance overview</p>
          <p className="mt-1 text-xs text-slate-500">Compare key workspace metrics over time</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <span className="font-medium">Date range</span>
          <select className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-sm text-ink outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" value={range} onChange={(event) => setRange(event.target.value)}>
            {Object.keys(ranges).map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Report summary statistics">
        <StatCard label="Total revenue" value="$582,430" change="14.2%" detail="compared to previous period" icon={Wallet} tone="green" />
        <StatCard label="Users acquired" value="2,480" change="12.8%" detail="compared to previous period" icon={UsersRound} tone="violet" />
        <StatCard label="Workspace growth" value="18.6%" change="2.1%" detail="compared to previous period" icon={TrendingUp} tone="blue" />
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card md:p-6" aria-labelledby="report-revenue-heading">
          <div className="mb-4">
            <h3 id="report-revenue-heading" className="font-semibold text-ink">Revenue and expenses</h3>
            <p className="mt-1 text-xs text-slate-500">Values shown in thousands of dollars · {range.toLowerCase()}</p>
          </div>
          <div className="h-[300px]" role="img" aria-label={`Bar chart comparing revenue and expenses for ${range.toLowerCase()}.`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData} margin={{ top: 8, right: 4, left: -18, bottom: 0 }} barGap={5}>
                <CartesianGrid stroke="#eef0f5" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} dy={8} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} tickFormatter={(value) => `$${value}k`} />
                <Tooltip formatter={(value, name) => [`$${value}k`, name]} contentStyle={{ borderRadius: 10, borderColor: "#e2e8f0", fontSize: 12 }} />
                <Legend verticalAlign="top" align="right" iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingBottom: 15 }} />
                <Bar dataKey="revenue" name="Revenue" fill="#6747dc" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="#cbd2df" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card md:p-6" aria-labelledby="report-users-heading">
          <div className="mb-4">
            <h3 id="report-users-heading" className="font-semibold text-ink">User growth</h3>
            <p className="mt-1 text-xs text-slate-500">Cumulative registered users · {range.toLowerCase()}</p>
          </div>
          <div className="h-[300px]" role="img" aria-label={`Area line chart of registered users over ${range.toLowerCase()}.`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="#eef0f5" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} dy={8} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 10, borderColor: "#e2e8f0", fontSize: 12 }} />
                <Line type="monotone" dataKey="users" name="Users" stroke="#6747dc" strokeWidth={2.5} dot={{ r: 3, fill: "#6747dc" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <p className="mt-4 text-xs text-slate-500">Report data is illustrative mock data for this workspace.</p>
    </div>
  );
}

export default Reports;
