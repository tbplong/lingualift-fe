export default function Hero() {
  return (
    <section className="min-h-dvh bg-primary-100/20 text-slate-900 pt-20 sm:pt-24 2xl:pt-28">
      <div className="relative isolate">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.65]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            color: "rgb(148 163 184)",
          }}
        />

        <div className="mx-auto w-full max-w-screen-2xl 2xl:max-w-[2000px] px-4 sm:px-6 2xl:px-8">
          <div
            className="relative grid grid-cols-1 items-center 2xl:items-start
                 gap-8 sm:gap-10 2xl:grid-cols-12 2xl:gap-12 
                 py-11 2xl:py-16"
          >
            <div className="order-1 2xl:order-2 2xl:col-span-5 2xl:col-start-2">
              <h1
                className="text-center 2xl:text-left font-extrabold leading-tight
                              text-4xl sm:text-5xl md:text-6xl
                              2xl:text-6xl"
              >
                Elevate your <br />
                <span className="text-primary-200">
                  Educational&nbsp;Journey
                </span>{" "}
                <br />
                with <br />
                <span className="text-primary-200">LINGUALIFT</span>
              </h1>

              <p
                className="mt-6 max-w-prose text-balance text-slate-600
                            text-lg sm:text-xl 2xl:text-2xl
                            text-center 2xl:text-left mx-auto"
              >
                World-class training <br /> and development programs <br />{" "}
                developed <br className="md:hidden" /> by top teachers.
              </p>

              <div className="mt-7 2xs:mt-0 flex flex-wrap items-center gap-6 2xl:gap-8 pt-8 justify-center 2xl:justify-start">
                <a
                  href="#"
                  className="inline-flex items-center rounded-full bg-primary text-white font-medium shadow-sm
                             px-5 py-3 text-sm
                             sm:px-6 sm:py-3.5 sm:text-lg
                             2xl:px-8 2xl:py-4 2xl:text-2xl
                             hover:bg-primary-700
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
                             active:scale-[0.99] transition whitespace-nowrap"
                >
                  Get Started
                </a>
                <a
                  href="#"
                  className="text-blue-700 underline-offset-4 hover:underline text-base sm:text-lg 2xl:text-2xl"
                >
                  Schedule a Call
                </a>
              </div>

              <div className="mt-6 sm:mt-8 md:mt-15 2xl:mt-20 2xl:col-span-6 2xl:col-start-1 2xl:self-start text-center">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-xl mx-auto 2xl:mx-0 2xl:max-w-none">
                  <div className="rounded-2xl bg-white p-5 sm:p-8 shadow-sm ring-1 ring-slate-950/5">
                    <dt className="text-slate-500 text-lg sm:text-2xl 2xl:text-3xl">
                      Courses Available
                    </dt>
                    <dd className="mt-1 sm:mt-2 text-2xl sm:text-3xl 2xl:text-4xl font-bold">
                      26,000+
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-white p-5 sm:p-8 shadow-sm ring-1 ring-slate-950/5">
                    <dt className="text-slate-500 text-lg sm:text-2xl 2xl:text-3xl">
                      Better Enhanced Programs
                    </dt>
                    <dd className="mt-1 sm:mt-2 text-2xl sm:text-3xl 2xl:text-4xl font-bold">
                      70%
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="order-2 2xl:order-2 2xl:col-span-6 2xl:col-start-7 relative w-full py-6 sm:py-0 2xl:py-12 mx-auto 2xl:ml-auto 2xl:mr-0 items-center">
              <div
                className="relative mx-auto aspect-[4.8/5] w-full
     max-w-[800px] xl:max-w-[880px] 2xl:max-w-[1020px] overflow-hidden"
              >
                <div
                  aria-hidden
                  className="
      pointer-events-none absolute inset-0 -z-10 grid place-items-center
      [--R:clamp(20rem,min(70vw,90%),56rem)]   /* ưu tiên 90% width của cột */
      2xl:[--R:clamp(22rem,min(60vw,90%),54rem)] /* desktop lớn: cap nhỏ hơn */
    "
                >
                  <div className="absolute rounded-full border-4 border-primary-100 size-[calc(var(--R)*0.78)]" />
                  <div className="absolute rounded-full border-4 border-primary-100 size-[calc(var(--R)*0.63)]" />
                  <div className="absolute rounded-full border-4 border-primary-100 size-[calc(var(--R)*0.48)]" />
                </div>

                <img
                  src="/ChatGPT Image 13_21_23 24 thg 9, 2025.png"
                  alt="Tutor"
                  className="absolute inset-x-0 mx-auto top-0 w-[60%] sm:w-[60%] xl:w-[70%] 2xl:translate-y-[-50px]"
                />

                <div
                  className="absolute left-[4%] top-[0%] 2xs:left-[0%] 2xs:top-[0] 2xs sm:left-[6%] sm:top-[30%]
                    2xl:left-[6%] 2xl:top-[24%]
                    bg-white px-3 py-2 sm:px-4 sm:py-2.5 2xl:px-5 2xl:py-3
                    rounded-xl shadow text-xs sm:text-sm 2xl:text-xl"
                >
                  180K+ <span className="text-slate-500 ">Active Students</span>
                </div>

                <a
                  href="#"
                  className="absolute right-[0%] top-[25%] 2xs:right-[3%] 2xs:top-[25%] md:right-[10%] lg:right-[3%] xl:right-[2%] 2xl:right-[3%]
                          flex items-center gap-2 text-slate-800"
                >
                  <span className="relative shrink-0">
                    <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
                    <span className="relative grid size-8 md:size-14 lg:size-16 xl:size-18 place-items-center rounded-full bg-primary ring-4 ring-blue-200/60 shadow">
                      <svg
                        viewBox="0 0 24 24"
                        fill="white"
                        className="size-6 sm:size-7 translate-x-[1px]"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                  <span className="font-semibold underline underline-offset-2 text-xs sm:text-sm 2xl:text-lg">
                    What’s EduVate?
                  </span>
                </a>

                <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2">
                  <div
                    className="relative rounded-xl bg-primary-600 px-4 py-2 sm:px-6 sm:py-3 text-white text-center shadow
                      text-xs sm:text-sm 2xl:text-2xl"
                  >
                    <p className="opacity-90">We are Trusted by</p>
                    <p className="font-semibold">1000+ Companies Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
