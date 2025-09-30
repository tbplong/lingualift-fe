type CardProps = {
  title: string;
  content: string;
  icon: string;
};

const WhyChooseCard = ({ title, content, icon }: CardProps) => {
  return (
    <div className="card card-border flex-1 bg-tertiary-000 rounded-4xl max-md:rounded-2xl h-7/8 max-md:h-full max-md:aspect-square">
      <div className="card-body 2xl:p-6 xl:py-5 md:py-3 md:pl-4 sm:py-4 sm:pl-4 py-1 pl-2 pr-1">
        <div className="card-actions justify-start xl:h-1/3 h-9/30 2xl:mb-2 max-xl:mt-1">
          <div className="2xl:w-16 xl:w-14 md:w-13 sm:w-20 w-10 aspect-square rounded-full bg-white flex items-center justify-center">
            <img className="w-5/10" src={icon}></img>
          </div>
        </div>
        <h2 className="card-title xl:text-2xl md:text-xl sm:text-2xl text-sm max-md:mt-3 max-sm:mt-0">
          {title}
        </h2>
        <p className="xl:text-lg md:text-base sm:text-xl text-xs">{content}</p>
      </div>
    </div>
  );
};

export default WhyChooseCard;
