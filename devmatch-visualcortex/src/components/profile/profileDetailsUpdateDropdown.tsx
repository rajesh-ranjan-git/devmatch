import { useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { INPUT_TYPES, USER_PROPERTY_CONSTRAINTS } from "@/config/constants";
import { allowedUpdateProfileProperties } from "@/config/config";
import { ProfileDetailsUpdateDropdownProps } from "@/types/propTypes";
import useOutsideClick from "@/hooks/useOutsideClick";
import { numRange, toTitleCase } from "@/lib/utils/utils";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";
import Input from "../ui/inputs/input";

const ProfileDetailsUpdateDropdown = ({
  name,
  value,
  placeholder,
}: ProfileDetailsUpdateDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const dropdownRange =
    name === allowedUpdateProfileProperties.age
      ? numRange(
          USER_PROPERTY_CONSTRAINTS.minAge,
          USER_PROPERTY_CONSTRAINTS.maxAge,
        )
      : name === allowedUpdateProfileProperties.experience
        ? numRange(
            USER_PROPERTY_CONSTRAINTS.minExperience,
            USER_PROPERTY_CONSTRAINTS.maxExperience,
          )
        : [];

  useOutsideClick({
    ref: [dropdownRef, buttonRef],
    when: isOpen,
    callback: () => setIsOpen(false),
  });

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownItemClick = (item: number) => {
    setSelectedValue(item);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="flex justify-between items-center gap-2 hover:bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md backdrop-blur-3xl p-2 border border-glass-border-subtle hover:border-glass-border-bright rounded-xl w-max min-w-20 text-glass-text-primary transition-all ease-in-out cursor-pointer"
        onClick={handleToggleDropdown}
      >
        <span className="w-full">{selectedValue ?? placeholder}</span>
        <span>
          <FaChevronDown />
        </span>
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute bg-glass-shadow-heavy shadow-glass-shadow-heavy shadow-md backdrop-blur-md my-1 border rounded-xl w-max min-w-20 text-glass-text-primary text-center dropdown-menu"
          style={{
            opacity: 1,
            transform: "scaleY(1)",
            animation: "dropdownOpen 300ms ease-in-out",
          }}
        >
          <div className="bg-glass-shadow-heavy backdrop-blur-md p-1 rounded-xl">
            <p className="p-2 font-bold text-md">{toTitleCase(name)}</p>
            <HorizontalSeparator />
            <ul className="flex flex-col gap-1 [&::-webkit-scrollbar-thumb]:hover:bg-glass-surface-lighter [&::-webkit-scrollbar-track]:bg-transparent pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar]:w-1 max-h-106 overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary">
              {dropdownRange.length > 0 &&
                dropdownRange.map((num, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleDropdownItemClick(num)}
                    className="flex justify-center items-center hover:bg-glass-surface-heavy p-1 rounded-lg transition-all ease-in-out cursor-pointer"
                  >
                    <span>{num}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}

      <Input
        name={name}
        type={INPUT_TYPES.hidden}
        value={selectedValue ? String(selectedValue) : ""}
        placeholder="Enter comma separated values..."
        className="absolute mt-4 mb-2"
      />
    </div>
  );
};

export default ProfileDetailsUpdateDropdown;
