"use client";

import Image from "next/image";
import { MdBlock, MdCancel, MdCheck } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { CONNECTION_STATUS_PROPERTIES } from "@/config/constants";
import { cameraDropDownItems, staticImages } from "@/config/config";
import { UserType } from "@/types/types";
import { ProfileComponentProps } from "@/types/propTypes";
import { getFullName, toTitleCase } from "@/lib/utils/utils";
import { updateConnectionStatus } from "@/lib/actions/actions";
import { useDevMatchAppStore } from "@/store/store";
import { useToast } from "@/hooks/toast";
import NameCardContent from "@/components/explore/nameCardContent";
import ProfileCoverEditButton from "@/components/ui/buttons/profileCoverEditButton";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";
import Dropdown from "@/components/ui/dropdown/dropdown";
import ButtonSuccess from "@/components/ui/buttons/buttonSuccess";
import ButtonWarning from "@/components/ui/buttons/buttonWarning";
import ButtonDestructive from "@/components/ui/buttons/buttonDestructive";

const ProfileCover = ({ user }: ProfileComponentProps) => {
  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);
  const allUsers = useDevMatchAppStore((state) => state.allUsers);
  const userCards = useDevMatchAppStore((state) => state.userCards);
  const setUserCards = useDevMatchAppStore((state) => state.setUserCards);
  const userCardsNextIndex = useDevMatchAppStore(
    (state) => state.userCardsNextIndex,
  );
  const setUserCardsNextIndex = useDevMatchAppStore(
    (state) => state.setUserCardsNextIndex,
  );
  const requests = useDevMatchAppStore((state) => state.requests);
  const setRequests = useDevMatchAppStore((state) => state.setRequests);
  const connections = useDevMatchAppStore((state) => state.connections);
  const setConnections = useDevMatchAppStore((state) => state.setConnections);

  const { showToast } = useToast();

  const sender = requests.find((r) => r?.sender?.id === user?.id)?.sender;
  const senderData = {
    successButtonIcon: <MdCheck />,
    successButtonText: "accept",
    onAccept: () =>
      onRemove(sender?.id as string, CONNECTION_STATUS_PROPERTIES.accepted),
    onReject: () =>
      onRemove(sender?.id as string, CONNECTION_STATUS_PROPERTIES.rejected),
    onBlock: () =>
      onRemove(sender?.id as string, CONNECTION_STATUS_PROPERTIES.blocked),
  };

  const connectedUser = connections.find(
    (c) => c?.otherUser?.id === user?.id,
  )?.otherUser;
  const connectedUserData = {
    successButtonIcon: <IoIosChatboxes />,
    successButtonText: "chat",
    onAccept: () => console.log("Chat window will open..."),
    onReject: () =>
      onRemove(
        connectedUser?.id as string,
        CONNECTION_STATUS_PROPERTIES.rejected,
      ),
    onBlock: () =>
      onRemove(
        connectedUser?.id as string,
        CONNECTION_STATUS_PROPERTIES.blocked,
      ),
  };

  const handleConnectionAction = async (status: string, id: string) => {
    const prevConnections = connections;
    const prevRequests = requests;
    const prevCards = userCards;

    const updatedConnections = await updateConnectionStatus(status, id);

    if (!updatedConnections?.status) {
      setConnections(prevConnections);
      setRequests(prevRequests);
      setUserCards(prevCards);

      showToast({
        title: "Connection update failed!",
        message: "Unable to update connection status.",
        variant: "error",
      });
    }
  };

  const onRemove = (userId: string, status: string) => {
    setUserCards((prev: UserType[]) => {
      const remaining = prev.filter((u: UserType) => u?.id !== userId);

      return userCardsNextIndex < allUsers.length
        ? [allUsers[userCardsNextIndex], ...remaining]
        : remaining;
    });

    setUserCardsNextIndex((i: number) => (i < allUsers.length ? i + 1 : i));

    if (status === CONNECTION_STATUS_PROPERTIES.accepted) {
      const request = requests.find((r) => r.sender?.id === userId);

      setConnections([
        ...connections,
        {
          connectionStatus: status,
          otherUser: request?.sender,
          otherUserId: request?.sender?.id,
          connectedSince: request?.receivedRequestOn,
        },
      ]);

      setRequests(requests.filter((r) => r?.sender?.id !== userId));
    } else if (
      status === CONNECTION_STATUS_PROPERTIES.rejected ||
      status === CONNECTION_STATUS_PROPERTIES.blocked
    ) {
      setConnections(connections.filter((c) => c?.otherUser?.id !== userId));

      setRequests(requests.filter((r) => r?.sender?.id !== userId));
    }

    handleConnectionAction(status, userId);
  };

  return (
    <div className="group relative flex justify-center items-center shadow-[0_0.3rem_1rem_rgba(0,0,0,0.2)] rounded-xl w-3/4 h-full overflow-hidden">
      <Image
        src={
          user?.coverPhotoUrl
            ? user?.coverPhotoUrl
            : staticImages.profilePlaceholder.src
        }
        alt={
          user?.userName
            ? `${user?.userName}'s cover`
            : staticImages.profilePlaceholder.alt
        }
        width={600}
        height={400}
        className="w-full h-full object-cover select-none"
        unoptimized
      />

      <div className="top-0 right-0 absolute">
        {loggedInUser?.id === user?.id && (
          <ProfileCoverEditButton popoverTarget="update-profile-cover-dropdown" />
        )}

        <Dropdown
          id="update-profile-cover-dropdown"
          className="right-[anchor(right)]"
        >
          <div>
            <p className="p-2 font-bold text-md">Update profile photo</p>
            <HorizontalSeparator />
            <div className="flex flex-col gap-1">
              {cameraDropDownItems.map((item) => (
                <p
                  key={item.type}
                  className="flex justify-between items-center hover:bg-glass-surface-heavy p-1 rounded-lg w-full min-w-48 transition-all ease-in-out cursor-pointer"
                >
                  <span>{item.icon}</span>
                  <span className="w-full">{item.label}</span>
                </p>
              ))}
            </div>
          </div>
        </Dropdown>
      </div>

      {(sender || connectedUser) && (
        <div className="top-3 left-3 absolute flex gap-2">
          <ButtonSuccess
            icon={
              sender
                ? senderData?.successButtonIcon
                : connectedUser
                  ? connectedUserData?.successButtonIcon
                  : null
            }
            text={
              sender
                ? senderData?.successButtonText
                : connectedUser
                  ? connectedUserData?.successButtonText
                  : null
            }
            className="w-24 text-sm"
            onClick={
              sender
                ? senderData.onAccept
                : connectedUser
                  ? connectedUserData.onAccept
                  : () => null
            }
          />
          <ButtonWarning
            icon={<MdCancel />}
            text="disconnect"
            className="w-32 text-sm"
            onClick={
              sender
                ? senderData.onReject
                : connectedUser
                  ? connectedUserData.onReject
                  : () => null
            }
          />
          <ButtonDestructive
            icon={<MdBlock />}
            text="block"
            className="w-24 text-sm"
            onClick={
              sender
                ? senderData.onBlock
                : connectedUser
                  ? connectedUserData.onBlock
                  : () => null
            }
          />
        </div>
      )}

      <NameCardContent
        name={toTitleCase(getFullName(user)) ?? "Rajesh Ranjan"}
      />
    </div>
  );
};

export default ProfileCover;
