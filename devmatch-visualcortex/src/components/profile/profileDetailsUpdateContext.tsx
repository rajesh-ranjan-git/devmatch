import {
  GENDER_PROPERTIES,
  PROFILE_UPDATE_FORM_FIELDS,
} from "@/config/constants";
import { profileDetailsFormFieldInputItems } from "@/config/config";
import { ProfileComponentProps } from "@/types/propTypes";
import { toSentenceCase, toTitleCase } from "@/lib/utils/utils";
import Input from "@/components/ui/inputs/input";
import Radio from "@/components/ui/inputs/radio";

const ProfileDetailsUpdateContext = ({ user }: ProfileComponentProps) => {
  const renderValue = (key: string, value: any) => {
    if (value === null || value === undefined) {
      return null;
    }

    switch (key) {
      case PROFILE_UPDATE_FORM_FIELDS.email:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.email?.name}
            type={value ?? profileDetailsFormFieldInputItems.email?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.email?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.email?.icon}
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.userName:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.userName?.name}
            type={value ?? profileDetailsFormFieldInputItems.userName?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.userName?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.userName?.icon}
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.firstName:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.firstName?.name}
            type={value ?? profileDetailsFormFieldInputItems.firstName?.type}
            placeholder={
              toTitleCase(value) ??
              profileDetailsFormFieldInputItems.firstName?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.firstName?.icon}
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.middleName:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.middleName?.name}
            type={value ?? profileDetailsFormFieldInputItems.middleName?.type}
            placeholder={
              toTitleCase(value) ??
              profileDetailsFormFieldInputItems.middleName?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.middleName?.icon}
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.lastName:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.lastName?.name}
            type={value ?? profileDetailsFormFieldInputItems.lastName?.type}
            placeholder={
              toTitleCase(value) ??
              profileDetailsFormFieldInputItems.lastName?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.lastName?.icon}
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.nickName:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.nickName?.name}
            type={value ?? profileDetailsFormFieldInputItems.nickName?.type}
            placeholder={
              toTitleCase(value) ??
              profileDetailsFormFieldInputItems.nickName?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.nickName?.icon}
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.age:
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

      case PROFILE_UPDATE_FORM_FIELDS.phone:
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

      case PROFILE_UPDATE_FORM_FIELDS.gender:
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

      case PROFILE_UPDATE_FORM_FIELDS.bio:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.bio?.name}
            type={value ?? profileDetailsFormFieldInputItems.bio?.type}
            placeholder={
              toSentenceCase(value) ??
              profileDetailsFormFieldInputItems.bio?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.bio?.icon}
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.maritalStatus:
        return (
          <Input
            name={
              value ?? profileDetailsFormFieldInputItems.maritalStatus?.name
            }
            type={
              value ?? profileDetailsFormFieldInputItems.maritalStatus?.type
            }
            placeholder={
              toTitleCase(value) ??
              profileDetailsFormFieldInputItems.maritalStatus?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.maritalStatus?.icon}
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.jobProfile:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.jobProfile?.name}
            type={value ?? profileDetailsFormFieldInputItems.jobProfile?.type}
            placeholder={
              toTitleCase(value) ??
              profileDetailsFormFieldInputItems.jobProfile?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.jobProfile?.icon}
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.experience:
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

      case PROFILE_UPDATE_FORM_FIELDS.facebook:
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

      case PROFILE_UPDATE_FORM_FIELDS.instagram:
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

      case PROFILE_UPDATE_FORM_FIELDS.twitter:
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

      case PROFILE_UPDATE_FORM_FIELDS.github:
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

      case PROFILE_UPDATE_FORM_FIELDS.linkedin:
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

      case PROFILE_UPDATE_FORM_FIELDS.youtube:
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

      case PROFILE_UPDATE_FORM_FIELDS.website:
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

      case PROFILE_UPDATE_FORM_FIELDS.company:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.company?.name}
            type={value ?? profileDetailsFormFieldInputItems.company?.type}
            placeholder={
              toTitleCase(value) ??
              profileDetailsFormFieldInputItems.company?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.company?.icon}
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.organization:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.organization?.name}
            type={value ?? profileDetailsFormFieldInputItems.organization?.type}
            placeholder={
              toTitleCase(value) ??
              profileDetailsFormFieldInputItems.organization?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.organization?.icon}
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.skills:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.skills?.name}
            type={value ?? profileDetailsFormFieldInputItems.skills?.type}
            placeholder={
              toTitleCase(value.join(", ")) ??
              profileDetailsFormFieldInputItems.skills?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.skills?.icon}
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.interests:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.interests?.name}
            type={value ?? profileDetailsFormFieldInputItems.interests?.type}
            placeholder={
              toTitleCase(value.join(", ")) ??
              profileDetailsFormFieldInputItems.interests?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.interests?.icon}
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.address:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.address?.name}
            type={value ?? profileDetailsFormFieldInputItems.address?.type}
            placeholder={
              toTitleCase(Object.values(value).join(", ")) ??
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
            {Object.values(PROFILE_UPDATE_FORM_FIELDS).map((key, idx) => {
              const value = user?.[key as keyof typeof user];

              if (!value || (Array.isArray(value) && value?.length < 1))
                return null;

              return (
                <tr key={idx} className="w-full table-fixed">
                  <td className="py-2 w-1/4 h-full font-semibold text-glass-text-primary text-ld text-left">
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
