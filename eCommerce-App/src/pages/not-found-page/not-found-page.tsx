import { Link } from 'react-router-dom';
import Button from '../../utils/button/button';
//import styles from './not-found.module.css';

function NotFoundPage() {
  return (
    <div>
      <Link to="/main">
        <Button btnType="button">To main page</Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
