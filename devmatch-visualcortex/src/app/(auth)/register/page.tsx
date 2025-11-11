import { Metadata } from "next";
import { authFormFields } from "@/config/config";
import Main from "@/components/main/main";
import AuthFormWrapper from "@/components/auth/authFormWrapper";

export const metadata: Metadata = {
  title: authFormFields.login.label,
};

const RegisterPage = () => {
  return (
    <Main>
      <AuthFormWrapper type={authFormFields.register.type} />
    </Main>
  );
};

export default RegisterPage;
