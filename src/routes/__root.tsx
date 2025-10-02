import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import Loading from "../components/ui/loading";
import { PRODUCTION } from "../config/env";
import { useGlobalLoadingStore } from "../stores";

const TanStackRouterDevtools = PRODUCTION
  ? () => null
  : React.lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

type RouterContext = {
  authContext: { isAuthenticated: boolean; isManager: boolean };
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: () => {
    return <div>Not found</div>;
  },
});

function RootComponent() {
  // const { isAuthenticated } = useAuthStore();
  const { globalLoading } = useGlobalLoadingStore();
  // const router = useRouter();

  // useEffect(() => {
  //   router.invalidate();
  // }, [isAuthenticated, router]);

  return (
    <>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
      {globalLoading && (
        <div className="relative flex h-screen w-screen items-center justify-center bg-white">
          <Loading className="relative size-20" loop />
        </div>
      )}
    </>
  );
}

// import { Outlet, createRootRoute } from '@tanstack/react-router'

// export const Route = createRootRoute({
//   component: () => <Outlet />,
// })
