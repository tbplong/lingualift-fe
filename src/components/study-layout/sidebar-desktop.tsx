import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ReactNode, useMemo } from "react";

import { ChatIcon, HomeIcon, ProfileIcon } from "@/components/icons";
import {
  // FACEBOOK_GROUP_URL,
  // GROUP_FACEBOOK_URL,
  // GROUP_ZALO_URL,
  MESSENGER_URL,
} from "@/constants";
import { Library } from "lucide-react";
// import { useUserStore } from '@/stores';

type ItemProps = {
  isComingSoon?: boolean;
  name: string;
  route: string;
  children?: ReactNode;
  opened: boolean;
  current: string;
};

const Item = ({
  isComingSoon,
  opened,
  name,
  route,
  children,
  current,
}: ItemProps) => {
  const selected = useMemo(() => {
    return current.startsWith(route);
  }, [current, route]);

  if (isComingSoon)
    return (
      <div
        className={`${opened ? "justify-start" : "max-w-14 justify-center"} ${selected ? "bg-primary font-bold text-white " : "hover:bg-tertiary-300 hover:text-white"} group relative flex h-14 w-full shrink-0 cursor-not-allowed select-none flex-row items-center gap-4 overflow-x-hidden rounded-lg p-4 duration-200 ease-in-out`}
      >
        {children}
        <span
          className={`${opened ? "flex" : "hidden"} overflow-hidden truncate`}
        >
          <span className="flex group-hover:hidden">{name}</span>
          <span className="hidden font-bold uppercase opacity-0 group-hover:flex group-hover:opacity-100">
            SẮP RA MẮT
          </span>
        </span>
      </div>
    );

  return (
    <Link
      to={route}
      className={`${opened ? "justify-start" : "max-w-14 justify-center"} ${selected ? "bg-primary font-bold text-white " : "hover:bg-primary-300 hover:text-white"} group relative flex h-14 w-full flex-row items-center gap-4 overflow-x-hidden rounded-lg p-4 duration-200 ease-in-out`}
    >
      {children}
      <span
        className={`${opened ? "flex" : "hidden"} overflow-hidden truncate`}
      >
        {name}
      </span>
    </Link>
  );
};

type SidebarDesktopProps = {
  isManager?: boolean;
  opened: boolean;
};

const SidebarDesktop = ({ isManager, opened }: SidebarDesktopProps) => {
  const router = useRouterState();
  const navigate = useNavigate();
  // const { isStudent } = useUserStore();
  console.log(isManager);
  return (
    <div
      className={`${opened ? "w-80 3xl:w-[22.5rem]" : "w-24"} sticky left-0 top-0 z-[99] hidden h-full min-h-screen flex-col justify-between gap-5 overflow-hidden overflow-y-scroll border-r border-solid border-tertiary-300 bg-white px-5 pb-5 duration-200 ease-in-out xl:flex`}
    >
      <div className="relative flex h-full min-h-screen flex-col gap-5 overflow-hidden overflow-y-scroll">
        <div className="relative flex h-20 w-full shrink-0 flex-row items-center justify-between overflow-x-hidden md:h-20 3xl:h-24">
          <h1
            onClick={() => {
              navigate({ to: "/" });
            }}
            className="text-4xl font-black bg-gradient-to-r from-primary-200 to-primary bg-clip-text text-transparent lg:block pb-1"
          >
            Lingualift
          </h1>
        </div>

        {/* Common */}
        <div className="relative flex shrink-0 flex-col gap-2">
          <Item
            opened={opened}
            name="Dashboard"
            route="/dashboard"
            current={router.location.pathname}
          >
            <HomeIcon
              className={`${router.location.pathname.startsWith("/dashboard") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
            />
          </Item>
          <Item
            opened={opened}
            name="Quiz Library"
            route="/courses-forum"
            current={router.location.pathname}
          >
            <Library
              className={`${router.location.pathname.startsWith("/courses-forum") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
            />
          </Item>
          <Item
            opened={opened}
            name="Profile"
            route="/profile"
            current={router.location.pathname}
          >
            <ProfileIcon
              className={`${router.location.pathname.startsWith("/profile") ? "fill-white" : "fill-tertiary group-hover:fill-white"} size-6 duration-200 ease-in-out `}
            />
          </Item>
        </div>
      </div>

      <Link
        to={MESSENGER_URL}
        target="_blank"
        className={`${opened ? "justify-start" : "max-w-14 justify-center"} group relative mt-20 flex h-14 w-full shrink-0 flex-row items-center gap-4 overflow-x-hidden rounded-lg border-[0.5px]  border-primary p-4 font-bold text-primary duration-200 ease-in-out hover:bg-primary hover:text-white`}
      >
        <ChatIcon className="relative size-6 fill-primary group-hover:fill-white" />
        <span
          className={`${opened ? "flex" : "hidden"} overflow-hidden truncate`}
        >
          Nhận tư vấn
        </span>
      </Link>
    </div>
  );
};

export default SidebarDesktop;
