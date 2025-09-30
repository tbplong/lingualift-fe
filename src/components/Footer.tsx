import { YoutubeColor, YoutubeWhite } from "./icons";
import { MessengerColor, MessengerWhite } from "./icons";
import { FacebookColor } from "./icons";
import { TiktokColor, TiktokWhite } from "./icons";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-primary text-white/90 border-t border-white/10 w-full"
    >
      <div className="mx-auto w-full max-w-[102rem] px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
        {/* Mobile: center everything; ≥sm: left align */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-30 place-items-center sm:place-items-start text-center sm:text-left">
          {/* Column 1: Contact */}
          <div className="min-w-0">
            <h3 className="text-yellow-400 font-bold mb-4 text-2xl sm:text-3xl">
              Thông tin liên hệ
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-base sm:text-lg leading-relaxed">
              <li>
                <a
                  className="text-white transition hover:text-yellow-300 text-lg sm:text-2xl"
                  href="tel:0392360785"
                >
                  0392360785
                </a>
              </li>
              <li>
                <a
                  className="text-white transition hover:text-yellow-300 block max-w-full break-all text-base sm:text-xl"
                  href="mailto:sang.truong2005@hcmut.edu.vn"
                >
                  sang.truong2005@hcmut.edu.vn
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Courses */}
          <div>
            <h3 className="text-yellow-400 font-bold mb-4 text-2xl sm:text-3xl">
              Thông tin khoá học
            </h3>
            <a
              className="text-white hover:text-yellow-300 text-lg sm:text-2xl"
              href="#"
            >
              Danh sách khoá học
            </a>
          </div>

          {/* Column 3: Social */}
          <div className="flex flex-col sm:col-span-2 md:col-span-1">
            <h3 className="text-yellow-400 font-bold mb-4 text-2xl sm:text-3xl">
              Kết nối với Chúng Tôi
            </h3>
            <div className="flex flex-wrap gap-4 mb-4 justify-center sm:justify-start">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="group relative size-11 sm:size-12 aspect-square shrink-0 leading-none rounded-full border border-white/70 bg-primary inline-flex items-center justify-center transition-colors duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <YoutubeWhite className="absolute inset-0 m-auto block size-5 sm:size-6 text-white opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
                <FacebookColor className="absolute inset-0 m-auto block size-5 sm:size-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>

              {/* Messenger */}
              <a
                href="#"
                aria-label="Messenger"
                className="group relative size-11 sm:size-12 aspect-square shrink-0 leading-none rounded-full border border-white/70 bg-primary inline-flex items-center justify-center transition-colors duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <MessengerWhite className="absolute inset-0 m-auto block size-5 sm:size-6 text-white opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
                <MessengerColor className="absolute inset-0 m-auto block size-5 sm:size-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>

              {/* TikTok */}
              <a
                href="#"
                aria-label="TikTok"
                className="group relative size-11 sm:size-12 aspect-square shrink-0 leading-none rounded-full border border-white/70 bg-primary inline-flex items-center justify-center transition-colors duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <TiktokWhite className="absolute inset-0 m-auto block size-5 sm:size-6 text-white opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
                <TiktokColor className="absolute inset-0 m-auto block size-5 sm:size-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="group relative size-11 sm:size-12 aspect-square shrink-0 leading-none rounded-full border border-white/70 bg-primary inline-flex items-center justify-center transition-colors duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <YoutubeWhite className="absolute inset-0 m-auto block size-5 sm:size-6 text-white opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
                <YoutubeColor className="absolute inset-0 m-auto block size-5 sm:size-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* Column 4: About */}
          <div>
            <h3 className="text-yellow-400 font-bold mb-4 text-2xl sm:text-3xl">
              Về chúng tôi
            </h3>
            <ul className="space-y-2 sm:space-y-3 leading-relaxed text-base sm:text-xl">
              <li>
                <a className="text-white hover:text-yellow-300" href="#">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a className="text-white hover:text-yellow-300" href="#">
                  Điều khoản &amp; Bảo mật
                </a>
              </li>
              <li>
                <a className="text-white hover:text-yellow-300" href="#">
                  Tuyển dụng
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="mt-12 pt-6 border-t border-white/10 text-base text-white/70 flex justify-center">
          <p>
            Made with <span aria-hidden>❤️</span> by Move Education
          </p>
        </div> */}
      </div>
    </footer>
  );
}
