import { Metadata } from "next";
import { AUTH_FORM_FIELDS } from "@/config/constants";
import { authFormFieldButtonItems } from "@/config/config";
import Main from "@/components/main/main";
import AuthFormWrapper from "@/components/auth/authFormWrapper";

export const metadata: Metadata = {
  title: authFormFieldButtonItems?.register?.name,
};

const RegisterPage = () => {
  return (
    <Main>
      <AuthFormWrapper type={AUTH_FORM_FIELDS.register} />
    </Main>
  );
};

export default RegisterPage;
