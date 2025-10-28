import { Metadata } from "next";
import { authFields } from "@/config/config";
import Main from "@/components/main/main";
import Auth from "@/components/auth/auth";

export const metadata: Metadata = {
  title: authFields.login.label,
};

const ForgotPasswordPage = () => {
  return (
    <Main>
      <Auth type={authFields.forgotPassword.type} />
    </Main>
  );
};

export default ForgotPasswordPage;
