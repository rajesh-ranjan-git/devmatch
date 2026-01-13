import Link from "next/link";
import { MdEdit, MdOutlineEdit } from "react-icons/md";
import { USER_PROPERTIES, USER_PROPERTY_LABELS } from "@/config/constants";
import { ProfileComponentProps } from "@/types/propTypes";
import { formatDate, toSentenceCase, toTitleCase } from "@/lib/utils/utils";
import { useDevMatchAppStore } from "@/store/store";

const ProfileDetailsUpdateContext = ({ user }: ProfileComponentProps) => {
  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);

  const renderValue = (key: string, value: string) => {
    if (value === null || value === undefined) {
      return null;
    }

    if (Array.isArray(value)) {
      return toTitleCase(value.join(", "));
    }

    if (typeof value !== "string") {
      if (typeof value === "object" && key === "address") {
        return toTitleCase(Object.values(value).join(", "));
      }

      return String(value);
    }

    if (value.startsWith("http")) {
      return value;
    }

    if (
      key === USER_PROPERTIES.createdAt ||
      key === USER_PROPERTIES.updatedAt ||
      key === USER_PROPERTIES.passwordLastUpdated
    ) {
      return formatDate(value);
    }

    if (key === USER_PROPERTIES.bio) {
      return toSentenceCase(value);
    }

    if (key === USER_PROPERTIES.email) {
      return value;
    }

    return toTitleCase(value);
  };

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <h2 className="font-semibold text-xl">Update Profile</h2>
      <div className="[&::-webkit-scrollbar-thumb]:hover:bg-glass-surface-lighter [&::-webkit-scrollbar-track]:bg-transparent p-2 pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 max-h-96 overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary transition-all ease-in-out">
        <table className="w-full text-glass-text-primary table-fixed">
          <tbody>
            {Object.values(USER_PROPERTIES).map((key, idx) => {
              if (
                key === USER_PROPERTIES.id ||
                key === USER_PROPERTIES.updatedAt
              )
                return null;

              const value = user?.[key as keyof typeof user];

              if (!value || (Array.isArray(value) && value?.length < 1))
                return null;

              const safeValue = renderValue(key, value) || "";

              return (
                <tr key={idx} className="w-full table-fixed">
                  <td className="py-1 w-1/4 h-full font-semibold text-glass-text-primary text-ld text-left align-bottom">
                    {USER_PROPERTY_LABELS[key]}
                  </td>
                  <td className="py-1 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
                    <input
                      type="text"
                      placeholder={safeValue}
                      defaultValue={safeValue}
                      className={`bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md mt-3 px-5 py-2 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-4xl outline-none w-full text-glass-text-primary text-md placeholder:text-glass-text-secondary tracking-wider`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileDetailsUpdateContext;
