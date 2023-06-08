import { ReactNode } from 'react';
import { Navigate, useLocation } from "react-router-dom";

export const AuthRequireLogin: React.FC<{ children: ReactNode }> = ({ children }) => {

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