import { Slide, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './catalog.module.css';

const toastProps = {
  position: 'top-right' as ToastPosition,
  bodyClassName: styles.toastBody,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Slide,
};
export default toastProps;
