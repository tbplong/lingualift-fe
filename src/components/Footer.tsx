import { YoutubeColor, YoutubeWhite } from "./icons";
import { MessengerColor, MessengerWhite } from "./icons";
import { FacebookColor } from "./icons";
import { TiktokColor, TiktokWhite } from "./icons";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-primary text-white/90 border-t border-white/10 w-full "
    >
      <div className="mx-auto w-full max-w-[102rem] px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-30">
          {/* Column 1: Contact */}
          <div className="min-w-0">
            <h3 className="text-yellow-400 font-bold mb-4 text-3xl">
              Thông tin liên hệ
            </h3>
            <ul className="space-y-3 text-lg leading-relaxed">
              <li>
                <a
                  className="text-white transition hover:text-yellow-300 text-2xl"
                  href="tel:0392360785"
                >
                  0392360785
                </a>
              </li>
              <li>
                <a className="text-white transition hover:text-yellow-300 block max-w-full break-all text-xl">
                  thanhluancongviec123@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Courses */}
          <div>
            <h3 className="text-yellow-400 font-bold mb-4 text-3xl">
              Thông tin khoá học
            </h3>
            <a className="text-white hover:text-yellow-300 text-2xl" href="#">
              Danh sách khoá học
            </a>
          </div>

          {/* Column 3: Social */}
          <div className="flex flex-col sm:col-span-2 md:col-span-1">
            <h3 className="text-yellow-400 font-bold mb-4 text-3xl">
              Kết nối với thầy Luân
            </h3>
            <div className="flex flex-wrap gap-4 mb-6">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="group relative size-12 aspect-square shrink-0 leading-none rounded-full border border-white/70 bg-primary inline-flex items-center justify-center transition-colors duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <YoutubeWhite className="absolute inset-0 m-auto block size-6 text-white opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
                <FacebookColor className="absolute inset-0 m-auto block size-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>

              {/* Messenger */}
              <a
                href="#"
                aria-label="Messenger"
                className="group relative size-12 aspect-square shrink-0 leading-none rounded-full border border-white/70 bg-primary inline-flex items-center justify-center transition-colors duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <MessengerWhite className="absolute inset-0 m-auto block size-6 text-white opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
                <MessengerColor className="absolute inset-0 m-auto block size-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>

              {/* TikTok */}
              <a
                href="#"
                aria-label="TikTok"
                className="group relative size-12 aspect-square shrink-0 leading-none rounded-full border border-white/70 bg-primary inline-flex items-center justify-center transition-colors duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <TiktokWhite className="absolute inset-0 m-auto block size-6 text-white opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
                <TiktokColor className="absolute inset-0 m-auto block size-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="group relative size-12 aspect-square shrink-0 leading-none rounded-full border border-white/70 bg-primary inline-flex items-center justify-center transition-colors duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <YoutubeWhite className="absolute inset-0 m-auto block size-6 text-white opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
                <YoutubeColor className="absolute inset-0 m-auto block size-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </div>
            <p className="text-lg">
              Đối tác: <span className="font-semibold">Fessior Community</span>
            </p>
          </div>

          {/* Column 4: About */}
          <div>
            <h3 className="text-yellow-400 font-bold mb-4 text-3xl">
              Về chúng tôi
            </h3>
            <ul className="space-y-3 text-lg leading-relaxed">
              <li>
                <a className="text-white hover:text-yellow-300" href="#">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a className="text-white hover:text-yellow-300" href="#">
                  Điều khoản & Bảo mật
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

        <div className="mt-12 pt-6 border-t border-white/10 text-base text-white/70 flex justify-center">
          <p>
            Made with <span aria-hidden>❤️</span> by Move Education
          </p>
        </div>
      </div>
    </footer>
  );
}
