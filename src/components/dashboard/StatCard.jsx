import { ArrowDownRight, ArrowUpRight } from "lucide-react";

function StatCard({ label, value, change, detail, icon: Icon, tone = "violet", trend = "up" }) {
  const tones = {
    violet: "bg-violet-50 text-violet-700",
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-800",
  };
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <article className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-[28px] font-semibold leading-none tracking-tight text-ink">{value}</p>
        </div>
        <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${tones[tone]}`}>
          <Icon size={19} aria-hidden="true" />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
        <span className={`inline-flex items-center gap-0.5 font-semibold ${trend === "up" ? "text-emerald-700" : "text-rose-700"}`}>
          <TrendIcon size={14} aria-hidden="true" />{change}
        </span>
        <span className="text-slate-500">{detail}</span>
      </div>
    </article>
  );
}

export default StatCard;
