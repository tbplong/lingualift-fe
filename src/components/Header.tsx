import { YoutubeColor } from "./icons";
import { YoutubeWhite } from "./icons";

import { MessengerColor } from "./icons";
import { MessengerWhite } from "./icons";

import { FacebookColor } from "./icons";

import { TiktokColor } from "./icons";
import { TiktokWhite } from "./icons";

export function Connect() {
  return (
    <section className="flex flex-col items-center py-10 mt-85">
      {/* Tiêu đề */}
      <h2 className="text-8xl font-bold">
        <span className="text-secondary">KẾT NỐI</span>{" "}
        <span className="text-gray-700">VỚI</span>{" "}
        <span className="text-primary">THẦY LUÂN</span>
      </h2>

      {/* Hộp chứa icon */}
      <div className="relative mt-15">
        {/* Bóng nền vàng */}
        <div className="absolute -bottom-4 left-2 w-452 h-85 bg-secondary rounded-md"></div>

        {/* Box chính */}
        <div className="relative bg-primary rounded-md p-6 flex gap-14 w-450 h-85 justify-center items-center">
          {/* Facebook */}
          <a className="group relative w-55 h-55 flex items-center justify-center rounded-xl">
            {/* border nền mờ */}
            <span className="absolute inset-0 rounded-xl border border-white bg-blue-600" />
            {/* dải quét */}
            <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <span className="absolute -left-full top-0 h-full w-1/2 bg-white/10 skew-x-[-20deg] transition-transform duration-500 group-hover:translate-x-[200%]" />
            </span>

            <div className="relative w-35 h-35 rounded-full border border-white/70 bg-primary flex items-center justify-center transition-colors duration-200 group-hover:bg-white">
              <YoutubeWhite className="absolute inset-0 m-auto block size-20 text-white opacity-100 transition-opacity duration-200 group-hover:opacity-0" />
              <FacebookColor className="absolute inset-0 m-auto block size-20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </div>
          </a>

          {/* Messenger */}
          <a className="group relative w-55 h-55 flex items-center justify-center rounded-xl ">
            {/* border nền mờ */}
            <span className="absolute inset-0 rounded-xl border border-white bg-blue-600" />
            {/* dải quét */}
            <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <span className="absolute -left-full top-0 h-full w-1/2 bg-white/10 skew-x-[-20deg] transition-transform duration-500 group-hover:translate-x-[200%]" />
            </span>

            <div className="relative w-35 h-35 rounded-full border border-white/70 bg-primary flex items-center justify-center transition-colors duration-200 group-hover:bg-white">
              <MessengerWhite className="absolute inset-0 m-auto block size-20 text-white opacity-100 transition-opacity duration-200 group-hover:opacity-0" />
              <MessengerColor className="absolute inset-0 m-auto block size-20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </div>
          </a>

          {/* TikTok */}
          <a className="group relative w-55 h-55 flex items-center justify-center rounded-xl ">
            {/* border nền mờ */}
            <span className="absolute inset-0 rounded-xl border border-white bg-blue-600" />
            {/* dải quét */}
            <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <span className="absolute -left-full top-0 h-full w-1/2 bg-white/10 skew-x-[-20deg] transition-transform duration-500 group-hover:translate-x-[200%]" />
            </span>

            <div className="relative w-35 h-35 rounded-full border border-white bg-primary flex items-center justify-center transition-colors duration-200 group-hover:bg-white">
              <TiktokWhite className="absolute inset-0 m-auto block size-20 text-white opacity-100 transition-opacity duration-200 group-hover:opacity-0" />
              <TiktokColor className="absolute inset-0 m-auto block size-20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </div>
          </a>

          <a className="group relative w-55 h-55 flex items-center justify-center rounded-xl ">
            {/* border nền mờ */}
            <span className="absolute inset-0 rounded-xl border border-white bg-blue-600" />
            {/* dải quét */}
            <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <span className="absolute -left-full top-0 h-full w-1/2 bg-white/10 skew-x-[-20deg] transition-transform duration-500 group-hover:translate-x-[200%]" />
            </span>

            <div className="relative w-35 h-35 rounded-full border border-white bg-primary flex items-center justify-center transition-colors duration-200 group-hover:bg-white">
              <YoutubeWhite className="absolute inset-0 m-auto block size-20 text-white opacity-100 transition-opacity duration-200 group-hover:opacity-0" />
              <YoutubeColor className="absolute inset-0 m-auto block size-20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
