import { useEffect } from "react";
import { FALLBACK_MESSAGES, NOTIFICATION_TYPES } from "@/config/constants";
import { NotificationActionType, NotificationItemType } from "@/types/types";
import { getNotifications, markNotificationRead } from "@/lib/actions/actions";
import { useDevMatchAppStore } from "@/store/store";
import useSheet from "@/hooks/useSheet";
import { useToast } from "@/components/toast/toast";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";
import NotificationsHeading from "@/components/header/notifications/notificationsHeading";
import NotificationsItem from "@/components/header/notifications/notificationsItem";
import { navbarMenuItems } from "@/config/config";

const Notifications = () => {
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
  const connectionsSheet = useSheet({ type: navbarMenuItems[1].type });

  const notificationAction = async ({
    type,
    id,
    removeNotificationFlag = false,
  }: NotificationActionType) => {
    if (type) {
      const markNotificationReadData = await markNotificationRead({ type });

      const newConnectionNotifications = markNotificationReadData?.filter(
        (n) => n?.type !== NOTIFICATION_TYPES.connection
      );

      setConnectionNotifications(newConnectionNotifications);

      const newChatNotifications = markNotificationReadData?.filter(
        (n) => n?.type !== NOTIFICATION_TYPES.chat
      );

      setChatNotifications(newChatNotifications);

      return;
    }

    if (id && removeNotificationFlag) {
      const markNotificationReadData = await markNotificationRead({ id });

      const newNotification = {
        id: markNotificationReadData?.id,
        from: markNotificationReadData?.from,
        status: markNotificationReadData?.status,
        title: markNotificationReadData?.title,
        body: markNotificationReadData?.body,
        type: markNotificationReadData?.type,
      };

      if (markNotificationReadData?.type === NOTIFICATION_TYPES.connection) {
        const remaining = connectionNotifications.filter((n) => n.id !== id);

        setConnectionNotifications([newNotification, ...remaining]);
      }

      if (markNotificationReadData?.type === NOTIFICATION_TYPES.chat) {
        const remaining = chatNotifications.filter((n) => n.id !== id);

        setChatNotifications([newNotification, ...remaining]);
      }

      return;
    }

    if (id) {
      if (document) {
        document?.getElementById?.("notifications-dropdown")?.hidePopover();
      }

      connectionsSheet.open();

      const markNotificationReadData = await markNotificationRead({ id });

      const newNotification = {
        id: markNotificationReadData?.id,
        from: markNotificationReadData?.from,
        status: markNotificationReadData?.status,
        title: markNotificationReadData?.title,
        body: markNotificationReadData?.body,
        type: markNotificationReadData?.type,
      };

      if (markNotificationReadData?.type === NOTIFICATION_TYPES.connection) {
        const remaining = connectionNotifications.filter((n) => n.id !== id);

        setConnectionNotifications([newNotification, ...remaining]);
      }

      if (markNotificationReadData?.type === NOTIFICATION_TYPES.chat) {
        const remaining = chatNotifications.filter((n) => n.id !== id);

        setChatNotifications([newNotification, ...remaining]);
      }

      return;
    }

    const markNotificationReadData = await markNotificationRead({});

    const newConnectionNotifications = markNotificationReadData?.filter(
      (n) => n?.type !== NOTIFICATION_TYPES.connection
    );

    setConnectionNotifications(newConnectionNotifications);

    const newChatNotifications = markNotificationReadData?.filter(
      (n) => n?.type !== NOTIFICATION_TYPES.chat
    );

    setChatNotifications(newChatNotifications);
  };

  useEffect(() => {
    const getNotificationsData = async () => {
      const notificationsResult = await getNotifications();

      if (notificationsResult) {
        setConnectionNotifications(
          notificationsResult.filter(
            (n: NotificationItemType) =>
              n?.type === Object.values(NOTIFICATION_TYPES)[0]
          )
        );

        setChatNotifications(
          notificationsResult.filter(
            (n: NotificationItemType) =>
              n?.type === Object.values(NOTIFICATION_TYPES)[1]
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

  useEffect(() => {
    console.log("debug connectionNotifications : ", connectionNotifications);
  }, [connectionNotifications]);

  return (
    <div className="flex flex-col gap-1 min-w-84 max-h-[80vh]">
      <div className="[&::-webkit-scrollbar-thumb]:hover:bg-glass-surface-lighter [&::-webkit-scrollbar-track]:bg-transparent pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary transition-all ease-in-out">
        {Object.values(NOTIFICATION_TYPES).map((type) => (
          <div key={type}>
            {type === Object.values(NOTIFICATION_TYPES)[0] &&
              connectionNotifications &&
              connectionNotifications?.length > 0 && (
                <>
                  <NotificationsHeading
                    type={type}
                    notificationAction={notificationAction}
                  />

                  {connectionNotifications?.map((notification) => (
                    <NotificationsItem
                      key={notification?.id}
                      notification={notification}
                      notificationAction={notificationAction}
                    />
                  ))}
                </>
              )}

            {type === Object.values(NOTIFICATION_TYPES)[1] &&
              chatNotifications &&
              chatNotifications?.length > 0 && (
                <>
                  <NotificationsHeading
                    type={type}
                    notificationAction={notificationAction}
                  />

                  {chatNotifications?.map((notification) => (
                    <NotificationsItem
                      key={notification?.id}
                      notification={notification}
                      notificationAction={notificationAction}
                    />
                  ))}
                </>
              )}
          </div>
        ))}
      </div>

      {connectionNotifications?.length > 0 || chatNotifications?.length > 0 ? (
        <>
          <HorizontalSeparator />
          <button
            className="hover:bg-glass-surface-heavy m-1 p-1 px-4 rounded-lg text-sm cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();

              notificationAction({});
            }}
          >
            Clear
          </button>
        </>
      ) : (
        <div className="text-glass-text-secondary">
          {FALLBACK_MESSAGES.noNotifications}
        </div>
      )}
    </div>
  );
};

export default Notifications;
