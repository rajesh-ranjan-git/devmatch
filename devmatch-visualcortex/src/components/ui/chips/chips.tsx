import { useState } from "react";
import { ImCross } from "react-icons/im";
import { FaPlus } from "react-icons/fa6";
import { toTitleCase } from "@/lib/utils/utils";
import { ChipsProps } from "@/types/propTypes";
import Input from "@/components/ui/inputs/input";
import ButtonNormal from "@/components/ui/buttons/buttonNormal";
import ButtonSuccess from "@/components/ui/buttons/buttonSuccess";
import ButtonDestructive from "../buttons/buttonDestructive";
import { IoClose } from "react-icons/io5";

const Chips = ({ name, type, values, className, icon }: ChipsProps) => {
  if (!values || values?.length <= 0) return null;

  const [updatedValue, setUpdatedValue] = useState(values);
  const [showInputField, setShowInputField] = useState(false);

  return (
    <div>
      <div
        className={`flex justify-between items-start w-full text-glass-text-primary text-md tracking-wider select-none  ${className}`}
      >
        <div className="flex flex-wrap items-center gap-4">
          {values?.map((value, idx) => {
            return (
              <div
                key={idx}
                className="relative flex items-center gap-2 bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md px-4 py-2 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-4xl outline-none min-w-fit text-glass-text-primary text-md placeholder:text-glass-text-secondary transition-all duration-300"
              >
                <span>{toTitleCase(value)}</span>
                <span className="-top-0.5 -right-0.5 absolute text-glass-text-secondary hover:text-glass-text-primary cursor-pointer">
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
            name={name}
            type={type}
            placeholder="Enter comma separated values..."
            className="mt-4 mb-2"
            icon={icon}
          />
          <ButtonSuccess
            icon={<FaPlus size={20} />}
            className="mt-2 p-4"
            onClick={() => setShowInputField(true)}
          />
          <ButtonDestructive
            icon={<IoClose size={24} />}
            className="mt-2 p-4"
            onClick={() => setShowInputField(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Chips;
