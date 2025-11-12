import { ButtonProps } from "@/types/propTypes";
import { toTitleCase } from "@/lib/utils";

const NotificationsButton = ({
  text,
  icon,
  children,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <div
      className={`before:top-1/2 before:left-1/2 before:absolute relative before:bg-[rgba(43,210,255,0.8)] before:shadow-[0_0_1rem_rgba(43,210,255,0.8)] before:rounded-full hover:before:rounded-4xl w-12 before:w-6 hover:before:w-full h-12 before:h-8 hover:before:h-full before:content-[''] before:transition-all before:-translate-x-1/2 before:-translate-y-1/2 before:duration-500 cursor-pointer before:pointer-events-none select-none ${className}`}
      onClick={onClick}
    >
      <div className="top-0 before:top-0 left-0 before:left-[80%] absolute before:absolute flex justify-center items-center bg-glass-surface-heavy before:bg-[linear-gradient(to_left,rgba(255,255,255,0.15),transparent)] shadow-glass-shadow-heavy shadow-md backdrop-blur-lg border-glass-border-bright border-t border-b rounded-4xl w-full before:w-1/2 h-full before:h-full overflow-hidden font-normal text-glass-text-primary no-underline before:content-[''] hover:tracking-[0.10rem] tracking-wider before:transform-[skewX(45deg)_translate(-150%)] hover:before:transform-[skewX(45deg)_translate(200%)] transition-all before:transition-all duration-500 before:duration-500">
        {icon}
        {children}
        {text && <span>{toTitleCase(text)}</span>}
      </div>
    </div>
  );
};

export default NotificationsButton;
