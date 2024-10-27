import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFound: FC = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go back to Dashboard</Link>
    </div>
  );
};

export default NotFound;
