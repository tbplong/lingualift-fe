import noToChar from "./noToChar";

const AnsBox = ({
  ansNum,
  ansVal,
  loadQuiz,
}: {
  ansNum: number;
  ansVal: number;
  loadQuiz: (quizNo: number) => void;
}) => {
  return (
    <button
      onClick={() => loadQuiz(ansNum)}
      className="w-full h-12 grid grid-rows-2 bg-primary-300 border-2 border-primary-300 rounded-md overflow-hidden cursor-pointer"
    >
      <div className="bg-none border-none flex justify-center items-center">
        <span className="text-white text-xl mb-0.5">{ansNum}</span>
      </div>
      <div className="bg-white border-none flex justify-center items-center">
        <span className="text-black text-xl">{noToChar(ansVal)}</span>
      </div>
    </button>
  );
};

export default AnsBox;
