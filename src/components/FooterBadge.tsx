export function FooterBadgeRow() {
  return (
    <div className="w-full bg-white mb-30">
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8 ">
        <a
          href="#"
          className="absolute left-1/2 -translate-x-1/2 inline-flex items-center gap-3 rounded-sm bg-primary-1200 px-14 py-5 text-white shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <span className="text-sm font-semibold tracking-wide">
            Powered by{" "}
            <span className="font-extrabold text-3xl">Fessior Community</span>
          </span>
        </a>
      </div>
    </div>
  );
}
