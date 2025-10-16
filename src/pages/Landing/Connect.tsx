import "../../index.css";
import "../../App.css";
import { YoutubeColor } from "../../components/icons";
import { YoutubeWhite } from "../../components/icons";

import { MessengerColor } from "../../components/icons";
import { MessengerWhite } from "../../components/icons";

import { FacebookColor, FacebookWhite } from "../../components/icons";

import { TiktokColor } from "../../components/icons";
import { TiktokWhite } from "../../components/icons";

export function Connect() {
  return (
    <section className="flex flex-col items-center py-10 mt-0 mb-8">
      <h2 className="px-4 text-center font-bold leading-tight text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl">
        <span className="text-secondary">KẾT NỐI</span>{" "}
        <span className="text-gray-700">VỚI</span>{" "}
        <span className="text-primary">Chúng Tôi</span>
      </h2>

      <div className="relative mt-6 sm:mt-8 w-[75vw] max-w-[1400px] mx-auto flex justify-center">
        <div className="relative bg-primary rounded-md px-4 sm:px-6 md:px-10 py-6 sm:py-10 md:py-14 w-full">
          <div className="absolute inset-0 translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4 bg-secondary rounded-md -z-10"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full">
            {[
              { W: FacebookWhite, C: FacebookColor },
              { W: MessengerWhite, C: MessengerColor },
              { W: TiktokWhite, C: TiktokColor },
              { W: YoutubeWhite, C: YoutubeColor },
            ].map(({ W, C }, i) => (
              <a
                key={i}
                className="
        group relative
        w-full aspect-square   /* chiếm full chiều ngang cột, luôn vuông */
        flex items-center justify-center rounded-xl
      "
              >
                <span className="absolute inset-0 rounded-xl border border-white/90 bg-primary-600" />
                <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <span className="absolute -left-full top-0 h-full w-1/2 bg-white/10 skew-x-[-20deg] transition-transform duration-500 group-hover:translate-x-[200%]" />
                </span>

                <div className="relative size-[60%] sm:size-[62%] md:size-[64%] rounded-full border border-white/70 bg-primary flex items-center justify-center transition-colors duration-200 group-hover:bg-white">
                  <W className="absolute inset-0 m-auto block size-[55%] text-white opacity-100 transition-opacity duration-200 group-hover:opacity-0" />
                  <C className="absolute inset-0 m-auto block size-[55%] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
