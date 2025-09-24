import MoveProTicker from "./Marquee";

export default function Hero() {
  return (
    <div className="min-h-dvh bg-primary-100/20 text-slate-900 pt-24 md:pt-28">
      <div className="relative isolate ">
        <div className="mx-auto grid grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2 md:py-16 lg:py-0 ">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] mb-5"
            style={{
              backgroundImage:
                "radial-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              color: "rgb(148 163 184)",
            }}
          />

          <div className="w-full pl-70">
            <p className="text-4xl/tight font-extrabold text-slate-900 sm:text-5xl lg:text-7xl">
              Elevate your <br />
              <span className="text-primary-200">
                Educational{"\u00A0"}Journey
              </span>{" "}
              <br />
              with <br />
              <span className="text-primary-200">LINGUALIFT</span>
            </p>
            <p className="mt-6 max-w-prose text-balance text-slate-600 text-2xl ">
              World‑class training and <br /> development programs developed{" "}
              <br /> by top teachers.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-8 pt-10">
              <a
                href="#"
                className="
                                    inline-flex items-center rounded-full
                                    bg-primary text-white font-medium shadow-sm
                                    px-5 py-3 text-sm gap-2
                                    sm:px-6 sm:py-3.5 sm:text-base
                                    md:px-8 md:py-4 md:text-lg md:gap-3
                                    lg:px-10 lg:py-5 lg:text-xl
                                    hover:bg-primary-700
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
                                    active:scale-[0.99] transition
                                    whitespace-nowrap
                                "
              >
                Get Started
              </a>
              <a
                href="#"
                className="text-blue-700 underline-offset-4 hover:underline text-xl"
              >
                Schedule a Call
              </a>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-1 gap-6 text-sm pt-12 mb-15">
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-950/5">
                <dt className="text-slate-500 text-3xl inline-block">
                  Courses Available
                </dt>
                <dd className="mt-2 text-3xl font-bold">26,000+</dd>
              </div>
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-950/5">
                <dt className="text-slate-500 text-3xl">
                  Better Enhanced Programs
                </dt>
                <dd className="mt-2 text-3xl font-bold">70%</dd>
              </div>
            </div>
          </div>
          <div className="w-full relative  items-center flex justify-center pb-8 ">
            <img
              src="/ChatGPT_Image_17_17_43_24_thg_9__2025-removebg-preview.png"
              className="w-[60%] "
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 grid place-items-center justify-center"
            >
              <div className="absolute size-[60rem] rounded-full border-6 border-primary-100" />
              <div className="absolute size-[44rem] rounded-full border-6 border-primary-100" />
              <div className="absolute size-[28rem] rounded-full border-6 border-primary-100" />
              <div className="absolute size-[12rem] rounded-full border-6 border-primary-100" />
            </div>
            <div className="absolute left-20 top-50 z-20 rounded-xl bg-white px-10 py-6 font-medium shadow-sm backdrop-blur text-2xl">
              180K+ <span className="text-slate-500">Active Students</span>
            </div>
            <a
              href="#"
              className="absolute right-38 top-30 inline-flex items-center  text-slate-800 hover:text-slate-900 whitespace-nowrap justify-between gap-6"
            >
              {/* Nút play + sóng (không làm giãn layout) */}
              <span className="relative shrink-0">
                {/* sóng – tuyệt đối để KHÔNG chiếm chỗ */}
                <span className="pointer-events-none absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
                <span className="pointer-events-none absolute inset-0 rounded-full bg-blue-500/20 animate-ping [animation-delay:400ms]" />
                {/* nút tròn */}
                <span className="relative grid size-18 place-items-center rounded-full bg-blue-600 ring-4 ring-blue-200/60 shadow-md">
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    className="size-12 translate-x-[1px]"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>

              {/* chữ ngay cạnh icon */}
              <span className="-ml-0.5 leading-none font-semibold underline underline-offset-[3px] text-2xl">
                What’s EduVate?
              </span>
            </a>
            <div className="absolute bottom-75 left-[-100px] ">
              <div className="mx-auto ">
                <div className="flex items-center gap-24 overflow-x-auto rounded-2xl p-5">
                  {/* Ribbon bên trái */}
                  <div className="relative isolate shrink-0">
                    <div className="rounded-l-2xl rounded-r-md bg-primary-600 px-5 py-4 text-white shadow">
                      <p className="text-2xl opacity-90">We are Trusted by</p>
                      <p className="text-2xl font-semibold">
                        1000+ Companies Worldwide
                      </p>
                    </div>
                    {/* mũi tên */}
                    <span className="absolute right-[-14px] top-1/2 -z-10 size-7 -translate-y-1/2 rotate-45 rounded bg-blue-600 shadow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative"></div>
        </div>
        <div className="relative">
          <div className="absolute left-0 right-0 bottom-4 z-30">
            <MoveProTicker />
          </div>
        </div>
      </div>
    </div>
  );
}
