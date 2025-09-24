import WelcomeCard from "./Welcome";
import RightPane from "./Profile";

export default function DashboardSection() {
  return (
    <div className="absolute top-35 right-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8">
          <WelcomeCard
            name="Truong Xuan Sang"
            onBuy={() => console.log("Buy Lesson")}
            onLearnMore={() => console.log("Learn more")}
          />
        </div>

        <aside className="lg:col-span-4">
          <RightPane />
        </aside>
      </div>
    </div>
  );
}
