import { Metadata } from "next";
import Main from "@/components/main/main";
import Auth from "@/components/auth/auth";

export const metadata: Metadata = {
  title: "Register",
};

const Register = () => {
  return (
    <Main>
      <Auth />
    </Main>
  );
};

export default Register;
