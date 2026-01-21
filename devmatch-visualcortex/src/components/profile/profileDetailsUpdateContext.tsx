import { useActionState } from "react";
import Form from "next/form";
import {
  GENDER_PROPERTIES,
  MARITAL_STATUS_PROPERTIES,
} from "@/config/constants";
import {
  addressFormFieldInputItems,
  allowedUpdateProfileProperties,
  profileDetailsFormFieldButtonItems,
  profileDetailsFormFieldInputItems,
} from "@/config/config";
import { ProfileUpdateFormStateType } from "@/types/types";
import { ProfileComponentProps } from "@/types/propTypes";
import { isPlainObject, typedKeys } from "@/lib/utils/utils";
import { updateProfileDetailsAction } from "@/lib/actions/profileActions";
import ProfileDetailsUpdateDropdown from "@/components/profile/profileDetailsUpdateDropdown";
import Input from "@/components/ui/inputs/input";
import Radio from "@/components/ui/inputs/radio";
import Chips from "@/components/ui/chips/chips";
import SubmitButton from "@/components/ui/buttons/submitButton";
import ButtonDestructive from "@/components/ui/buttons/buttonDestructive";

const ProfileDetailsUpdateContext = ({
  user,
  onClose,
}: ProfileComponentProps) => {
  const initialState: ProfileUpdateFormStateType = { message: "" };

  const [state, formAction, isPending] = useActionState(
    updateProfileDetailsAction,
    initialState,
  );

  console.log("debug from ProfileDetailsUpdateContext state : ", state);

  const renderValue = (key: string, value: any) => {
    switch (key) {
      case allowedUpdateProfileProperties.firstName:
        return (
          <Input
            name={key ?? profileDetailsFormFieldInputItems.firstName?.name}
            type={profileDetailsFormFieldInputItems.firstName?.type as string}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.firstName?.placeholder
            }
            defaultValue={
              state?.success === false &&
              state?.inputs &&
              state?.inputs?.firstName
                ? (state?.inputs?.firstName as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.firstName?.icon}
          />
        );

      case allowedUpdateProfileProperties.middleName:
        return (
          <Input
            name={key ?? profileDetailsFormFieldInputItems.middleName?.name}
            type={profileDetailsFormFieldInputItems.middleName?.type as string}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.middleName?.placeholder
            }
            defaultValue={
              state?.success === false &&
              state?.inputs &&
              state?.inputs?.middleName
                ? (state?.inputs?.middleName as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.middleName?.icon}
          />
        );

      case allowedUpdateProfileProperties.lastName:
        return (
          <Input
            name={key ?? profileDetailsFormFieldInputItems.lastName?.name}
            type={profileDetailsFormFieldInputItems.lastName?.type as string}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.lastName?.placeholder
            }
            defaultValue={
              state?.success === false &&
              state?.inputs &&
              state?.inputs?.lastName
                ? (state?.inputs?.lastName as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.lastName?.icon}
          />
        );

      case allowedUpdateProfileProperties.nickName:
        return (
          <Input
            name={key ?? profileDetailsFormFieldInputItems.nickName?.name}
            type={profileDetailsFormFieldInputItems.nickName?.type as string}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.nickName?.placeholder
            }
            defaultValue={
              state?.success === false &&
              state?.inputs &&
              state?.inputs?.nickName
                ? (state?.inputs?.nickName as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.nickName?.icon}
          />
        );

      case allowedUpdateProfileProperties.age:
        return (
          <ProfileDetailsUpdateDropdown
            name={allowedUpdateProfileProperties.age}
            id="update-age-dropdown"
            value={value}
            placeholder="Select your age..."
          />
        );

      case allowedUpdateProfileProperties.phone:
        return (
          <Input
            name={key ?? profileDetailsFormFieldInputItems.phone?.name}
            type={profileDetailsFormFieldInputItems.phone?.type as string}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.phone?.placeholder
            }
            defaultValue={
              state?.success === false && state?.inputs && state?.inputs?.phone
                ? (state?.inputs?.phone as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.phone?.icon}
          />
        );

      case allowedUpdateProfileProperties.gender:
        return (
          <Radio
            name={key ?? profileDetailsFormFieldInputItems.gender?.name}
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
            name={key ?? profileDetailsFormFieldInputItems.bio?.name}
            type={profileDetailsFormFieldInputItems.bio?.type as string}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.bio?.placeholder
            }
            defaultValue={
              state?.success === false && state?.inputs && state?.inputs?.bio
                ? (state?.inputs?.bio as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.bio?.icon}
          />
        );

      case allowedUpdateProfileProperties.maritalStatus:
        return (
          <Radio
            name={
              value ?? profileDetailsFormFieldInputItems.maritalStatus?.name
            }
            options={Object.values(MARITAL_STATUS_PROPERTIES)}
            value={
              value ??
              profileDetailsFormFieldInputItems.maritalStatus?.placeholder
            }
            icon={profileDetailsFormFieldInputItems.maritalStatus?.icon}
          />
        );

      case allowedUpdateProfileProperties.jobProfile:
        return (
          <Input
            name={key ?? profileDetailsFormFieldInputItems.jobProfile?.name}
            type={profileDetailsFormFieldInputItems.jobProfile?.type as string}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.jobProfile?.placeholder
            }
            defaultValue={
              state?.success === false &&
              state?.inputs &&
              state?.inputs?.jobProfile
                ? (state?.inputs?.jobProfile as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.jobProfile?.icon}
          />
        );

      case allowedUpdateProfileProperties.experience:
        return (
          <ProfileDetailsUpdateDropdown
            name={allowedUpdateProfileProperties.experience}
            id="update-experience-dropdown"
            value={value}
            placeholder="Select your experience..."
          />
        );

      case allowedUpdateProfileProperties.facebook:
        return (
          <Input
            name={key ?? profileDetailsFormFieldInputItems.facebook?.name}
            type={profileDetailsFormFieldInputItems.facebook?.type as string}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.facebook?.placeholder
            }
            defaultValue={
              state?.success === false &&
              state?.inputs &&
              state?.inputs?.facebook
                ? (state?.inputs?.facebook as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.facebook?.icon}
          />
        );

      case allowedUpdateProfileProperties.instagram:
        return (
          <Input
            name={key ?? profileDetailsFormFieldInputItems.instagram?.name}
            type={profileDetailsFormFieldInputItems.instagram?.type as string}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.instagram?.placeholder
            }
            defaultValue={
              state?.success === false &&
              state?.inputs &&
              state?.inputs?.instagram
                ? (state?.inputs?.instagram as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.instagram?.icon}
          />
        );

      case allowedUpdateProfileProperties.twitter:
        return (
          <Input
            name={key ?? profileDetailsFormFieldInputItems.twitter?.name}
            type={profileDetailsFormFieldInputItems.twitter?.type as string}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.twitter?.placeholder
            }
            defaultValue={
              state?.success === false &&
              state?.inputs &&
              state?.inputs?.twitter
                ? (state?.inputs?.twitter as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.twitter?.icon}
          />
        );

      case allowedUpdateProfileProperties.github:
        return (
          <Input
            name={key ?? profileDetailsFormFieldInputItems.github?.name}
            type={profileDetailsFormFieldInputItems.github?.type as string}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.github?.placeholder
            }
            defaultValue={
              state?.success === false && state?.inputs && state?.inputs?.github
                ? (state?.inputs?.github as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.github?.icon}
          />
        );

      case allowedUpdateProfileProperties.linkedin:
        return (
          <Input
            name={key ?? profileDetailsFormFieldInputItems.linkedin?.name}
            type={profileDetailsFormFieldInputItems.linkedin?.type as string}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.linkedin?.placeholder
            }
            defaultValue={
              state?.success === false &&
              state?.inputs &&
              state?.inputs?.linkedin
                ? (state?.inputs?.linkedin as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.linkedin?.icon}
          />
        );

      case allowedUpdateProfileProperties.youtube:
        return (
          <Input
            name={key ?? profileDetailsFormFieldInputItems.youtube?.name}
            type={profileDetailsFormFieldInputItems.youtube?.type as string}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.youtube?.placeholder
            }
            defaultValue={
              state?.success === false &&
              state?.inputs &&
              state?.inputs?.youtube
                ? (state?.inputs?.youtube as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.youtube?.icon}
          />
        );

      case allowedUpdateProfileProperties.website:
        return (
          <Input
            name={key ?? profileDetailsFormFieldInputItems.website?.name}
            type={profileDetailsFormFieldInputItems.website?.type as string}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.website?.placeholder
            }
            defaultValue={
              state?.success === false &&
              state?.inputs &&
              state?.inputs?.website
                ? (state?.inputs?.website as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.website?.icon}
          />
        );

      case allowedUpdateProfileProperties.company:
        return (
          <Input
            name={key ?? profileDetailsFormFieldInputItems.company?.name}
            type={profileDetailsFormFieldInputItems.company?.type as string}
            placeholder={
              value ?? profileDetailsFormFieldInputItems.company?.placeholder
            }
            defaultValue={
              state?.success === false &&
              state?.inputs &&
              state?.inputs?.company
                ? (state?.inputs?.company as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.company?.icon}
          />
        );

      case allowedUpdateProfileProperties.organization:
        return (
          <Input
            name={key ?? profileDetailsFormFieldInputItems.organization?.name}
            type={
              profileDetailsFormFieldInputItems.organization?.type as string
            }
            placeholder={
              value ??
              profileDetailsFormFieldInputItems.organization?.placeholder
            }
            defaultValue={
              state?.success === false &&
              state?.inputs &&
              state?.inputs?.organization
                ? (state?.inputs?.organization as string)
                : ""
            }
            icon={profileDetailsFormFieldInputItems.organization?.icon}
          />
        );

      case allowedUpdateProfileProperties.skills:
        return (
          <Chips
            name={key ?? profileDetailsFormFieldInputItems.skills?.name}
            type={profileDetailsFormFieldInputItems.skills?.type as string}
            values={value}
            icon={profileDetailsFormFieldInputItems.skills?.icon}
          />
        );

      case allowedUpdateProfileProperties.interests:
        return (
          <Chips
            name={key ?? profileDetailsFormFieldInputItems.interests?.name}
            type={profileDetailsFormFieldInputItems.interests?.type as string}
            values={value}
            icon={profileDetailsFormFieldInputItems.interests?.icon}
          />
        );

      case allowedUpdateProfileProperties.address:
        return typedKeys(addressFormFieldInputItems).map((item, idx) => (
          <div className="flex items-center w-full" key={idx}>
            <label className="mb-4 w-2/5 font-semibold text-glass-text-primary text-left">
              {addressFormFieldInputItems[item]?.label}
            </label>
            <Input
              name={key ?? addressFormFieldInputItems[item]?.name}
              type={addressFormFieldInputItems[item]?.type as string}
              placeholder={
                value[item] ?? addressFormFieldInputItems[item]?.placeholder
              }
              defaultValue={
                state?.success === false &&
                state?.inputs &&
                state?.inputs?.address
                  ? (state?.inputs?.address as string)
                  : ""
              }
              icon={addressFormFieldInputItems[item]?.icon}
              className="mb-4 w-3/5"
            />
          </div>
        ));
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <h2 className="font-semibold text-xl">Update Profile</h2>
      <Form
        action={formAction}
        autoComplete="false"
        className="[&::-webkit-scrollbar-thumb]:hover:bg-glass-surface-lighter [&::-webkit-scrollbar-track]:bg-transparent p-2 pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 max-h-96 overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary transition-all ease-in-out"
      >
        <table className="w-full text-glass-text-primary table-fixed">
          <tbody>
            {Object.values(allowedUpdateProfileProperties).map((key, idx) => {
              const value = user?.[key as keyof typeof user];

              return (
                <tr key={idx} className="w-full table-fixed">
                  <td
                    className={`py-2 w-1/4 h-full font-semibold text-glass-text-primary text-ld text-left ${Array.isArray(value) || isPlainObject(value) ? "align-top py-4" : ""}`}
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
        <div className="flex justify-center items-center gap-4 mb-2">
          <SubmitButton
            icon={
              isPending ? (
                <svg
                  className="w-4 h-4 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                profileDetailsFormFieldButtonItems?.update?.icon
              )
            }
            text={
              isPending
                ? "Updating..."
                : profileDetailsFormFieldButtonItems?.update?.label
            }
            disabled={isPending}
            className={`h-10 ${isPending ? "w-48" : "w-40"}`}
            onClick={onClose}
          />
          <ButtonDestructive
            icon={profileDetailsFormFieldButtonItems?.discard?.icon}
            text={profileDetailsFormFieldButtonItems?.discard?.label}
            className="w-40 h-10"
            onClick={onClose}
          />
        </div>
      </Form>
    </div>
  );
};

export default ProfileDetailsUpdateContext;
