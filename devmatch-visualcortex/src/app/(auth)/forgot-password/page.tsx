import { Metadata } from "next";
import { authFormFields } from "@/config/config";
import Main from "@/components/main/main";
import AuthFormWrapper from "@/components/auth/authFormWrapper";

export const metadata: Metadata = {
  title: authFormFields.login.label,
};

const ForgotPasswordPage = () => {
  return (
    <Main>
      <AuthFormWrapper type={authFormFields.forgotPassword.type} />
    </Main>
  );
};

export default ForgotPasswordPage;
