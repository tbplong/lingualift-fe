import { useState } from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Award,
  User,
} from "lucide-react";

export default function RightPane() {
  const user = {
    name: "Truong Xuan Sang",
    role: "Student",
    location: "HCM, Vietnam",
    level: "B2 Upper-Intermediate",
    avatar: "../../../public/photo-1-16306417221131994914891.webp",
  };

  const today = new Date();
  const [viewYear, setViewYear] = useState<number>(today.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(today.getMonth());

  function nextMonth() {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }
  function prevMonth() {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }

  function getCalendarMatrix(year: number, month: number) {
    const first = new Date(year, month, 1);
    const startDay = (first.getDay() + 6) % 7; // Monday = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const cells: { day: number; inMonth: boolean; date: Date }[] = [];

    // leading from prev month
    for (let i = 0; i < startDay; i++) {
      const d = prevMonthDays - startDay + 1 + i;
      cells.push({
        day: d,
        inMonth: false,
        date: new Date(year, month - 1, d),
      });
    }
    // current month
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, inMonth: true, date: new Date(year, month, d) });
    }
    // trailing to fill 42 cells
    while (cells.length < 42) {
      const d = cells.length - (startDay + daysInMonth) + 1;
      cells.push({
        day: d,
        inMonth: false,
        date: new Date(year, month + 1, d),
      });
    }
    return cells;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const matrix = getCalendarMatrix(viewYear, viewMonth);

  function isSameDate(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  const highlighted = [5, 12, 18, 23, 29].map(
    (d) => new Date(viewYear, viewMonth, d),
  );

  return (
    <aside className="w-full max-w-xl 2xl:max-w-2xl space-y-8 inline-block">
      {/* PROFILE CARD */}
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-45 w-45 rounded-full object-cover ring-4 ring-white shadow"
            />
            <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center rounded-full bg-primary px-3 py-1 text-sm font-medium text-white shadow">
              Profile
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-bold text-slate-800">
            {user.name}
          </h3>
          <p className="text-base text-slate-500">{user.role}</p>

          <div className="mt-5 grid w-full grid-cols-3 gap-3 text-left text-base">
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
              <User className="h-5 w-5" />
              <span>{user.level}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
              <MapPin className="h-5 w-5" />
              <span className="truncate">{user.location}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
              <Award className="h-5 w-5" />
              <span>12 badges</span>
            </div>
          </div>

          <button className="mt-6 inline-flex items-center justify-center rounded-full bg-primary-1200 px-6 py-3 text-base font-semibold text-white transition hover:bg-primary">
            Profile
          </button>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <header className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              {new Date().toLocaleDateString(undefined, { weekday: "long" })}
            </p>
            <h4 className="text-lg font-semibold text-slate-800">
              {months[viewMonth]} {viewYear}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Prev month"
              onClick={prevMonth}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-slate-200 hover:bg-slate-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next month"
              onClick={nextMonth}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-slate-200 hover:bg-slate-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-7 gap-2 text-center text-sm text-slate-500">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-2">
          {matrix.map((cell, idx) => {
            const isToday = isSameDate(cell.date, today);
            const isMarked = highlighted.some((d) => isSameDate(d, cell.date));
            const inMonth = cell.inMonth;

            return (
              <div
                key={idx}
                className={[
                  "relative aspect-square select-none rounded-xl",
                  inMonth ? "bg-slate-50" : "bg-white",
                  "ring-1 ring-slate-200",
                  "flex items-center justify-center",
                  isToday && "outline-3 outline-primary-1200 ",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span
                  className={[
                    "text-base font-medium",
                    inMonth ? "text-slate-800" : "text-slate-300",
                  ].join(" ")}
                >
                  {cell.day}
                </span>
                {isMarked && (
                  <span className="absolute bottom-1 h-2 w-2 rounded-full bg-primary-1200" />
                )}
              </div>
            );
          })}
        </div>

        {/* Reminders */}
        <div className="mt-7 space-y-3">
          {[
            { title: "Eng – Vocabulary test", date: "12 Dec 2022, Friday" },
            { title: "Eng – Essay", date: "12 Dec 2022, Friday" },
          ].map((r, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4 text-base ring-1 ring-slate-200"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-slate-200">
                <Bell className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-800">{r.title}</p>
                <p className="truncate text-sm text-slate-500">{r.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
