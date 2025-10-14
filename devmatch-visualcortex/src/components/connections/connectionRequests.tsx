import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserPlus } from "lucide-react";

const ConnectionRequests = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center gap-2 p-2 border-1 hover:border-white rounded-lg font-semibold transition-all ease-in-out cursor-pointer">
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
