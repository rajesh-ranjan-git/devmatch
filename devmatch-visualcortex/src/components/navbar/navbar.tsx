import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  return (
    <section className="flex justify-between items-center p-2 px-20 border-primary-foreground border-b-2 w-full text-primary text-2xl">
      <div className="flex justify-center items-center gap-2 font-semibold">
        <Image
          src={"/devmatch-logo.png"}
          width={40}
          height={40}
          alt="dev-match-logo"
          className="border-2 border-primary rounded-full"
        />
        <span>DevMatch</span>
      </div>
      <div>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
};

export default Navbar;
