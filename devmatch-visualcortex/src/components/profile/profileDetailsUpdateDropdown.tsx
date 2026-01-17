import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { USER_PROPERTY_CONSTRAINTS } from "@/config/constants";
import { allowedUpdateProfileProperties } from "@/config/config";
import { ProfileDetailsUpdateDropdownProps } from "@/types/propTypes";
import { numRange, toTitleCase } from "@/lib/utils/utils";
import Dropdown from "@/components/ui/dropdown/dropdown";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";

const ProfileDetailsUpdateDropdown = ({
  name,
  id,
  value,
  placeholder,
}: ProfileDetailsUpdateDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(value);

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

  const handleDropdownItemClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;
    const li = target.closest("[data-item]") as HTMLElement;
    if (!li) return;

    const item = li.dataset.item;

    if (dropdownRange.includes(Number(item))) {
      setSelectedValue(Number(item));
    }
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 hover:bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md backdrop-blur-3xl p-2 border border-glass-border-subtle hover:border-glass-border-bright rounded-xl text-glass-text-primary transition-all ease-in-out cursor-pointer"
        popoverTarget={id}
      >
        <span>{selectedValue ?? placeholder}</span>
        <span>
          <FaChevronDown />
        </span>
      </button>
      <Dropdown
        id={id}
        className={
          name === allowedUpdateProfileProperties.age
            ? "right-118"
            : name === allowedUpdateProfileProperties.experience
              ? "right-104"
              : ""
        }
      >
        <div>
          <p className="p-2 font-bold text-md">{toTitleCase(name)}</p>
          <HorizontalSeparator />
          <ul
            className="flex flex-col gap-1 [&::-webkit-scrollbar-thumb]:hover:bg-glass-surface-lighter [&::-webkit-scrollbar-track]:bg-transparent pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar]:w-1 max-h-106 overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary"
            onClick={handleDropdownItemClick}
          >
            {dropdownRange.length > 0 &&
              dropdownRange.map((num, idx) => (
                <li
                  key={idx}
                  data-item={num}
                  data-close-dropdown
                  className="flex justify-center items-center hover:bg-glass-surface-heavy p-1 rounded-lg transition-all ease-in-out cursor-pointer"
                >
                  <span>{num}</span>
                </li>
              ))}
          </ul>
        </div>
      </Dropdown>
    </div>
  );
};

export default ProfileDetailsUpdateDropdown;
