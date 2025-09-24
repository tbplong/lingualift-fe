import { Book } from "../../components/icons";

const WhyChoose = () => {
  return (
    <section className="flex flex-col items-center justify-center h-dvh">
      <div className="flex flex-col w-3/4 h-6/7">
        <div className="flex-3 relative bg-tertiary-300 w-full"></div>
        <div className="flex-2 w-full flex flex-row justify-between items-center gap-5">
          <div className="card card-border flex-1 bg-tertiary-000 rounded-4xl h-7/8">
            <div className="card-body">
              <div className="card-actions justify-start">
                <div className="w-12 h-12 rounded-full">
                  <Book />
                </div>
              </div>
              <h2 className="card-title">Card Title</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
            </div>
          </div>
          <div className="flex-1 h-7/8 bg-black"></div>
          <div className="flex-1 h-7/8 bg-black"></div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
