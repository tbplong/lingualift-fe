import { createFileRoute } from "@tanstack/react-router";
import HomepageLayout from "@/components/layouts/HomepageLayout";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      {/* <h3>Welcome Home!</h3> */}
      <HomepageLayout />
    </div>
  );
}
