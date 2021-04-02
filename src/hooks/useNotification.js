import { NotificationManager } from 'react-notifications';

export const useNotification = () => {
  const addErrorNotification = (message, title = '', timeOut = 2000) => {
    NotificationManager.error(message, title, timeOut);
  };

  const addSuccessNotification = (message, title = '', timeOut = 2000) => {
    NotificationManager.success(message, title, timeOut);
  };

  const addWarningNotification = (message, title = '', timeOut = 2000) => {
    NotificationManager.warning(message, title, timeOut);
  };

  const addInfoNotification = (message, title = '', timeOut = 2000) => {
    NotificationManager.addInfoNotification(message, title, timeOut);
  };

  return {
    addErrorNotification,
    addSuccessNotification,
    addWarningNotification,
    addInfoNotification,
  };
};
