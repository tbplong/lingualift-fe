import {
  HomeIcon,
  DocumentIcon,
  PracticeIcon,
  TestIcon,
  ArrowLeft,
} from "@/components/icons";
import { useState, useEffect } from "react";
import Tuedangcap1 from "../../pages/home/Dashboard";
import Tuedangcap2 from "../../pages/home/Tuedangcap2";
import Tuedangcap3 from "../../pages/home/Tuedangcap3";
import Tuedangcap4 from "../../pages/home/Tuedangcap4";
const Tuedeptrai = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [huyngu, sett] = useState(1);
  const dangcapnguyentue = [
    {
      id: 1,
      name: "Trang Chủ",
      icon: <HomeIcon />,
      web_page: <Tuedangcap1 setPage={sett} />,
    },
    {
      id: 2,
      name: "Tài liệu",
      icon: <DocumentIcon className="fill-black" />,
      web_page: <Tuedangcap2 />,
    },
    {
      id: 3,
      name: "Luyện Tập",
      icon: <PracticeIcon className="fill-black" />,
      web_page: <Tuedangcap3 />,
    },
    {
      id: 4,
      name: "Thi Thử",
      icon: <TestIcon className="fill-black" />,
      web_page: <Tuedangcap4 />,
    },
  ];
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex h-screen sticky rounded top-0 relative">
        <div
          className={`${isOpen ? "w-48" : "w-20"} ${window.innerWidth < 768 && isOpen ? "hidden" : ""} bg-[rgb(244,247,249)] text-white rounded p-4 duration-300 relative transition-all`}
        >
          <ArrowLeft
            className={`rounded-full bg-black absolute -right-3 top-1/2 p-2 transition-transform duration-300 ${isOpen ? "w-10 h-10" : "rotate-180 w-8 h-8"} ${window.innerWidth < 768 ? "hidden" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          />
          <div className="flex items-center p-2 text-2xl relative">
            <img
              src="/image/abc.png"
              alt="LinguaLift Logo"
              className={`mb-6 rounded-lg object-cover hover:opacity-80 transition-all duration-300 cursor-pointer mx-auto ${
                isOpen ? "h-20 w-20" : "h-10 w-10"
              }`}
            />
          </div>

          <ul className="space-y-1">
            {dangcapnguyentue.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    sett(item.id);
                    if (window.innerWidth < 768) {
                      setIsOpen(false);
                    }
                  }}
                  className={` transform transition-transform duration-300 hover:scale-105 w-full px-4 py-2 text-[#3D4863] text-xl rounded-lg transition-colors flex items-center gap-3 h-16 ${
                    huyngu === item.id
                      ? "bg-[#E5E7DE] shadow-md"
                      : "hover:bg-[#E5E7DE]"
                  } ${isOpen ? "" : "justify-center"}`}
                  title={!isOpen ? item.name : undefined}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span
                    className={`text-[#3D4863] text-l flex-1 text-left transition-all duration-300 origin-left whitespace-nowrap ${
                      isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 w-0"
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content rac*/}
        <div
          className="flex-1 bg-white p-8"
          onClick={(e) => {
            if (window.innerWidth < 768 && e.target === e.currentTarget) {
              setIsOpen(!isOpen);
            }
          }}
        >
          {dangcapnguyentue.find((item) => item.id === huyngu)?.web_page}
        </div>
      </div>
    </>
  );
};

export default Tuedeptrai;
