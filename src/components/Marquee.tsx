export default function MoveProTicker() {
  const items = Array.from({ length: 30 }, () => "MOVE PRO");

  return (
    <div className="relative h-18 w-full overflow-hidden bg-primary text-white">
      <div className="marquee absolute left-0 top-0 flex h-full w-[200%] items-center">
        <Row items={items} />
        <Row items={items} />
      </div>

      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* dịch đúng 1 nửa vì w=200% */
        }
        .marquee  { animation: scroll-left 18s linear infinite; }
        .marquee2 { animation: scroll-left 18s linear infinite; animation-delay: 9s; }
      `}</style>
    </div>
  );
}

function Row({ items }: { items: string[] }) {
  return (
    <div className="flex shrink-0 items-center whitespace-nowrap">
      {items.map((t, i) => (
        <span
          key={i}
          className="px-10 font-extrabold tracking-wide text-white"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
