import WhyChooseCard from "./WhyChooseCard";

const WhyChoose = () => {
  return (
    <section className="flex flex-col items-center justify-center h-194 my-10">
      <div className="flex flex-col h-full w-4/5 max-md:aspect-square max-md:h-auto">
        <div className="flex-4 relative bg-tertiary-300 w-full rounded-4xl overflow-hidden max-md:hidden">
          <img
            src="/hocbai.png"
            className="2xl:w-full 2xl:object-cover w-444 h-full object-none absolute bottom-0 object-bottom inset-shadow-sm"
          />
          <div className="aspect-[48/22] xl:w-48 w-40 bg-white rounded-3xl right-4 bottom-4 absolute border-none flex flex-col justify-center items-center">
            <div>
              <span className="block xl:text-4xl text-2xl text-tertiary font-semibold">
                12 years
              </span>
              <span className="xl:text-lg text-base text-tertiary-300">
                Education Service
              </span>
            </div>
          </div>
          <div className="absolute left-8 bottom-4">
            <span className="xl:text-6xl lg:text-5xl text-4xl text-white text-shadow-lg">
              Why Choose LinguaLift?
            </span>
          </div>
        </div>
        <div className="flex-2 w-full flex flex-row max-md:grid max-md:grid-cols-2 max-md:gap-3 justify-between items-center gap-5">
          <div className="md:hidden bg-primary-300 rounded-2xl h-7/8 max-md:h-full max-md:aspect-square">
            <div className="card-body py-4 pl-5 pr-2">
              <h2 className="card-title sm:text-5xl text-2xl text-secondary-300 block">
                Why <span className="block">Choose</span> LinguaLift
              </h2>
            </div>
          </div>
          <WhyChooseCard
            title="1,000+ Courses"
            content="Gain knowledge from expert-led programs accross various fields."
            icon="/graduation-hat.png"
          />
          <WhyChooseCard
            title="Flexible Learning"
            content="Study at your own pace, anytime, and anywhere."
            icon="/open-book.png"
          />
          <WhyChooseCard
            title="Support Community"
            content="Connect with peers and grow in a supportive environment."
            icon="/support.png"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
