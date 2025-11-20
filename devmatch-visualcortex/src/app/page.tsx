"use client";

import Main from "@/components/main/main";
import DefaultMainContent from "@/components/main/defaultMainContent";
import useCheckAuth from "@/hooks/useCheckAuth";

export default function Home() {
  useCheckAuth();

  return (
    <>
      <Main>
        <DefaultMainContent />
      </Main>
    </>
  );
}
