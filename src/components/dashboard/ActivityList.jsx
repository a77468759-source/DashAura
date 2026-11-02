import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { activities } from "../../data/mockData";

function ActivityList() {
  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card md:p-6" aria-labelledby="activity-heading">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h3 id="activity-heading" className="font-semibold text-ink">Recent activity</h3>
          <p className="mt-1 text-xs text-slate-500">The latest updates from your team</p>
        </div>
        <Link className="inline-flex items-center gap-1 text-xs font-semibold text-violet-700 hover:text-violet-900 focus-visible:rounded" to="/users">View users <ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
      <ul className="divide-y divide-slate-100">
        {activities.map((activity) => (
          <li key={activity.name} className="flex items-center gap-3 py-3.5">
            <span className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-semibold ${activity.color}`} aria-hidden="true">{activity.initials}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{activity.name}</p>
              <p className="truncate text-xs text-slate-500">{activity.action}</p>
            </div>
            <time className="shrink-0 text-[11px] text-slate-400">{activity.time}</time>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ActivityList;
