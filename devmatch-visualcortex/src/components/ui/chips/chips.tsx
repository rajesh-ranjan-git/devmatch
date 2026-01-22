import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { toTitleCase } from "@/lib/utils/utils";
import { ChipsProps } from "@/types/propTypes";
import Input from "@/components/ui/inputs/input";
import ButtonNormal from "@/components/ui/buttons/buttonNormal";
import ButtonSuccess from "@/components/ui/buttons/buttonSuccess";
import ButtonDestructive from "@/components/ui/buttons/buttonDestructive";
import { INPUT_TYPES } from "@/config/constants";

const Chips = ({ name, type, values, className, icon }: ChipsProps) => {
  if (!values || values?.length <= 0) return null;

  const [inputValue, setInputValue] = useState("");
  const [updatedValue, setUpdatedValue] = useState(values);
  const [showInputField, setShowInputField] = useState(false);

  const handleRemoveChip = (indexToRemove: number) => {
    const newValues = updatedValue.filter((_, idx) => idx !== indexToRemove);
    setUpdatedValue(newValues);
  };

  const handleAddValues = () => {
    console.log("debug handleAddValues called");
    if (!inputValue.trim()) return;

    const newValues = inputValue
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value.length > 0);

    const combinedValues = [...updatedValue, ...newValues];
    setUpdatedValue(combinedValues);

    setInputValue("");
    setShowInputField(false);
  };

  const handleCancel = () => {
    setInputValue("");
    setShowInputField(false);
  };

  return (
    <div>
      <div
        className={`flex justify-between items-start w-full text-glass-text-primary text-md tracking-wider select-none  ${className}`}
      >
        <div className="flex flex-wrap items-center gap-4">
          {updatedValue?.map((value, idx) => {
            return (
              <div
                key={idx}
                className="relative flex items-center gap-2 bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md px-4 py-2 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-4xl outline-none min-w-fit text-glass-text-primary text-md placeholder:text-glass-text-secondary transition-all duration-300"
              >
                <span>{toTitleCase(value)}</span>
                <span
                  className="-top-0.5 -right-0.5 absolute text-glass-text-secondary hover:text-glass-text-primary cursor-pointer"
                  onClick={() => handleRemoveChip(idx)}
                >
                  <ImCross size={10} />
                </span>
              </div>
            );
          })}
          {!showInputField && (
            <ButtonNormal
              text="Add Skills"
              icon={<FaPlus />}
              className="p-4 min-w-32"
              onClick={() => setShowInputField(true)}
            />
          )}
        </div>
        {icon && (
          <span className="bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md mr-2 p-2 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-full outline-none min-w-fit overflow-hidden text-glass-text-primary">
            {icon}
          </span>
        )}
      </div>
      {showInputField && (
        <div className="flex items-center gap-2">
          <Input
            name={`${name}-input`}
            type={type}
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            placeholder="Enter comma separated values..."
            className="mt-4 mb-2"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddValues();
              }
            }}
          />
          <ButtonSuccess
            icon={<FaPlus size={20} />}
            className="mt-2 p-4"
            onClick={() => handleAddValues()}
          />
          <ButtonDestructive
            icon={<IoClose size={24} />}
            className="mt-2 p-4"
            onClick={() => handleCancel()}
          />
        </div>
      )}

      <Input
        name={name}
        type={INPUT_TYPES.hidden}
        value={updatedValue.join(",")}
        placeholder="Enter comma separated values..."
        className="absolute mt-4 mb-2"
      />
    </div>
  );
};

export default Chips;
