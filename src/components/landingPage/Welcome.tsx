type Props = { name?: string; onBuy?: () => void; onLearnMore?: () => void };

export default function WelcomeCard({
  name = "Truong Xuan Sang",
  onBuy,
  onLearnMore,
}: Props) {
  return (
    <section className="w-full rounded-3xl bg-white p-6 sm:p-8 lg:p-10 shadow-sm ring-1 ring-black/5">
      {/* Header */}
      <p className="text-sm text-slate-500">12 May 2022, Friday</p>
      <h3 className="mt-2 text-2xl lg:text-3xl font-semibold text-slate-800">
        Welcome back, <span className="font-bold">{name}</span>!
      </h3>
      <p className="mt-2 text-slate-600 max-w-3xl">
        New English speaking classes are available. It is available for B1 and
        B2 beginner.
        <button
          onClick={onLearnMore}
          className="ml-1 text-primary hover:underline"
          type="button"
        >
          Learn more
        </button>
      </p>

      <div className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          <div className="rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-6 text-center">
            <div className="text-3xl font-bold text-slate-800">0</div>
            <div className="mt-1 text-sm text-slate-500">Lessons</div>
          </div>
          <div className="rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-6 text-center">
            <div className="text-3xl font-bold text-slate-800">0%</div>
            <div className="mt-1 text-sm text-slate-500">Progress</div>
          </div>
          <div className="rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-6 text-center">
            <div className="text-3xl font-bold text-slate-800">0</div>
            <div className="mt-1 text-sm text-slate-500">Reminders</div>
          </div>
        </div>

        <div className="mt-7">
          <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
            <span>Course Progress</span>
            <span>0%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full w-[0%] bg-primary rounded-full" />
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-4">
          <button
            onClick={onBuy}
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-base lg:text-lg font-semibold text-white hover:bg-primary-1200"
            type="button"
          >
            Buy Lesson
          </button>
          <button
            className="inline-flex items-center justify-center rounded-full ring-1 ring-slate-300 px-7 py-3.5 text-base lg:text-lg font-semibold text-slate-700 hover:bg-slate-50"
            type="button"
          >
            Continue Last Lesson
          </button>
        </div>
      </div>
    </section>
  );
}
