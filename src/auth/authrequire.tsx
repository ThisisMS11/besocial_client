import { ReactNode } from 'react';
import { useAuth } from './auth'
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const AuthRequireLogin: React.FC<{ children: ReactNode }> = ({ children }) => {

    let { user } = useAuth();
    const location = useLocation();

    // if (!user) {
    //     return <Navigate to="/login" state={{ path: location.pathname }} />
    // }
    const token: string = localStorage.getItem('token') as string;

    if (!token) {
        return <Navigate to="/login" state={{ path: location.pathname }} />
    }

    return <>{children}</>;

}