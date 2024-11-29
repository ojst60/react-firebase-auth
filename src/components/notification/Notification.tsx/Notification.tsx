import { CloseIcon, ErrorIcon, SuccessIcon } from "../../../assets/images";
import { Notification as NotificationType } from "./NotificationContainer";

export default function Notification({
  type,
  message,
  id,
  removeNotification,
}: NotificationType): JSX.Element {
  const isSuccess = type === "success";

  // Dynamic styles based on the notification type
  const containerClasses = isSuccess
    ? "border-green-300 bg-green-100"
    : "border-red-300 bg-red-100";
  const iconContainerClasses = isSuccess ? "bg-green-200" : "bg-red-200";
  const iconClasses = isSuccess ? "fill-green-800" : "fill-red-800";

  const Icon = isSuccess ? SuccessIcon : ErrorIcon;

  return (
    <div
      className={`flex items-center gap-4 rounded-lg border p-4 shadow-md ${containerClasses} animate-slideIn`}
      style={{ width: "300px" }}
    >
      <div
        className={`flex items-center justify-center h-10 w-10 rounded-full ${iconContainerClasses}`}
      >
        <Icon className={`h-6 w-6 ${iconClasses}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-700 md:text-base">{message}</p>
      </div>
      {removeNotification && (
        <button
          className="focus:outline-none flex items-center justify-center bg-inherit hover:scale-110"
          onClick={() => removeNotification(id)}
        >
          <CloseIcon className="h-5 w-5 fill-gray-500 hover:fill-gray-700" />
        </button>
      )}
    </div>
  );
}
