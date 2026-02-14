"use client";

import { KeyboardEvent, useRef } from "react";
import { TextareaProps } from "@/types/propTypes";

const Textarea = ({
  name,
  rows,
  placeholder,
  value,
  defaultValue,
  className,
  onChange,
  onKeyDown,
}: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";

    const lineHeight = parseInt(window.getComputedStyle(el).lineHeight);

    const maxHeight = lineHeight * 3;

    el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
  };

  const resetHeight = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      onKeyDown();
      resetHeight();
    }
  };

  return (
    <div
      className={`flex items-center gap-2 bg-glass-surface-light focus-within:bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md pr-4 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-4xl focus-within:rounded-xl outline-none w-full overflow-hidden text-glass-text-primary text-md placeholder:text-glass-text-secondary tracking-wider transition-all duration-300 ${className}`}
    >
      <textarea
        ref={textareaRef}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue as string}
        rows={rows ?? 1}
        onInput={handleInput}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="bg-transparent [&::-webkit-scrollbar-thumb]:bg-glass-surface-heavy [&::-webkit-scrollbar-track]:bg-transparent px-5 py-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full outline-none w-full [&::-webkit-scrollbar]:w-1 overflow-y-auto [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out caret-glass-text-primary resize-none"
      />
    </div>
  );
};

export default Textarea;
