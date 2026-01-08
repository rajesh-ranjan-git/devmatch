import { NameCardContentProps } from "@/types/propTypes";

const NameCardContent = ({ name }: NameCardContentProps) => {
  return (
    <div className="bottom-0 absolute flex justify-center items-center bg-glass-surface-light backdrop-blur-2xl p-2 border-glass-border-bright border-t rounded-xl w-full font-arima text-glass-text-primary text-2xl">
      {name}
    </div>
  );
};

export default NameCardContent;
