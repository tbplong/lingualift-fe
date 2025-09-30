import CoreValueCard from "./CoreValueCard";
import Marquee from "./Marquee";
const CoreValue = () => {
  return (
    <section className="h-dvh flex flex-col items-center">
      <div className="mt-16 text-secondary text-5xl font-bold">
        <span className="text-primary">Our Core</span> Values
      </div>
      <div className="flex gap-3 my-6">
        <div className="h-2 w-2 bg-tertiary-100 rounded-full"></div>
        <div className="h-2 w-10 bg-secondary-300 rounded-full"></div>
        <div className="h-2 w-2 bg-tertiary-100 rounded-full"></div>
      </div>
      <p className="mb-8 w-4xl text-xl text-center text-tertiary">
        LinguaLift combines learner-first teaching, clear instruction, and
        community support with exam-focused practice and personalised feedback
        to help students aim for a 9+.
      </p>
      <div className="flex gap-8 p-6 mb-42">
        <CoreValueCard
          className="border-[#00CAC7]"
          img="/exam.jpg"
          title="Mock Exams"
          content="Real exam-style tests that build confidence and show you exactly where to improve."
        />
        <div className="card rounded-2xl bg-white w-120 h-160 shadow-lg text-tertiary border-2 border-[#FDDED9]">
          <figure className="h-4/5 w-full p-4 rounded-2xl">
            <img className="h-full rounded-xl" src="/planner.jpg" />
          </figure>
          <div className="card-body p-4 pt-2 gap-0">
            <h2 className="card-title text-2xl ">Study Planner</h2>
            <p className="text-lg leading-6">
              Set goals, follow a daily plan, and stay on track until exam day.
            </p>
          </div>
        </div>
        <div className="card rounded-2xl bg-white w-120 h-160 shadow-lg text-tertiary border-2 border-[#DEE2FF]">
          <figure className="h-4/5 w-full p-4 rounded-2xl">
            <div className="bg-[#DEE2FF] w-full h-full flex items-center justify-center rounded-xl">
              <img className="h-1/2 rounded-xl" src="/flash.png" />
            </div>
          </figure>
          <div className="card-body p-4 pt-2 gap-0">
            <h2 className="card-title text-2xl ">Flashcards</h2>
            <p className="text-lg leading-6">
              Easy “remember cards” to review words, phrases, and grammar on the
              go.
            </p>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
};

export default CoreValue;
