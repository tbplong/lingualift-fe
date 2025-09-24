import { HomeIcon, Video, DocumentIcon, PracticeIcon, TestIcon } from "./icons";

const Sidebar = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side flex">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="bg-white text-tertiary text-2xl min-h-full w-80 p-4 border-r-1 border-tertiary-300 gap-8 flex flex-col">
          {/* Sidebar content here */}
          <li className="group bg-primary text-white">
            <HomeIcon className="fill-white w-8 h-auto p-0 group-hover:fill-white" />
            <a className="group-hover:text-white font-bold">Lớp Học</a>
          </li>
          <li className="group">
            <Video className="fill-tertiary w-8 h-auto p-0 group-hover:fill-white" />
            <a className="group-hover:text-white">Video Bài Giảng</a>
          </li>
          <li className="group">
            <DocumentIcon className="fill-tertiary w-8 h-auto p-0 group-hover:fill-white" />
            <a className="group-hover:text-white">Tài Liệu</a>
          </li>
          <li className="group">
            <PracticeIcon className="fill-tertiary w-8 h-auto p-0 group-hover:fill-white" />
            <a className="group-hover:text-white">Luyện Tập</a>
          </li>
          <li className="group">
            <TestIcon className="fill-tertiary w-8 h-auto p-0 group-hover:fill-white" />
            <a className="group-hover:text-white">Thi Thử</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
