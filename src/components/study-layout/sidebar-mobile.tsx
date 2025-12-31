import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ReactNode, useMemo } from "react";

import {
  ChatIcon,
  AccessLevelIcon,
  AnalyticsIcon,
  DocumentIcon,
  HistoryIcon,
  HomeIcon,
  LogoColoredText,
  PracticeIcon,
  ProfileIcon,
  SchoolIcon,
  SidebarToggleIcon,
  StorageIcon,
  TestIcon,
  WalletIcon,
  WorkIcon,
  LibraryIcon,
  FireIcon,
  // FireIcon,
} from "@/components/icons";
// import { PRODUCTION } from '@/config/env';
import {
  // FACEBOOK_GROUP_URL,
  // GROUP_FACEBOOK_URL,
  // GROUP_ZALO_URL,
  MESSENGER_URL,
} from "@/constants";
// import { useUserStore } from '@/stores';

type ItemProps = {
  isComingSoon?: boolean;
  name: string;
  route: string;
  children: ReactNode;
  current: string;
};

const Item = ({ isComingSoon, name, route, children, current }: ItemProps) => {
  const selected = useMemo(() => {
    return current.startsWith(route);
  }, [current, route]);

  if (isComingSoon)
    return (
      <div
        className={` ${selected ? "bg-primary font-bold text-white" : ""} group relative flex h-14 w-full cursor-not-allowed flex-row items-center gap-4 overflow-x-hidden rounded-lg p-4 duration-200 ease-in-out hover:bg-tertiary-300 hover:text-white`}
      >
        {children}
        <span className="flex group-hover:hidden">{name}</span>
        <span className="hidden font-bold opacity-0 group-hover:flex group-hover:opacity-100">
          SẮP RA MĂT
        </span>
      </div>
    );

  return (
    <Link
      to={route}
      className={` ${selected ? "bg-primary font-bold text-white" : ""} group relative flex h-14 w-full flex-row items-center gap-4 overflow-x-hidden rounded-lg p-4 duration-200 ease-in-out hover:bg-primary-300 hover:text-white`}
    >
      {children}
      {name}
    </Link>
  );
};

type SidebarMobileProps = {
  isManager?: boolean;
  opened: boolean;
  close: () => void;
};

