import { Activity, ArrowRight, CircleDollarSign, UserCheck, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import ActivityList from "../components/dashboard/ActivityList";
import RevenueChart from "../components/dashboard/RevenueChart";
import StatCard from "../components/dashboard/StatCard";
import PageHeading from "../components/common/PageHeading";

function Dashboard() {
  return (
    <div>
      <PageHeading
        eyebrow="Monday, November 2, 2026"
        title="Good morning, Jordan"
        description="Here's what's happening across your workspace today."
      >
        <Link className="inline-flex h-10 items-center gap-2 rounded-lg bg-violet-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700" to="/reports">
          View reports <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </PageHeading>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Workspace statistics">
        <StatCard label="Total users" value="2,480" change="12.8%" detail="vs. last month" icon={UsersRound} tone="violet" />
        <StatCard label="Active users" value="1,892" change="8.2%" detail="vs. last month" icon={UserCheck} tone="blue" />
        <StatCard label="Revenue" value="$48,290" change="6.4%" detail="vs. last month" icon={CircleDollarSign} tone="green" />
        <StatCard label="Growth rate" value="18.6%" change="2.1%" detail="vs. last month" icon={Activity} tone="amber" />
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]">
        <RevenueChart />
        <ActivityList />
      </div>

      <section className="mt-5 flex flex-col gap-3 rounded-xl border border-violet-100 bg-violet-50/70 p-5 sm:flex-row sm:items-center sm:justify-between md:px-6" aria-labelledby="team-callout-heading">
        <div>
          <h3 id="team-callout-heading" className="font-semibold text-ink">Your team is growing</h3>
          <p className="mt-1 text-sm text-slate-600">Invite teammates to collaborate in one shared workspace.</p>
        </div>
        <Link className="inline-flex h-9 w-fit items-center gap-2 rounded-lg border border-violet-200 bg-white px-3 text-sm font-semibold text-violet-800 hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700" to="/users">
          Manage users <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}

export default Dashboard;