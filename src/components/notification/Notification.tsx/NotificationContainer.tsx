import Notification from "./Notification";

export interface Notification {
  id: number;
  message: string;
  type: "success" | "error";
  removeNotification?: (id: number) => void
}

interface Props {
  notifications: Notification[];
}

export default function NotificationContainer({
  notifications,
}: Props): JSX.Element {
  return (
    <div className="fixed top-3 right-2 flex flex-col gap-{10px}">
      {notifications.map((notification) => (
        <Notification
        key={notification.id}
          type={notification.type}
          message={notification.message}
          id={notification.id}
          removeNotification={notification.removeNotification}
        />
      ))}
    </div>
  );
}