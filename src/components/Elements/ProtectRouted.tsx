import { Navigate } from 'react-router-dom';
import { getUserRole } from '../../utils/auth.utils';

interface ProtectedRouteProps {
  children: JSX.Element;
  role?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const token = getUserRole();

  if (!token) {
    return <Navigate to='/' />;
  }

  if (role && role !== token.role) {
    const redirectPath =
      token.role === 'admin' ? '/beranda' : '/user-dashboard';
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default ProtectedRoute;
