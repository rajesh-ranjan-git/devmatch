import { Metadata } from "next";
import { publicClientRoutes } from "@/lib/routes/routes";
import { toTitleCase } from "@/lib/utils/utils";
import Main from "@/components/main/main";
import AuthFormWrapper from "@/components/auth/authFormWrapper";

export const metadata: Metadata = {
  title: toTitleCase(publicClientRoutes.forgotPassword),
};

const ForgotPasswordPage = () => {
  return (
    <Main>
      <AuthFormWrapper type={publicClientRoutes.forgotPassword} />
    </Main>
  );
};

export default ForgotPasswordPage;
