import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  progressPercent?: number; // 0..100
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  progressPercent = 0,
}: StatCardProps) {
  const clamped = Math.max(0, Math.min(100, progressPercent));

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white shadow-sm">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-black tracking-wide text-slate-500">
              {title}
            </div>

            <div className="mt-2 text-3xl font-black text-slate-900">
              {value}
            </div>

            <div className="mt-1 text-xs font-medium text-slate-400">
              {subtitle}
            </div>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
            {icon}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/40 p-4">
          <div className="h-1.5 w-full rounded-full bg-slate-200/70">
            <div
              className="h-1.5 rounded-full bg-primary transition-all"
              style={{ width: `${clamped}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
