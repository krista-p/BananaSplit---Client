import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const alertNotification = (message) => {
  toast.warn(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
};
