import { createContext, ReactNode, useContext, useState } from "react";
import NotificationContainer, {
  Notification,
} from "../../components/notification/Notification.tsx/NotificationContainer";
import { createPortal } from "react-dom";

interface AddNotification {
  message: string;
  /** Default time is 6 seconds */
  timeout?: number;
  type: "success" | "error";
  showCloseButton?: boolean;
}

interface INotificationContext {
  addNotification: (notification: AddNotification) => void;
}

const NotificationContext = createContext<INotificationContext | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = ({
    message,
    timeout = 2000,
    type,
    showCloseButton,
  }: AddNotification) => {
    const id = Date.now();

    const newNotification: Notification = {
      id,
      message,
      type,
      removeNotification: showCloseButton
        ? () => removeNotification(id)
        : undefined,
    };

    setNotifications((prev) => [...prev, newNotification]);

    if (!showCloseButton) {
      setTimeout(() => {
        removeNotification(id);
      }, timeout);
    }
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      {notifications.length > 0 &&
        createPortal(
          <NotificationContainer notifications={notifications} />,
          document.body
        )}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
