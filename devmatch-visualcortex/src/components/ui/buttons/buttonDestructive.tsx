import { ButtonProps } from "@/types/propTypes";

const ButtonDestructive = ({
  name,
  icon,
  label,
  children,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <div
      className={`before:top-1/2 before:left-1/2 before:absolute relative before:bg-[rgba(255,31,42,0.8)] before:rounded-xl hover:before:rounded-4xl w-40 before:w-12 hover:before:w-full h-10 before:h-12 hover:before:h-full before:content-[''] before:rotate-45 hover:before:rotate-0 before:transition-all before:-translate-x-1/2 before:-translate-y-1/2 hover:before:-translate-x-1/2 hover:before:-translate-y-1/2 before:duration-500 before:pointer-events-none select-none before:[box-shadow:0_0_0.3rem_rgba(255,31,42,0.8),0_0_1rem_rgba(255,31,42,0.8),0_0_2rem_rgba(255,31,42,0.8),0_0_3.5rem_rgba(255,31,42,0.8)] cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="top-0 before:top-0 left-0 before:left-[80%] absolute before:absolute flex justify-center items-center gap-2 bg-glass-surface-heavy before:bg-[linear-gradient(to_left,rgba(255,255,255,0.15),transparent)] shadow-glass-shadow-heavy shadow-md backdrop-blur-lg border-glass-border-bright border-t border-b rounded-4xl w-full before:w-1/2 h-full before:h-full overflow-hidden font-normal text-glass-text-primary no-underline before:content-[''] hover:tracking-[0.10rem] tracking-wider before:transform-[skewX(45deg)_translate(-150%)] hover:before:transform-[skewX(45deg)_translate(200%)] transition-all before:transition-all duration-500 before:duration-500">
        {icon}
        {children}
        <span>{label}</span>
      </div>
    </div>
  );
};

export default ButtonDestructive;
