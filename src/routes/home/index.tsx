import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "react-toastify";

export const Route = createFileRoute("/home/")({
  beforeLoad: async ({ context }) => {
    if (!context.authContext.isAuthenticated) {
      toast.error("Please log in to access the home page.");
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/home/"!</div>;
}
