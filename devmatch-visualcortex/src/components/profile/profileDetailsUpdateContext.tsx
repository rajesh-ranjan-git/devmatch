import { PROFILE_UPDATE_FORM_FIELDS } from "@/config/constants";
import { profileDetailsFormFieldInputItems } from "@/config/config";
import { ProfileComponentProps } from "@/types/propTypes";
import { toSentenceCase, toTitleCase } from "@/lib/utils/utils";
import Input from "@/components/ui/inputs/input";

const ProfileDetailsUpdateContext = ({ user }: ProfileComponentProps) => {
  const renderValue = (key: string, value: string) => {
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
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.firstName:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.firstName?.name}
            type={value ?? profileDetailsFormFieldInputItems.firstName?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.firstName?.placeholder
            }
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.middleName:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.middleName?.name}
            type={value ?? profileDetailsFormFieldInputItems.middleName?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.middleName?.placeholder
            }
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.lastName:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.lastName?.name}
            type={value ?? profileDetailsFormFieldInputItems.lastName?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.lastName?.placeholder
            }
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.nickName:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.nickName?.name}
            type={value ?? profileDetailsFormFieldInputItems.nickName?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.nickName?.placeholder
            }
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
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.gender:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.gender?.name}
            type={value ?? profileDetailsFormFieldInputItems.gender?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.gender?.placeholder
            }
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.bio:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.bio?.name}
            type={value ?? profileDetailsFormFieldInputItems.bio?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.bio?.placeholder
            }
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
              value ??
              profileDetailsFormFieldInputItems.maritalStatus?.placeholder
            }
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.jobProfile:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.jobProfile?.name}
            type={value ?? profileDetailsFormFieldInputItems.jobProfile?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.jobProfile?.placeholder
            }
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
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.company:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.company?.name}
            type={value ?? profileDetailsFormFieldInputItems.company?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.company?.placeholder
            }
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.organization:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.organization?.name}
            type={value ?? profileDetailsFormFieldInputItems.organization?.type}
            placeholder={
              value ??
              profileDetailsFormFieldInputItems.organization?.placeholder
            }
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.skills:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.skills?.name}
            type={value ?? profileDetailsFormFieldInputItems.skills?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.skills?.placeholder
            }
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.interests:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.interests?.name}
            type={value ?? profileDetailsFormFieldInputItems.interests?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.interests?.placeholder
            }
          />
        );

      case PROFILE_UPDATE_FORM_FIELDS.address:
        return (
          <Input
            name={value ?? profileDetailsFormFieldInputItems.address?.name}
            type={value ?? profileDetailsFormFieldInputItems.address?.type}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.address?.placeholder
            }
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
                  <td className="py-1 w-1/4 h-full font-semibold text-glass-text-primary text-ld text-left align-bottom">
                    {profileDetailsFormFieldInputItems[key]?.label}
                  </td>
                  <td className="py-1 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
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
