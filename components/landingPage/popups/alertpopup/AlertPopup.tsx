import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

// Can add more configuration if needed, real basic right now
// Toast options
export const alertNotification = (message) => {
  toast.warn(message, { 
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    // autoClose: false,
  });
  // toast.success
  // toast.info
  // toast.warn
  // toast.error
}
