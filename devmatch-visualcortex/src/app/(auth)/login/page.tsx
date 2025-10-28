import { Metadata } from "next";
import Main from "@/components/main/main";
import Auth from "@/components/auth/auth";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <Main>
      <Auth type="login" />
    </Main>
  );
};

export default LoginPage;
