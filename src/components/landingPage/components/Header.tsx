import { useEffect, useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-[#E5E7EB] shadow-xl">
      <div className="mx-auto w-full max-w-7xl h-16 md:h-20 px-4 sm:px-6 lg:px-10 flex items-center">
        <a href="/" className="flex items-center gap-3 shrink-0">
          <span className="font-extrabold text-primary leading-none tracking-tight text-lg md:text-[28px]">
            MOVE
            <br className="hidden md:block" />
            EDUCATION
          </span>
        </a>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <button
            className="px-4 md:px-6 py-2 md:py-3 rounded bg-primary text-white text-sm md:text-[18px] font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 shadow-md hover:shadow-lg
"
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="px-10 py-3 border border-blue-600 text-blue-600 font-bold rounded-l-full rounded-br-full hover:bg-primary hover:text-white shadow-md hover:shadow-lg"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="slide-menu"
          >
            Menu
          </button>

          {/* ===== Overlay ===== */}
          <div
            className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
              menuOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setMenuOpen(false)}
          />

          <aside
            id="slide-menu"
            role="dialog"
            aria-modal="true"
            className={`fixed inset-0 z-[70] w-screen h-[100dvh]
                bg-gradient-to-br from-blue-50 to-white shadow-2xl
                transform-gpu will-change-transform
                transition-[transform,opacity,border-radius] ease-in-out
                ${
                  menuOpen
                    ? "translate-x-0 translate-y-0 opacity-100 duration-[1500ms]"
                    : "translate-x-full -translate-y-full opacity-0 duration-[1500ms]"
                }`}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100"
              aria-label="Đóng menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="mx-auto max-w-7xl h-full px-6 lg:px-12 py-10 md:py-16">
              <div className="grid grid-cols-12 gap-10 h-full">
                <nav className="col-span-12 lg:col-span-7 flex items-center">
                  <ul className="w-full space-y-6 md:space-y-9">
                    {[
                      { label: "KHOÁ HỌC", href: "/courses" },
                      { label: "TRANG HỌC TẬP", href: "/study" },
                      { label: "ĐỐI TÁC", href: "/partners" },
                    ].map((item) => (
                      <li key={item.label} className="group">
                        <a
                          href={item.href}
                          className="relative block text-[40px] md:text-6xl font-extrabold tracking-tight text-slate-800 leading-tight"
                        >
                          {item.label}
                          <span className="absolute left-0 -bottom-2 h-[3px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <p className="mt-2 text-slate-500 text-base md:text-lg opacity-0 group-hover:opacity-100 transition">
                          {item.label === "KHOÁ HỌC" &&
                            "Danh mục, lịch khai giảng, học phí"}
                          {item.label === "TRANG HỌC TẬP" &&
                            "Bài giảng, tài liệu, bài tập"}
                          {item.label === "ĐỐI TÁC" &&
                            "Kết nối trường học & doanh nghiệp"}
                        </p>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* RIGHT: CONTACT CARD */}
                <div className="col-span-12 lg:col-span-5 flex items-center">
                  <section
                    aria-labelledby="contact-title"
                    className="w-full rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-6 md:p-8 shadow-lg"
                  >
                    <h3
                      id="contact-title"
                      className="text-2xl md:text-3xl font-bold text-yellow-500"
                    >
                      Thông tin liên hệ
                    </h3>

                    <ul className="mt-5 space-y-4 text-slate-700">
                      <li className="flex items-center gap-3">
                        {/* phone icon */}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className="text-blue-600"
                        >
                          <path
                            fill="currentColor"
                            d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1 .3 2.1.5 3.2.5.7 0 1.2.5 1.2 1.2V20c0 .7-.5 1.2-1.2 1.2C10.6 21.2 2.8 13.4 2.8 3.2 2.8 2.5 3.3 2 4 2h3.4c.7 0 1.2.5 1.2 1.2 0 1.1.2 2.2.5 3.2.1.4 0 .9-.3 1.2l-2.2 2.2z"
                          />
                        </svg>
                        <a
                          href="tel:0392360785"
                          className="hover:text-blue-700"
                        >
                          0392360785
                        </a>
                      </li>
                      <li className="flex items-center gap-3">
                        {/* mail icon */}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className="text-blue-600"
                        >
                          <path
                            fill="currentColor"
                            d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5L4 8V6l8 5 8-5v2z"
                          />
                        </svg>
                        <a
                          href="mailto:lingualift@gmail.com"
                          className="truncate hover:text-blue-700"
                        >
                          lingualift@gmail.com
                        </a>
                      </li>
                      <li className="flex items-center gap-3">
                        {/* location icon */}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className="text-blue-600"
                        >
                          <path
                            fill="currentColor"
                            d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z"
                          />
                        </svg>
                        <span>Việt Nam</span>
                      </li>
                    </ul>

                    <div className="mt-8">
                      <div className="flex flex-wrap gap-3">
                        {[
                          {
                            label: "Facebook",
                            href: "#",
                            icon: "M10 20v-6h4v6m2 0h3a2 2 0 002-2v-7h-4V7a2 2 0 012-2h2V2h-3a5 5 0 00-5 5v4H10v9h6z",
                          },
                          {
                            label: "Messenger",
                            href: "#",
                            icon: "M12 2C6.5 2 2 6 2 10.5c0 2.5 1.2 4.7 3.1 6.2V22l3.2-1.8c1 .3 2 .4 3.1.4 5.5 0 10-4 10-8.5S17.5 2 12 2z",
                          },
                          {
                            label: "TikTok",
                            href: "#",
                            icon: "M15 3v2.8a4.8 4.8 0 003 1V9a6 6 0 01-3-1v6.2A5.2 5.2 0 119 9.2V12a2.8 2.8 0 102.8 2.8V3h3.2z",
                          },
                          {
                            label: "YouTube",
                            href: "#",
                            icon: "M10 15l5.5-3L10 9v6z M21 8s-.2-1.5-.8-2.2c-.6-.7-1.3-.7-1.6-.8C16.8 4.7 12 4.7 12 4.7h0s-4.8 0-6.6.3c-.3 0-1 .1-1.6.8C3.2 6.5 3 8 3 8s-.2 1.6-.2 3.2V13s0 1.6.2 3.2c.1.8.8 1.7 1.6 1.8 1.8.3 6.6.3 6.6.3s4.8 0 6.6-.3c.8-.1 1.5-1 1.6-1.8.2-1.6.2-3.2.2-3.2V11.2c0-1.6 0-3.2-.2-3.2z",
                          },
                        ].map((s) => (
                          <a
                            key={s.label}
                            href={s.href}
                            aria-label={s.label}
                            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-slate-300 bg-white hover:bg-blue-600 hover:text-white transition"
                            title={s.label}
                          >
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              className="fill-current"
                            >
                              <path d={s.icon} />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href="/contact"
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Liên hệ ngay
                      </a>
                      <a
                        href="/about"
                        className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50"
                      >
                        Về chúng tôi
                      </a>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </header>
  );
}
