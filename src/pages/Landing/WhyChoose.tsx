const WhyChoose = () => {
  return (
    <section className="flex flex-col items-center justify-center h-dvh">
      <div className="flex flex-col w-4/5 h-5/6">
        <div className="flex-4 relative bg-tertiary-300 w-full rounded-4xl overflow-hidden">
          <img
            src="/hocbai.png"
            className="w-full absolute bottom-0 inset-shadow-sm"
          />
          <div className="h-22 w-48 bg-white rounded-3xl right-4 bottom-4 absolute border-none flex flex-col justify-center items-center">
            <div>
              <span className="block text-4xl text-tertiary font-semibold">
                12 years
              </span>
              <span className="text-lg text-tertiary-300">
                Education Service
              </span>
            </div>
          </div>
          <div className="absolute left-8 bottom-4">
            <span className="text-6xl text-white">Why Choose LinguaLift?</span>
          </div>
        </div>
        <div className="flex-2 w-full flex flex-row justify-between items-center gap-5">
          <div className="card card-border flex-1 bg-tertiary-000 rounded-4xl h-7/8">
            <div className="card-body">
              <div className="card-actions justify-start h-1/3 mb-2">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <img className="w-6/10" src="/graduation-hat.png"></img>
                </div>
              </div>
              <h2 className="card-title text-2xl">1,000+ Courses</h2>
              <p className="text-xl">
                Gain knowledge from expert-led programs accross various fields.
              </p>
            </div>
          </div>
          <div className="card card-border flex-1 bg-tertiary-000 rounded-4xl h-7/8">
            <div className="card-body">
              <div className="card-actions justify-start h-1/3 mb-2">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <img className="w-5/10" src="/open-book.png"></img>
                </div>
              </div>
              <h2 className="card-title text-2xl">Flexible Learning</h2>
              <p className="text-xl">
                Study at your own pace, anytime, and anywhere.
              </p>
            </div>
          </div>
          <div className="card card-border flex-1 bg-tertiary-000 rounded-4xl h-7/8">
            <div className="card-body">
              <div className="card-actions justify-start h-1/3 mb-2">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <img className="w-5/10" src="/support.png"></img>
                </div>
              </div>
              <h2 className="card-title text-2xl">Supportive Community</h2>
              <p className="text-xl">
                Connect with peers and grow together in an engineering
                environment.
              </p>
            </div>
          </div>{" "}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
