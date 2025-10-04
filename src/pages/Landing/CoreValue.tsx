import CoreValueCard from "./CoreValueCard";
import "./CoreValue.css";
import { useEffect, useRef } from "react";
import { autoScroll } from "./autoScroll";
const CoreValue = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const stop = autoScroll(trackRef.current, 3000); // every 3s
    return stop; // cleanup when unmount
  }, []);

  return (
    <section className="flex flex-col items-center mb-20">
      <div className="mt-16 text-secondary lg:text-5xl text-3xl font-bold">
        <span className="text-primary">Our Core</span> Values
      </div>
      <div className="flex gap-3 lg:my-6 my-5">
        <div className="h-2 w-2 bg-tertiary-100 rounded-full"></div>
        <div className="h-2 w-10 bg-secondary-300 rounded-full"></div>
        <div className="h-2 w-2 bg-tertiary-100 rounded-full"></div>
      </div>
      <p className="lg:mb-8 mb-0 xl:w-4xl w-4/5 lg:text-xl text-base text-center text-tertiary">
        LinguaLift combines learner-first teaching, clear instruction, and
        community support with exam-focused practice and personalised feedback
        to help students aim for a 9+.
      </p>
      <div
        ref={trackRef}
        className="carousel flex lg:gap-8 gap-4 2xl:w-4/5 xl:w-9/10 lg:w-9/10 w-8/10 lg:aspect-[1504/666.725] p-6 overflow-x-auto snap-x snap-mandatory"
      >
        <CoreValueCard
          bg="bg-[#00CAC7]"
          border="border-[#00CAC7]"
          img="/exam.jpg"
          title="Mock Exams"
          content="Real exam-style tests that build confidence and show you exactly where to improve."
        />
        <CoreValueCard
          bg="bg-[#FDDED9]"
          border="border-[#FDDED9]"
          img="/planner.jpg"
          title="Study Planner"
          content="Set goals, follow a daily plan, and stay on track until exam day with confidence."
        />
        <CoreValueCard
          bg="bg-[#DEE2FF]"
          border="border-[#DEE2FF]"
          title="Flashcards"
          content="Easy “remember cards” to review words, phrases, and grammar on the go."
          comp={
            <div className=" w-full h-full flex items-center justify-center rounded-xl">
              <img className="h-1/2 rounded-xl" src="/flash.png" />
            </div>
          }
        />
        <CoreValueCard
          bg="bg-[#00CAC7]"
          border="border-[#00CAC7]"
          img="/exam.jpg"
          title="Mock Exams"
          content="Real exam-style tests that build confidence and show you exactly where to improve."
        />
        <CoreValueCard
          bg="bg-[#FDDED9]"
          border="border-[#FDDED9]"
          img="/planner.jpg"
          title="Study Planner"
          content="Set goals, follow a daily plan, and stay on track until exam day with confidence."
        />
        <CoreValueCard
          bg="bg-[#DEE2FF]"
          border="border-[#DEE2FF]"
          title="Flashcards"
          content="Easy “remember cards” to review words, phrases, and grammar on the go."
          comp={
            <div className=" w-full h-full flex items-center justify-center rounded-xl">
              <img className="h-1/2 rounded-xl" src="/flash.png" />
            </div>
          }
        />
        <CoreValueCard
          bg="bg-[#00CAC7]"
          border="border-[#00CAC7]"
          img="/exam.jpg"
          title="Mock Exams"
          content="Real exam-style tests that build confidence and show you exactly where to improve."
        />
        <CoreValueCard
          bg="bg-[#FDDED9]"
          border="border-[#FDDED9]"
          img="/planner.jpg"
          title="Study Planner"
          content="Set goals, follow a daily plan, and stay on track until exam day with confidence."
        />
        <CoreValueCard
          bg="bg-[#DEE2FF]"
          border="border-[#DEE2FF]"
          title="Flashcards"
          content="Easy “remember cards” to review words, phrases, and grammar on the go."
          comp={
            <div className=" w-full h-full flex items-center justify-center rounded-xl">
              <img className="h-1/2 rounded-xl" src="/flash.png" />
            </div>
          }
        />
        <CoreValueCard
          bg="bg-[#00CAC7]"
          border="border-[#00CAC7]"
          img="/exam.jpg"
          title="Mock Exams"
          content="Real exam-style tests that build confidence and show you exactly where to improve."
        />
        <CoreValueCard
          bg="bg-[#FDDED9]"
          border="border-[#FDDED9]"
          img="/planner.jpg"
          title="Study Planner"
          content="Set goals, follow a daily plan, and stay on track until exam day with confidence."
        />
        <CoreValueCard
          bg="bg-[#DEE2FF]"
          border="border-[#DEE2FF]"
          title="Flashcards"
          content="Easy “remember cards” to review words, phrases, and grammar on the go."
          comp={
            <div className=" w-full h-full flex items-center justify-center rounded-xl">
              <img className="h-1/2 rounded-xl" src="/flash.png" />
            </div>
          }
        />
      </div>
    </section>
  );
};

export default CoreValue;
