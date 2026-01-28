import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaRegFaceSadTear } from "react-icons/fa6";
import {
  authFormFieldButtonItems,
  profileDetailsFormFieldButtonItems,
} from "@/config/config";
import { getUrlString } from "@/lib/utils/utils";
import { authRoutes } from "@/lib/routes/routes";
import { apiUrls } from "@/lib/api/apiUtils";
import { apiRequest } from "@/lib/api/api";
import { setCookies } from "@/lib/api/cookiesHandler";
import { ProfileDetailsProps } from "@/types/propTypes";
import { useToast } from "@/hooks/toast";
import { useDevMatchAppStore } from "@/store/store";
import ButtonDestructive from "@/components/ui/buttons/buttonDestructive";
import ButtonNormal from "@/components/ui/buttons/buttonNormal";

const DeleteAccountContext = ({ user, onClose }: ProfileDetailsProps) => {
  if (!user) return null;

  const [isPending, setIsPending] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const setLoggedInUser = useDevMatchAppStore((state) => state.setLoggedInUser);

  const { showToast } = useToast();

  const handleDeleteAccount = async () => {
    setIsPending(true);

    const result = await apiRequest({
      method: "delete",
      url: apiUrls.deleteAccount,
      requiresAuth: true,
    });

    if (result?.success) {
      showToast({
        title: "Delete Successful!",
        message: "Account deleted successfully!",
        variant: "success",
      });

      const cookieName = "flash";

      const cookieValue = JSON.stringify({
        type: "success",
        title: "Delete Successful!",
        message: "Account deleted successfully!",
        authenticated: true,
      });

      const cookieOptions = {
        maxAge: 1,
        path: "/",
      };

      const flashCookie = [
        `${cookieName}=${cookieValue}`,
        cookieOptions.maxAge ? `Max-Age=${cookieOptions.maxAge}` : "",
        cookieOptions.path ? `Path=${cookieOptions.path}` : "",
      ]
        .filter(Boolean)
        .join("; ");

      setCookies([flashCookie]);

      setIsPending(false);

      router.push(getUrlString(authRoutes.login));
    } else {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (pathname.includes(authRoutes.login)) {
      setLoggedInUser(null);
    }
  }, [pathname]);

  return (
    <div className="flex flex-col gap-2 w-[44vw] h-full">
      <h2 className="font-semibold text-xl">Delete Account</h2>
      <div className="flex flex-col justify-center items-center gap-4 pb-4">
        <div className="flex justify-center items-center gap-4 p-2 text-2xl">
          <span>We're sorry to see you go... </span>
          <span>
            <FaRegFaceSadTear />
          </span>
        </div>
        <p>Are you sure you want to delete your account?</p>
      </div>
      <div className="flex justify-center items-center gap-4 m-4">
        <ButtonDestructive
          icon={
            isPending ? (
              <svg
                className="w-4 h-4 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              authFormFieldButtonItems?.deleteAccount?.icon
            )
          }
          text={
            isPending
              ? "Updating..."
              : authFormFieldButtonItems?.deleteAccount?.label
          }
          disabled={isPending}
          className={`h-10 ${isPending ? "w-56" : "w-48"}`}
          onClick={() => handleDeleteAccount()}
        />

        <ButtonNormal
          icon={profileDetailsFormFieldButtonItems?.discard?.icon}
          text={profileDetailsFormFieldButtonItems?.discard?.label}
          className="w-40 h-10"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default DeleteAccountContext;
