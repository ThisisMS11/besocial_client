import { createContext, useContext, ReactNode } from 'react'
import { toast } from 'react-toastify';


interface AuthContextValue {
    successnotify: (message: string) => void;
    errornotify: (message: string) => void;
    warnnotify: (message: string) => void;
}


const toastContext = createContext<AuthContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


    const successnotify = (message: string) => toast.success(message);
    const errornotify = (message: string) => toast.error(message);
    const warnnotify = (message: string) => toast.warn(message);

    let value = {
        successnotify, errornotify, warnnotify
    }

    return (
        <toastContext.Provider value={value}>
            {children}
        </toastContext.Provider>
    );
}



export const useToast = () => {
    return useContext(toastContext);
}