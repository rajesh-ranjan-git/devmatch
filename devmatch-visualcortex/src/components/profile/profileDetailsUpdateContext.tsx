import { useActionState, useEffect } from "react";
import Form from "next/form";
import {
  ADDRESS_PROPERTIES,
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
import { ProfileDetailsProps } from "@/types/propTypes";
import { isPlainObject, toTitleCase, typedKeys } from "@/lib/utils/utils";
import { updateProfileDetailsAction } from "@/lib/actions/profileActions";
import { useToast } from "@/hooks/toast";
import ProfileDetailsUpdateDropdown from "@/components/profile/profileDetailsUpdateDropdown";
import FormErrorMessage from "@/components/errors/formErrorMessage";
import Input from "@/components/ui/inputs/input";
import Radio from "@/components/ui/inputs/radio";
import Chips from "@/components/ui/chips/chips";
import SubmitButton from "@/components/ui/buttons/submitButton";
import ButtonDestructive from "@/components/ui/buttons/buttonDestructive";

const ProfileDetailsUpdateContext = ({
  user,
  onClose,
}: ProfileDetailsProps) => {
  const initialState: ProfileUpdateFormStateType = { message: "", errors: {} };

  const [state, formAction, isPending] = useActionState(
    updateProfileDetailsAction,
    initialState,
  );

  const { showToast } = useToast();

  const renderValue = (key: string, value: any) => {
    switch (key) {
      case allowedUpdateProfileProperties.firstName:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.firstName?.name}
              type={profileDetailsFormFieldInputItems.firstName?.type as string}
              placeholder={
                profileDetailsFormFieldInputItems.firstName
                  ?.placeholder as string
              }
              defaultValue={
                state?.success === false && state?.inputs?.firstName
                  ? state.inputs.firstName
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.firstName?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.firstName
                  ? state?.errors?.firstName
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.middleName:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.middleName?.name}
              type={
                profileDetailsFormFieldInputItems.middleName?.type as string
              }
              placeholder={
                value ??
                (profileDetailsFormFieldInputItems.middleName
                  ?.placeholder as string)
              }
              defaultValue={
                state?.success === false &&
                state?.inputs &&
                state?.inputs?.middleName
                  ? (state?.inputs?.middleName as string)
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.middleName?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.middleName
                  ? state?.errors?.middleName
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.lastName:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.lastName?.name}
              type={profileDetailsFormFieldInputItems.lastName?.type as string}
              placeholder={
                value ??
                (profileDetailsFormFieldInputItems.lastName
                  ?.placeholder as string)
              }
              defaultValue={
                state?.success === false &&
                state?.inputs &&
                state?.inputs?.lastName
                  ? (state?.inputs?.lastName as string)
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.lastName?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.lastName
                  ? state?.errors?.lastName
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.nickName:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.nickName?.name}
              type={profileDetailsFormFieldInputItems.nickName?.type as string}
              placeholder={
                value ??
                (profileDetailsFormFieldInputItems.nickName
                  ?.placeholder as string)
              }
              defaultValue={
                state?.success === false &&
                state?.inputs &&
                state?.inputs?.nickName
                  ? (state?.inputs?.nickName as string)
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.nickName?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.nickName
                  ? state?.errors?.nickName
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.age:
        return (
          <>
            <ProfileDetailsUpdateDropdown
              name={allowedUpdateProfileProperties.age}
              value={value}
              placeholder="Age"
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.age
                  ? state?.errors?.age
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.phone:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.phone?.name}
              type={profileDetailsFormFieldInputItems.phone?.type as string}
              placeholder={
                value ??
                (profileDetailsFormFieldInputItems.phone?.placeholder as string)
              }
              defaultValue={
                state?.success === false &&
                state?.inputs &&
                state?.inputs?.phone
                  ? (state?.inputs?.phone as string)
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.phone?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.phone
                  ? state?.errors?.phone
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.gender:
        return (
          <>
            <Radio
              name={key ?? profileDetailsFormFieldInputItems.gender?.name}
              options={Object.values(GENDER_PROPERTIES)}
              value={
                value ??
                (profileDetailsFormFieldInputItems.gender
                  ?.placeholder as string)
              }
              icon={profileDetailsFormFieldInputItems.gender?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.gender
                  ? state?.errors?.gender
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.bio:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.bio?.name}
              type={profileDetailsFormFieldInputItems.bio?.type as string}
              placeholder={
                value ??
                (profileDetailsFormFieldInputItems.bio?.placeholder as string)
              }
              defaultValue={
                state?.success === false && state?.inputs && state?.inputs?.bio
                  ? (state?.inputs?.bio as string)
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.bio?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.bio
                  ? state?.errors?.bio
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.maritalStatus:
        return (
          <>
            <Radio
              name={
                key ?? profileDetailsFormFieldInputItems.maritalStatus?.name
              }
              options={Object.values(MARITAL_STATUS_PROPERTIES)}
              value={
                value ??
                (profileDetailsFormFieldInputItems.maritalStatus
                  ?.placeholder as string)
              }
              icon={profileDetailsFormFieldInputItems.maritalStatus?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.maritalStatus
                  ? state?.errors?.maritalStatus
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.jobProfile:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.jobProfile?.name}
              type={
                profileDetailsFormFieldInputItems.jobProfile?.type as string
              }
              placeholder={
                value ??
                (profileDetailsFormFieldInputItems.jobProfile
                  ?.placeholder as string)
              }
              defaultValue={
                state?.success === false &&
                state?.inputs &&
                state?.inputs?.jobProfile
                  ? (state?.inputs?.jobProfile as string)
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.jobProfile?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.jobProfile
                  ? state?.errors?.jobProfile
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.experience:
        return (
          <>
            <ProfileDetailsUpdateDropdown
              name={allowedUpdateProfileProperties.experience}
              value={value}
              placeholder="Experience"
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.experience
                  ? state?.errors?.experience
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.facebook:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.facebook?.name}
              type={profileDetailsFormFieldInputItems.facebook?.type as string}
              placeholder={
                value ??
                (profileDetailsFormFieldInputItems.facebook
                  ?.placeholder as string)
              }
              defaultValue={
                state?.success === false &&
                state?.inputs &&
                state?.inputs?.facebook
                  ? (state?.inputs?.facebook as string)
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.facebook?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.facebook
                  ? state?.errors?.facebook
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.instagram:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.instagram?.name}
              type={profileDetailsFormFieldInputItems.instagram?.type as string}
              placeholder={
                value ??
                (profileDetailsFormFieldInputItems.instagram
                  ?.placeholder as string)
              }
              defaultValue={
                state?.success === false &&
                state?.inputs &&
                state?.inputs?.instagram
                  ? (state?.inputs?.instagram as string)
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.instagram?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.instagram
                  ? state?.errors?.instagram
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.twitter:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.twitter?.name}
              type={profileDetailsFormFieldInputItems.twitter?.type as string}
              placeholder={
                value ??
                (profileDetailsFormFieldInputItems.twitter
                  ?.placeholder as string)
              }
              defaultValue={
                state?.success === false &&
                state?.inputs &&
                state?.inputs?.twitter
                  ? (state?.inputs?.twitter as string)
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.twitter?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.twitter
                  ? state?.errors?.twitter
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.github:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.github?.name}
              type={profileDetailsFormFieldInputItems.github?.type as string}
              placeholder={
                value ??
                (profileDetailsFormFieldInputItems.github
                  ?.placeholder as string)
              }
              defaultValue={
                state?.success === false &&
                state?.inputs &&
                state?.inputs?.github
                  ? (state?.inputs?.github as string)
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.github?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.github
                  ? state?.errors?.github
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.linkedin:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.linkedin?.name}
              type={profileDetailsFormFieldInputItems.linkedin?.type as string}
              placeholder={
                value ??
                (profileDetailsFormFieldInputItems.linkedin
                  ?.placeholder as string)
              }
              defaultValue={
                state?.success === false &&
                state?.inputs &&
                state?.inputs?.linkedin
                  ? (state?.inputs?.linkedin as string)
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.linkedin?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.linkedin
                  ? state?.errors?.linkedin
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.youtube:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.youtube?.name}
              type={profileDetailsFormFieldInputItems.youtube?.type as string}
              placeholder={
                value ??
                (profileDetailsFormFieldInputItems.youtube
                  ?.placeholder as string)
              }
              defaultValue={
                state?.success === false &&
                state?.inputs &&
                state?.inputs?.youtube
                  ? (state?.inputs?.youtube as string)
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.youtube?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.linkedin
                  ? state?.errors?.linkedin
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.website:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.website?.name}
              type={profileDetailsFormFieldInputItems.website?.type as string}
              placeholder={
                value ??
                (profileDetailsFormFieldInputItems.website
                  ?.placeholder as string)
              }
              defaultValue={
                state?.success === false &&
                state?.inputs &&
                state?.inputs?.website
                  ? (state?.inputs?.website as string)
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.website?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.website
                  ? state?.errors?.website
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.company:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.company?.name}
              type={profileDetailsFormFieldInputItems.company?.type as string}
              placeholder={
                value ??
                (profileDetailsFormFieldInputItems.company
                  ?.placeholder as string)
              }
              defaultValue={
                state?.success === false &&
                state?.inputs &&
                state?.inputs?.company
                  ? (state?.inputs?.company as string)
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.company?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.company
                  ? state?.errors?.company
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.organization:
        return (
          <>
            <Input
              name={key ?? profileDetailsFormFieldInputItems.organization?.name}
              type={
                profileDetailsFormFieldInputItems.organization?.type as string
              }
              placeholder={
                value ??
                (profileDetailsFormFieldInputItems.organization
                  ?.placeholder as string)
              }
              defaultValue={
                state?.success === false &&
                state?.inputs &&
                state?.inputs?.organization
                  ? (state?.inputs?.organization as string)
                  : (value ?? "")
              }
              icon={profileDetailsFormFieldInputItems.organization?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.organization
                  ? state?.errors?.organization
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.skills:
        return (
          <>
            <Chips
              name={key ?? profileDetailsFormFieldInputItems.skills?.name}
              type={profileDetailsFormFieldInputItems.skills?.type as string}
              values={value}
              icon={profileDetailsFormFieldInputItems.skills?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.skills
                  ? state?.errors?.skills
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.interests:
        return (
          <>
            <Chips
              name={key ?? profileDetailsFormFieldInputItems.interests?.name}
              type={profileDetailsFormFieldInputItems.interests?.type as string}
              values={value}
              icon={profileDetailsFormFieldInputItems.interests?.icon}
            />

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.interests
                  ? state?.errors?.interests
                  : null
              }
              className="text-left"
            />
          </>
        );

      case allowedUpdateProfileProperties.address:
        return (
          <>
            {typedKeys(addressFormFieldInputItems).map((item, idx) => (
              <div className="flex items-center w-full" key={idx}>
                <label className="mb-4 w-2/5 font-semibold text-glass-text-primary text-left">
                  {addressFormFieldInputItems[item]?.label}
                </label>
                <Input
                  name={Object.keys(ADDRESS_PROPERTIES)[idx]}
                  type={addressFormFieldInputItems[item]?.type as string}
                  placeholder={
                    addressFormFieldInputItems[item]?.placeholder as string
                  }
                  defaultValue={
                    state?.success === false &&
                    state?.inputs &&
                    state?.inputs?.address
                      ? (state?.inputs?.address as string)
                      : (value?.[item] ?? "")
                  }
                  icon={addressFormFieldInputItems[item]?.icon}
                  className="mb-4 w-3/5"
                />
              </div>
            ))}

            <FormErrorMessage
              errors={
                !state?.success && state?.errors && state?.errors?.address
                  ? state?.errors?.address
                  : null
              }
              className="my-4"
            />
          </>
        );
    }
  };

  useEffect(() => {
    if (!state?.success && !state?.result?.success && state?.result?.error) {
      showToast({
        title: toTitleCase(state?.message),
        message: state?.result?.error?.message,
        variant: "error",
      });
    } else if (state?.result?.success && state?.result?.data) {
      onClose();

      showToast({
        title: toTitleCase(state?.message),
        message: state?.result?.data?.message,
        variant: "success",
      });
    }
  }, [state]);

  return (
    <div className="flex flex-col gap-2 w-[50vw] h-full">
      <h2 className="font-semibold text-xl">Update Profile</h2>
      <Form
        action={formAction}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="[&::-webkit-scrollbar-thumb]:bg-glass-surface-heavy [&::-webkit-scrollbar-track]:bg-transparent p-2 pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 max-h-96 overflow-y-auto [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out"
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
