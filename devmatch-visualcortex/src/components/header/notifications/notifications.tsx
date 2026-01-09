import { useEffect } from "react";
import { NOTIFICATION_TYPES } from "@/config/constants";
import { NotificationItemType } from "@/types/types";
import { getNotifications } from "@/lib/actions/actions";
import { useDevMatchAppStore } from "@/store/store";
import { useToast } from "@/components/toast/toast";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";
import NotificationsDropdownHeading from "@/components/header/notifications/notificationsHeading";
import NotificationsDropdownItem from "@/components/header/notifications/notificationsItem";

const NotificationsDropdownItems = () => {
  const connectionNotifications = useDevMatchAppStore(
    (state) => state.connectionNotifications
  );
  const setConnectionNotifications = useDevMatchAppStore(
    (state) => state.setConnectionNotifications
  );
  const chatNotifications = useDevMatchAppStore(
    (state) => state.chatNotifications
  );
  const setChatNotifications = useDevMatchAppStore(
    (state) => state.setChatNotifications
  );

  const { showToast } = useToast();

  useEffect(() => {
    const getNotificationsData = async () => {
      const notificationsResult = await getNotifications();

      if (notificationsResult) {
        setConnectionNotifications(
          notificationsResult.filter(
            (n: NotificationItemType) => n?.type === "connection"
          )
        );

        setChatNotifications(
          notificationsResult.filter(
            (n: NotificationItemType) => n?.type === "chat"
          )
        );
      } else {
        showToast({
          title: "Fetch Notifications failed!",
          message: "Unable to fetch notifications.",
          variant: "error",
        });
      }
    };

    getNotificationsData();
  }, []);

  return (
    <div className="flex flex-col gap-1 min-w-92 max-h-[80vh]">
      <div className="[&::-webkit-scrollbar-track]:bg-transparent pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out">
        {Object.values(NOTIFICATION_TYPES).map((type) => (
          <div key={type}>
            {type === Object.values(NOTIFICATION_TYPES)[0] &&
              connectionNotifications &&
              connectionNotifications?.length > 0 && (
                <>
                  <NotificationsDropdownHeading type={type} />

                  {connectionNotifications.map((notification) => (
                    <NotificationsDropdownItem
                      key={notification?.id}
                      notification={notification}
                    />
                  ))}
                </>
              )}

            {type === Object.values(NOTIFICATION_TYPES)[1] &&
              chatNotifications &&
              chatNotifications?.length > 0 && (
                <>
                  <NotificationsDropdownHeading type={type} />

                  {chatNotifications.map((notification) => (
                    <NotificationsDropdownItem
                      key={notification?.id}
                      notification={notification}
                    />
                  ))}
                </>
              )}
          </div>
        ))}
      </div>
      <HorizontalSeparator />
      <div className="hover:bg-glass-surface-heavy m-1 p-1 px-4 rounded-lg text-sm cursor-pointer">
        Clear
      </div>
    </div>
  );
};

export default NotificationsDropdownItems;
