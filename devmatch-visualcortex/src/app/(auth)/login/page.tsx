import { Metadata } from "next";
import { authFormFields } from "@/config/config";
import Main from "@/components/main/main";
import AuthFormWrapper from "@/components/auth/authFormWrapper";

export const metadata: Metadata = {
  title: authFormFields.login.label,
};

const LoginPage = () => {
  return (
    <Main>
      <AuthFormWrapper type={authFormFields.login.type} />
    </Main>
  );
};

export default LoginPage;
