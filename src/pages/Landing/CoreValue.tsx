import CoreValueCard from "./CoreValueCard";
import Marquee from "./Marquee";
const CoreValue = () => {
  return (
    <section className="flex flex-col items-center mb-20">
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
      <div className="flex justify-between gap-8 p-6">
        <CoreValueCard
          className="border-[#00CAC7]"
          img="/exam.jpg"
          title="Mock Exams"
          content="Real exam-style tests that build confidence and show you exactly where to improve."
        />
        <CoreValueCard
          className="border-[#FDDED9]"
          img="/planner.jpg"
          title="Study Planner"
          content="Set goals, follow a daily plan, and stay on track until exam day."
        />
        <CoreValueCard
          className="border-[#DEE2FF]"
          title="Flashcards"
          content="Easy “remember cards” to review words, phrases, and grammar on the go."
          comp={
            <div className="bg-[#DEE2FF] w-full h-full flex items-center justify-center rounded-xl">
              <img className="h-1/2 rounded-xl" src="/flash.png" />
            </div>
          }
        />
      </div>

      <Marquee />
    </section>
  );
};

export default CoreValue;
