import Main from "@/components/main/main";
import DefaultMainContent from "@/components/main/defaultMainContent";
import Header from "@/components/header/header";
import CheckAuthWrapper from "@/components/auth/checkAuthWrapper";

export default function Home() {
  return (
    <>
      <Main>
        <DefaultMainContent />
      </Main>
    </>
  );
}
