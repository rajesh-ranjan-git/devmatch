import { Metadata } from "next";
import { AUTH_FORM_FIELDS } from "@/config/constants";
import { authFormFieldButtonItems } from "@/config/config";
import Main from "@/components/main/main";
import AuthFormWrapper from "@/components/auth/authFormWrapper";

export const metadata: Metadata = {
  title: authFormFieldButtonItems?.forgot_password?.label,
};

const ForgotPasswordPage = () => {
  return (
    <Main>
      <AuthFormWrapper type={AUTH_FORM_FIELDS.forgot_password} />
    </Main>
  );
};

export default ForgotPasswordPage;