const SidebarMobile = ({ isManager, opened, close }: SidebarMobileProps) => {
  const router = useRouterState();
  const navigate = useNavigate();

  // const { isStudent } = useUserStore();

  return (
    <>
      <div
        className={`${opened ? "fixed" : "hidden"} left-0 top-0 z-[99] h-screen w-screen cursor-pointer bg-[#00000080] xl:hidden`}
        onClick={close}
      />
      <div
        className={`${opened ? "left-0" : "-left-full"} fixed top-0 z-[99] flex h-screen w-80 flex-col justify-between gap-5 overflow-hidden overflow-y-scroll border-r border-solid border-tertiary-300 bg-white p-5 duration-200 ease-in-out md:w-[22.5rem] xl:hidden`}
      >
        <div className="flex w-full flex-col gap-5 overflow-hidden overflow-y-scroll">
          <div className="relative flex h-20 w-full flex-row items-center justify-between md:h-20 3xl:h-24">
            <LogoColoredText
              onClick={() => navigate({ to: "/" })}
              className="relative h-6 w-auto cursor-pointer md:h-8"
            />
            <SidebarToggleIcon
              onClick={close}
              className="relative size-8 cursor-pointer fill-tertiary"
            />
          </div>
          <div className="relative flex flex-col gap-2">
            <Link
              to={"/"}
              className={`${opened ? "justify-start" : "max-w-14 justify-center"} group relative flex h-14 w-full flex-row items-center gap-4 overflow-x-hidden rounded-lg border-[0.5px] bg-secondary p-4 font-bold text-white duration-200 ease-in-out hover:bg-secondary-700`}
            >
              <TestIcon className="me-4 fill-white" />
              <span
                className={`${opened ? "flex" : "hidden"} overflow-hidden truncate`}
              >
                Thi thử ngay
              </span>
              <FireIcon className="size-6 fill-red" />
            </Link>
            {/* <Link
              to={FACEBOOK_GROUP_URL}
              target="_blank"
              className={`${opened ? 'justify-start' : 'max-w-14 justify-center'} group relative flex h-14 w-full flex-row items-center gap-4 overflow-x-hidden rounded-lg border-[0.5px] bg-facebook p-4 font-bold text-white duration-200 ease-in-out hover:bg-primary-700`}
            >
              <div className="relative flex size-6 items-center justify-center rounded-full bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="800px"
                  width="800px"
                  version="1.1"
                  id="Layer_1"
                  viewBox="0 0 310 310"
                  className="relative size-4 fill-facebook duration-200  ease-in-out group-hover:fill-primary-700"
                >
                  <g id="XMLID_834_">
                    <path
                      id="XMLID_835_"
                      d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064   c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996   V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545   C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703   c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z"
                    />
                  </g>
                </svg>
              </div>
              <span
                className={`${opened ? 'flex' : 'hidden'} overflow-hidden truncate`}
              >
                Nhóm cày đề Tiếng Anh
              </span>
            </Link> */}
            {/* {isStudent && (
              <>
                <Link
                  to={GROUP_FACEBOOK_URL}
                  target="_blank"
                  className={`${opened ? 'justify-start' : 'max-w-14 justify-center'} group relative flex h-14 w-full flex-row items-center gap-4 overflow-x-hidden rounded-lg border-[0.5px] bg-yellow p-4 font-bold text-white duration-200 ease-in-out hover:bg-yellow-700`}
                >
                  <div className="relative flex size-6 items-center justify-center rounded-full bg-facebook">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="800px"
                      width="800px"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 310 310"
                      className="relative size-4 fill-white duration-200  ease-in-out"
                    >
                      <g id="XMLID_834_">
                        <path
                          id="XMLID_835_"
                          d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064   c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996   V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545   C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703   c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z"
                        />
                      </g>
                    </svg>
                  </div>
                  <span
                    className={`${opened ? 'flex' : 'hidden'} overflow-hidden truncate`}
                  >
                    Nhóm Facebook kín
                  </span>
                </Link>
                <Link
                  to={GROUP_ZALO_URL}
                  target="_blank"
                  className={`${opened ? 'justify-start' : 'max-w-14 justify-center'} group relative flex h-14 w-full flex-row items-center gap-4 overflow-x-hidden rounded-lg border-[0.5px] bg-yellow p-4 font-bold text-white duration-200 ease-in-out hover:bg-yellow-700`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    className="size-6 duration-200 ease-in-out xs:size-8"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.782 0.166016H27.199C33.2653 0.166016 36.8103 1.05701 39.9572 2.74421C43.1041 4.4314 45.5875 6.89585 47.2557 10.0428C48.9429 13.1897 49.8339 16.7347 49.8339 22.801V27.1991C49.8339 33.2654 48.9429 36.8104 47.2557 39.9573C45.5685 43.1042 43.1041 45.5877 39.9572 47.2559C36.8103 48.9431 33.2653 49.8341 27.199 49.8341H22.8009C16.7346 49.8341 13.1896 48.9431 10.0427 47.2559C6.89583 45.5687 4.41243 43.1042 2.7442 39.9573C1.057 36.8104 0.166016 33.2654 0.166016 27.1991V22.801C0.166016 16.7347 1.057 13.1897 2.7442 10.0428C4.43139 6.89585 6.89583 4.41245 10.0427 2.74421C13.1707 1.05701 16.7346 0.166016 22.782 0.166016Z"
                      className="fill-zalo duration-200 ease-in-out"
                    />
                    <path
                      opacity="0.12"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M49.8336 26.4736V27.1994C49.8336 33.2657 48.9427 36.8107 47.2555 39.9576C45.5683 43.1045 43.1038 45.5879 39.9569 47.2562C36.81 48.9434 33.265 49.8344 27.1987 49.8344H22.8007C17.8369 49.8344 14.5612 49.2378 11.8104 48.0966L7.27539 43.4267L49.8336 26.4736Z"
                      className="fill-zalo-700 duration-200 ease-in-out"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.779 43.5892C10.1019 43.846 13.0061 43.1836 15.0682 42.1825C24.0225 47.1318 38.0197 46.8954 46.4923 41.4732C46.8209 40.9803 47.1279 40.4677 47.4128 39.9363C49.1062 36.7779 50.0004 33.22 50.0004 27.1316V22.7175C50.0004 16.629 49.1062 13.0711 47.4128 9.91273C45.7385 6.75436 43.2461 4.28093 40.0877 2.58758C36.9293 0.894239 33.3714 0 27.283 0H22.8499C17.6644 0 14.2982 0.652754 11.4699 1.89893C11.3153 2.03737 11.1636 2.17818 11.0151 2.32135C2.71734 10.3203 2.08658 27.6593 9.12279 37.0782C9.13064 37.0921 9.13933 37.1061 9.14889 37.1203C10.2334 38.7185 9.18694 41.5154 7.55068 43.1516C7.28431 43.399 7.37944 43.5512 7.779 43.5892Z"
                      className="fill-white duration-200 ease-in-out"
                    />
                    <path
                      d="M20.5632 17H10.8382V19.0853H17.5869L10.9329 27.3317C10.7244 27.635 10.5728 27.9194 10.5728 28.5639V29.0947H19.748C20.203 29.0947 20.5822 28.7156 20.5822 28.2606V27.1421H13.4922L19.748 19.2938C19.8428 19.1801 20.0134 18.9716 20.0893 18.8768L20.1272 18.8199C20.4874 18.2891 20.5632 17.8341 20.5632 17.2844V17Z"
                      className="fill-zalo duration-200 ease-in-out"
                    />
                    <path
                      d="M32.9416 29.0947H34.3255V17H32.2402V28.3933C32.2402 28.7725 32.5435 29.0947 32.9416 29.0947Z"
                      className="fill-zalo duration-200 ease-in-out"
                    />
                    <path
                      d="M25.814 19.6924C23.1979 19.6924 21.0747 21.8156 21.0747 24.4317C21.0747 27.0478 23.1979 29.171 25.814 29.171C28.4301 29.171 30.5533 27.0478 30.5533 24.4317C30.5723 21.8156 28.4491 19.6924 25.814 19.6924ZM25.814 27.2184C24.2785 27.2184 23.0273 25.9672 23.0273 24.4317C23.0273 22.8962 24.2785 21.645 25.814 21.645C27.3495 21.645 28.6007 22.8962 28.6007 24.4317C28.6007 25.9672 27.3685 27.2184 25.814 27.2184Z"
                      className="fill-zalo duration-200 ease-in-out"
                    />
                    <path
                      d="M40.4867 19.6162C37.8516 19.6162 35.7095 21.7584 35.7095 24.3934C35.7095 27.0285 37.8516 29.1707 40.4867 29.1707C43.1217 29.1707 45.2639 27.0285 45.2639 24.3934C45.2639 21.7584 43.1217 19.6162 40.4867 19.6162ZM40.4867 27.2181C38.9322 27.2181 37.681 25.9669 37.681 24.4124C37.681 22.8579 38.9322 21.6067 40.4867 21.6067C42.0412 21.6067 43.2924 22.8579 43.2924 24.4124C43.2924 25.9669 42.0412 27.2181 40.4867 27.2181Z"
                      className="fill-zalo duration-200 ease-in-out"
                    />
                    <path
                      d="M29.4562 29.0944H30.5747V19.957H28.6221V28.2793C28.6221 28.7153 29.0012 29.0944 29.4562 29.0944Z"
                      className="fill-zalo duration-200 ease-in-out"
                    />
                  </svg>
                  <span
                    className={`${opened ? 'flex' : 'hidden'} overflow-hidden truncate`}
                  >
                    Nhóm Zalo kín
                  </span>
                </Link>
              </>
            )} */}
            <div className="mb-2 font-bold">Chung</div>
            <Item
              name="Trang chủ"
              route="/home"
              current={router.location.pathname}
            >
              <HomeIcon
                className={`${router.location.pathname.startsWith("/home") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
              />
            </Item>
            <Item
              name="Thông tin cá nhân"
              route="/profile"
              current={router.location.pathname}
            >
              <ProfileIcon
                className={`${router.location.pathname.startsWith("/profile") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
              />
            </Item>
            <Item name="Ví" route="/wallet" current={router.location.pathname}>
              <WalletIcon
                className={`${router.location.pathname.startsWith("/wallet") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
              />
            </Item>
            <Item
              name="Khóa học"
              route="/courses-forum"
              current={router.location.pathname}
            >
              <SchoolIcon
                className={`${router.location.pathname.startsWith("/courses-forum") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
              />
            </Item>
          </div>
          {isManager && (
            <div className="relative flex flex-col gap-2">
              <div className="mb-2 font-bold">Quản trị viên</div>
              <Item
                isComingSoon
                name="Quản lý phân quyền"
                route="/access-levels"
                current={router.location.pathname}
              >
                <AccessLevelIcon
                  className={`${router.location.pathname.startsWith("/access-levels") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
                />
              </Item>
              <Item
                isComingSoon={!isManager}
                name="Quản lý Bài tập"
                route="/quiz"
                current={router.location.pathname}
              >
                <LibraryIcon
                  className={`${router.location.pathname.startsWith("/quiz") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
                />
              </Item>
              <Item
                isComingSoon
                name="Lưu trữ"
                route="/storage"
                current={router.location.pathname}
              >
                <StorageIcon
                  className={`${router.location.pathname.startsWith("/storage") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
                />
              </Item>
              <Item
                isComingSoon
                name="Thống kê"
                route="/analytics"
                current={router.location.pathname}
              >
                <AnalyticsIcon
                  className={`${router.location.pathname.startsWith("/analytics") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
                />
              </Item>
              <Item
                isComingSoon
                name="Lịch sử hoạt động"
                route="/history"
                current={router.location.pathname}
              >
                <HistoryIcon
                  className={`${router.location.pathname.startsWith("/history") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
                />
              </Item>
            </div>
          )}
          <div className="relative flex flex-col gap-2">
            <div className="mb-2 font-bold">Học sinh</div>
            <Item
              name="Khóa học của tôi"
              route="/my-courses"
              current={router.location.pathname}
            >
              <WorkIcon
                className={`${router.location.pathname.startsWith("/my-courses") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
              />
            </Item>
            <Item
              name="Đề Trường - Sở"
              route="/exam"
              current={router.location.pathname}
            >
              <DocumentIcon
                className={`${router.location.pathname.startsWith("/exam") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
              />
            </Item>
            <Item
              name="Đề Live Fanpage"
              route="/live-fanpage"
              current={router.location.pathname}
            >
              <DocumentIcon
                className={`${router.location.pathname.startsWith("/live-fanpage") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
              />
            </Item>
            <Item
              isComingSoon
              name="Luyện tập"
              route="/practice"
              current={router.location.pathname}
            >
              <PracticeIcon
                className={`${router.location.pathname.startsWith("/practice") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
              />
            </Item>
            <Item
              name="Kiểm tra"
              route="/mock-tests"
              current={router.location.pathname}
            >
              <TestIcon
                className={`${router.location.pathname.startsWith("/mock-test") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
              />
            </Item>
          </div>
        </div>
        <Link
          to={MESSENGER_URL}
          target="_blank"
          className={` group mt-10 flex h-14 w-full flex-row items-center gap-4 overflow-x-hidden rounded-lg border-[0.5px] border-primary bg-white p-4 font-bold text-primary hover:bg-primary hover:text-white`}
        >
          <ChatIcon className="relative size-5 fill-primary group-hover:fill-white" />
          Nhận tư vấn
        </Link>
      </div>
    </>
  );
};

export default SidebarMobile;
