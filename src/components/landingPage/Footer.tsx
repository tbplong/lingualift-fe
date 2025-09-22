import "./App.css";
import "./index.css";
export function Footer() {
  return (
    <footer className="bg-gradient-to-r bg-primary to-blue-600 text-white/90 border-t border-white/10 w-full absolute bottom-0">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="!text-yellow-400 font-semibold mb-3">
              Thông tin liên hệ
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-white transition" href="tel:0392360785">
                  0392360785
                </a>
              </li>
              <li>
                <a
                  className="text-white transition"
                  href="mailto:thanhluancongviec123@gmail.com"
                >
                  thanhluancongviec123@gmail.com
                </a>
              </li>
              <li>Việt Nam</li>
            </ul>
          </div>

          <div>
            <h3 className="!text-yellow-400 font-semibold mb-3">Khoá học</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-white" href="#">
                  Danh sách khoá học
                </a>
              </li>
              <li>
                <a className="text-white" href="#">
                  Lịch khai giảng
                </a>
              </li>
              <li>
                <a className="text-white" href="#">
                  Hỗ trợ học viên
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="!text-yellow-400 font-semibold mb-3">
              Kết nối với thầy Luân
            </h3>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-blue-700 transition"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.4V12h2.4V9.7c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.5.7-1.5 1.4V12h2.6l-.4 2.9h-2.2v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Messenger"
                className="w-9 h-9 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-blue-700 transition"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 2C6.5 2 2 6 2 10.7c0 2.8 1.6 5.2 4.1 6.7v3.6l3.8-2.1c.7.1 1.4.2 2.1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm5 7.8-3.2 3.4-2.5-2.6-4.8 2.6 3.2-3.4 2.5 2.6L17 9.8z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-blue-700 transition"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M21 8.1a6.7 6.7 0 0 1-4.2-1.4v6.6a6 6 0 1 1-5.7-6v2.6a3.4 3.4 0 1 0 2.7 3.3V2h2.5a4.2 4.2 0 0 0 4.2 4.1v2z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-blue-700 transition"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12a31.8 31.8 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.8 31.8 0 0 0 24 12a31.8 31.8 0 0 0-.5-5.8zM9.8 15.5V8.5L15.8 12l-6 3.5z" />
                </svg>
              </a>
            </div>
            <p className="text-sm">
              Đối tác: <span className="font-medium">Fessior Community</span>
            </p>
          </div>

          {/* Cột 4 */}
          <div>
            <h3 className="!text-yellow-400 font-semibold mb-3">Về chúng tôi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-white" href="#">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a className="text-white" href="#">
                  Điều khoản & Bảo mật
                </a>
              </li>
              <li>
                <a className="text-white" href="#">
                  Tuyển dụng
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-white/10 text-xs text-white/60 flex justify-center">
          <p>Made with ❤️ by Move Education</p>
        </div>
      </div>
    </footer>
  );
}
