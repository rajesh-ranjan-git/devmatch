import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDevMatchAppStore } from "@/store/store";
import { UserPlus } from "lucide-react";

const ConnectionRequests = () => {
  const switchTheme = useDevMatchAppStore((state) => state.switchTheme);

  return (
    <Sheet>
      <SheetTrigger
        className={`flex justify-center items-center gap-2 p-2 border-1  rounded-lg font-semibold transition-all ease-in-out cursor-pointer ${
          switchTheme === "dark" ? "hover:border-white" : "hover:border-black"
        }`}
      >
        <UserPlus />
        <span>Requests</span>
      </SheetTrigger>
      <SheetContent className="glass-sheet">
        <SheetHeader>
          <SheetTitle>Connection Requests</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ConnectionRequests;
