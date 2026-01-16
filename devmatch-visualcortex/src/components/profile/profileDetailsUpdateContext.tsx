import { GENDER_PROPERTIES } from "@/config/constants";
import {
  allowedUpdateProfileProperties,
  profileDetailsFormFieldInputItems,
} from "@/config/config";
import { ProfileComponentProps } from "@/types/propTypes";
import Input from "@/components/ui/inputs/input";
import Radio from "@/components/ui/inputs/radio";
import Chips from "@/components/ui/chips/chips";

const ProfileDetailsUpdateContext = ({ user }: ProfileComponentProps) => {
  const renderValue = (key: string, value: any) => {
    switch (key) {
      case allowedUpdateProfileProperties.firstName:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.firstName?.name}
            type={value ?? profileDetailsFormFieldInputItems.firstName?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.firstName?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.firstName?.icon}
          />
        );

      case allowedUpdateProfileProperties.middleName:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.middleName?.name}
            type={value ?? profileDetailsFormFieldInputItems.middleName?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.middleName?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.middleName?.icon}
          />
        );

      case allowedUpdateProfileProperties.lastName:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.lastName?.name}
            type={value ?? profileDetailsFormFieldInputItems.lastName?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.lastName?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.lastName?.icon}
          />
        );

      case allowedUpdateProfileProperties.nickName:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.nickName?.name}
            type={value ?? profileDetailsFormFieldInputItems.nickName?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.nickName?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.nickName?.icon}
          />
        );

      case allowedUpdateProfileProperties.age:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.age?.name}
            type={value ?? profileDetailsFormFieldInputItems.age?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.age?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.age?.icon}
          />
        );

      case allowedUpdateProfileProperties.phone:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.phone?.name}
            type={value ?? profileDetailsFormFieldInputItems.phone?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.phone?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.phone?.icon}
          />
        );

      case allowedUpdateProfileProperties.gender:
        return (
          <Radio
            name={value ?? profileDetailsFormFieldInputItems.gender?.name}
            options={Object.values(GENDER_PROPERTIES)}
            value={
              value ?? profileDetailsFormFieldInputItems.gender?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.gender?.icon}
          />
        );

      case allowedUpdateProfileProperties.bio:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.bio?.name}
            type={value ?? profileDetailsFormFieldInputItems.bio?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.bio?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.bio?.icon}
          />
        );

      case allowedUpdateProfileProperties.maritalStatus:
        return (
          <Input
            name={
              value ?? profileDetailsFormFieldInputItems.maritalStatus?.name
            }
            type={
              value ?? profileDetailsFormFieldInputItems.maritalStatus?.type
            }
            placeholder={
              value ??
              profileDetailsFormFieldInputItems.maritalStatus?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.maritalStatus?.icon}
          />
        );

      case allowedUpdateProfileProperties.jobProfile:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.jobProfile?.name}
            type={value ?? profileDetailsFormFieldInputItems.jobProfile?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.jobProfile?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.jobProfile?.icon}
          />
        );

      case allowedUpdateProfileProperties.experience:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.experience?.name}
            type={value ?? profileDetailsFormFieldInputItems.experience?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.experience?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.experience?.icon}
          />
        );

      case allowedUpdateProfileProperties.facebook:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.facebook?.name}
            type={value ?? profileDetailsFormFieldInputItems.facebook?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.facebook?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.facebook?.icon}
          />
        );

      case allowedUpdateProfileProperties.instagram:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.instagram?.name}
            type={value ?? profileDetailsFormFieldInputItems.instagram?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.instagram?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.instagram?.icon}
          />
        );

      case allowedUpdateProfileProperties.twitter:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.twitter?.name}
            type={value ?? profileDetailsFormFieldInputItems.twitter?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.twitter?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.twitter?.icon}
          />
        );

      case allowedUpdateProfileProperties.github:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.github?.name}
            type={value ?? profileDetailsFormFieldInputItems.github?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.github?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.github?.icon}
          />
        );

      case allowedUpdateProfileProperties.linkedin:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.linkedin?.name}
            type={value ?? profileDetailsFormFieldInputItems.linkedin?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.linkedin?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.linkedin?.icon}
          />
        );

      case allowedUpdateProfileProperties.youtube:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.youtube?.name}
            type={value ?? profileDetailsFormFieldInputItems.youtube?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.youtube?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.youtube?.icon}
          />
        );

      case allowedUpdateProfileProperties.website:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.website?.name}
            type={value ?? profileDetailsFormFieldInputItems.website?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.website?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.website?.icon}
          />
        );

      case allowedUpdateProfileProperties.company:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.company?.name}
            type={value ?? profileDetailsFormFieldInputItems.company?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.company?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.company?.icon}
          />
        );

      case allowedUpdateProfileProperties.organization:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.organization?.name}
            type={value ?? profileDetailsFormFieldInputItems.organization?.type}
            placeholder={
              value ??
              profileDetailsFormFieldInputItems.organization?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.organization?.icon}
          />
        );

      case allowedUpdateProfileProperties.skills:
        return (
          <Chips
            values={value}
            icon={profileDetailsFormFieldInputItems.skills?.icon}
          />
        );

      case allowedUpdateProfileProperties.interests:
        return (
          <Chips
            values={value}
            icon={profileDetailsFormFieldInputItems.interests?.icon}
          />
        );

      case allowedUpdateProfileProperties.address:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.address?.name}
            type={value ?? profileDetailsFormFieldInputItems.address?.type}
            placeholder={
              Object.values(value).join(", ") ??
              profileDetailsFormFieldInputItems.address?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.address?.icon}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <h2 className="font-semibold text-xl">Update Profile</h2>
      <div className="[&::-webkit-scrollbar-thumb]:hover:bg-glass-surface-lighter [&::-webkit-scrollbar-track]:bg-transparent p-2 pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 max-h-96 overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary transition-all ease-in-out">
        <table className="w-full text-glass-text-primary table-fixed">
          <tbody>
            {Object.values(allowedUpdateProfileProperties).map((key, idx) => {
              const value = user?.[key as keyof typeof user];

              return (
                <tr key={idx} className="w-full table-fixed">
                  <td
                    className={`py-2 w-1/4 h-full font-semibold text-glass-text-primary text-ld text-left ${Array.isArray(value) ? "align-top py-4" : ""}`}
                  >
                    {profileDetailsFormFieldInputItems[key]?.label}
                  </td>
                  <td className="py-2 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
                    {renderValue(key, value)}
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
