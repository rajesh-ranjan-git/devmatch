import { Metadata } from "next";
import { authRoutes } from "@/lib/routes/routes";
import { toTitleCase } from "@/lib/utils/utils";
import Main from "@/components/main/main";
import AuthFormWrapper from "@/components/auth/authFormWrapper";

export const metadata: Metadata = {
  title: toTitleCase(authRoutes.forgotPassword),
};

const ForgotPasswordPage = () => {
  return (
    <Main>
      <AuthFormWrapper type={authRoutes.forgotPassword} />
    </Main>
  );
};

export default ForgotPasswordPage;
