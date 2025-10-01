type CardProps = {
  title: string;
  content: string;
  icon: string;
};

const WhyChooseCard = ({ title, content, icon }: CardProps) => {
  return (
    <div className="card card-border flex-1 bg-tertiary-000 rounded-4xl max-lg:rounded-2xl h-7/8 max-lg:h-full max-lg:aspect-square">
      <div className="card-body 2xl:p-6 xl:py-5 md:py-3 md:pl-4 sm:py-4 sm:pl-4 py-1 pl-2 pr-1">
        <div className="card-actions justify-start xl:h-1/3 h-9/30 2xl:mb-2 max-xl:mt-1">
          <div className="4xl:w-20 3xl:w-18 2xl:w-16 lg:w-15 sm:w-20 xs:w-13 w-10 aspect-square rounded-full bg-white flex items-center justify-center">
            <img className="w-5/10" src={icon}></img>
          </div>
        </div>
        <h2 className="card-title 4xl:text-4xl 3xl:text-3xl lg:text-2xl md:text-3xl sm:text-2xl xs:text-lg text-sm max-lg:mt-3 max-sm:mt-0">
          {title}
        </h2>
        <p className="4xl:text-2xl 3xl:text-xl lg:text-lg md:text-xl md:pr-2 sm:text-xl text-xs pr-1">
          {content}
        </p>
      </div>
    </div>
  );
};

export default WhyChooseCard;
