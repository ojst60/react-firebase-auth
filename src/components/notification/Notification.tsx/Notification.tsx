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
      className={`h-14 w-[26rem] border flex flex-row rounded-md items-center p-2 ${containerClasses} animate-slideIn`}
    >
      <div
        className={`flex items-center justify-center h-10 w-10 rounded-full ${iconContainerClasses}`}
      >
        <Icon className={`h-6 w-6 ${iconClasses}`} />
      </div>

      <p className="flex-1 text-center font-serif">{message}</p>
      {removeNotification && (
        <button
          className="focus:border-none flex items-center justify-center bg-inherit hover:border-none hover:outline-none"
          onClick={() => removeNotification(id)}
        >
          <CloseIcon className="h-4 w-4 fill-gray-500 hover:fill-gray-700" />
        </button>
      )}
    </div>
  );
}
