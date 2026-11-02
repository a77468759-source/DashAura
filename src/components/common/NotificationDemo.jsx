import { useState } from "react";
import { Bell } from "lucide-react";

function NotificationDemo() {

  const [notifications, setNotifications] = useState(0);

  function handleNotification() {
    setNotifications(previous => previous + 1);
  }

  function handleReset() {
  setNotifications(0);
   }

  return (
    <section aria-labelledby="notification-heading">

      <h2 id="notification-heading">
        Notification Demo
      </h2>

      <p>
        Notifications: {notifications}
      </p>

      <button
        type="button"
        onClick={handleNotification}
        aria-label={`Add notification. Current count: ${notifications}`}
      >
        <Bell aria-hidden="true" />
        Add notification
      </button>

      <button type="button" onClick={handleReset}>
          Reset
      </button>

    </section>
  );
}

export default NotificationDemo;