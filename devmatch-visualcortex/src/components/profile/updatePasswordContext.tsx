import { useActionState, useEffect, useState } from "react";
import Form from "next/form";
import {
  updatePasswordFormFieldInputItems,
  profileDetailsFormFieldButtonItems,
} from "@/config/config";
import { UpdatePasswordFormStateType } from "@/types/types";
import { ProfileDetailsUpdateContextProps } from "@/types/propTypes";
import { toTitleCase } from "@/lib/utils/utils";
import { updatePasswordAction } from "@/lib/actions/profileActions";
import { useToast } from "@/hooks/toast";
import FormErrorMessage from "@/components/errors/formErrorMessage";
import Input from "@/components/ui/inputs/input";
import SubmitButton from "@/components/ui/buttons/submitButton";

const UpdatePasswordContext = ({
  user,
  onClose,
}: ProfileDetailsUpdateContextProps) => {
  if (!user) return null;

  const initialState: UpdatePasswordFormStateType = { message: "", errors: {} };

  const [state, formAction, isPending] = useActionState(
    updatePasswordAction,
    initialState,
  );

  const { showToast } = useToast();

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
    <div className="flex flex-col gap-2 w-[56vw] h-full">
      <h2 className="font-semibold text-xl">Update Password</h2>
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
            <tr className="w-full table-fixed">
              <td className="py-2 w-1/5 h-full font-semibold text-glass-text-primary text-ld text-left">
                {updatePasswordFormFieldInputItems.oldPassword?.label}
              </td>
              <td className="py-2 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
                <>
                  <Input
                    name={
                      updatePasswordFormFieldInputItems.oldPassword
                        ?.name as string
                    }
                    type={
                      updatePasswordFormFieldInputItems.oldPassword
                        ?.type as string
                    }
                    placeholder={
                      updatePasswordFormFieldInputItems.oldPassword
                        ?.placeholder as string
                    }
                    icon={updatePasswordFormFieldInputItems.oldPassword?.icon}
                  />

                  <FormErrorMessage
                    errors={
                      !state?.success &&
                      state?.errors &&
                      state?.errors?.oldPassword
                        ? state?.errors?.oldPassword
                        : null
                    }
                    className="text-left"
                  />
                </>
              </td>
            </tr>
            <tr className="w-full table-fixed">
              <td className="py-2 w-2/5 h-full font-semibold text-glass-text-primary text-ld text-left">
                {updatePasswordFormFieldInputItems.newPassword?.label}
              </td>
              <td className="py-2 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
                <>
                  <Input
                    name={
                      updatePasswordFormFieldInputItems.newPassword
                        ?.name as string
                    }
                    type={
                      updatePasswordFormFieldInputItems.newPassword
                        ?.type as string
                    }
                    placeholder={
                      updatePasswordFormFieldInputItems.newPassword
                        ?.placeholder as string
                    }
                    icon={updatePasswordFormFieldInputItems.newPassword?.icon}
                  />

                  <FormErrorMessage
                    errors={
                      !state?.success &&
                      state?.errors &&
                      state?.errors?.newPassword
                        ? state?.errors?.newPassword
                        : null
                    }
                    className="text-left"
                  />
                </>
              </td>
            </tr>
            <tr className="w-full table-fixed">
              <td className="py-2 w-1/4 h-full font-semibold text-glass-text-primary text-ld text-left">
                {updatePasswordFormFieldInputItems.confirmPassword?.label}
              </td>
              <td className="py-2 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
                <>
                  <Input
                    name={
                      updatePasswordFormFieldInputItems.confirmPassword
                        ?.name as string
                    }
                    type={
                      updatePasswordFormFieldInputItems.confirmPassword
                        ?.type as string
                    }
                    placeholder={
                      updatePasswordFormFieldInputItems.confirmPassword
                        ?.placeholder as string
                    }
                    icon={
                      updatePasswordFormFieldInputItems.confirmPassword?.icon
                    }
                  />

                  <FormErrorMessage
                    errors={
                      !state?.success &&
                      state?.errors &&
                      state?.errors?.confirmPassword
                        ? state?.errors?.confirmPassword
                        : null
                    }
                    className="text-left"
                  />
                </>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center items-center gap-4 m-4">
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
        </div>
      </Form>
    </div>
  );
};

export default UpdatePasswordContext;
