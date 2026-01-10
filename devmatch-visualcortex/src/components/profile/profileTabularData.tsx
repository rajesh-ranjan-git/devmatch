import Link from "next/link";
import { MdEdit, MdOutlineEdit } from "react-icons/md";
import { USER_PROPERTIES, USER_PROPERTY_LABELS } from "@/config/constants";
import { ProfileComponentProps } from "@/types/propTypes";
import { formatDate, toSentenceCase, toTitleCase } from "@/lib/utils/utils";
import { useDevMatchAppStore } from "@/store/store";

const ProfileTabularData = ({ user }: ProfileComponentProps) => {
  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);

  const renderValue = (key: string, value: string) => {
    if (value === null || value === undefined) {
      return null;
    }

    if (Array.isArray(value)) {
      return (
        <ul className="space-y-1 list-disc list-inside">
          {value.map((item, index) => (
            <li key={index}>{toTitleCase(String(item))}</li>
          ))}
        </ul>
      );
    }

    if (typeof value !== "string") {
      if (typeof value === "object" && key === "address") {
        return toTitleCase(Object.values(value).join(", "));
      }

      return String(value);
    }

    if (value.startsWith("http")) {
      return (
        <Link
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-all ease-in-out"
        >
          {value}
        </Link>
      );
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
    <>
      {Object.values(USER_PROPERTIES).map((key, idx) => {
        if (key === USER_PROPERTIES.id) return null;

        const value = user?.[key as keyof typeof user];

        if (!value || (Array.isArray(value) && value?.length < 1)) return null;

        return (
          <tr key={idx} className="w-full table-fixed">
            <td className="py-1 w-1/4 font-semibold text-glass-text-primary text-sm align-top">
              {USER_PROPERTY_LABELS[key]}
            </td>
            <td className="py-1 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
              <div className="flex justify-between items-start w-full overflow-hidden">
                <div className="pr-4 w-full">
                  <span>{renderValue(key, value)}</span>
                </div>
                {loggedInUser?.id === user?.id && (
                  <div className="group/icon flex justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparent hover:border-glass-border-bright rounded-sm w-7glass-text-secondary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                )}
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default ProfileTabularData;
