import { AlertColor } from '@mui/material';
import { createContext, useContext, ReactNode, useState } from 'react'
import { toast } from 'react-toastify';


interface AuthContextValue {
    loading: boolean
    setLoading: (loaderState: boolean) => void;
    alertState: boolean
    setAlertState: (loaderState: boolean) => void;
    alertmessage: string | null
    setAlertmessage: (message: string) => void;
    severity: AlertColor | undefined
    setSeverity: (message: AlertColor | undefined) => void;

    successnotify: (message: string) => void;
    errornotify: (message: string) => void;
    warnnotify: (message: string) => void;
}


const UtilContext = createContext<AuthContextValue | undefined>(undefined);

export const UtilsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    /* Spinner Utils */
    const [loading, setLoading] = useState<boolean>(false);

    /* Alert Utils */
    const [alertState, setAlertState] = useState<boolean>(false);
    const [alertmessage, setAlertmessage] = useState<string | null>(null);
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

    /* toast-notifications */
    const successnotify = (message: string) => toast.success(message);
    const errornotify = (message: string) => toast.error(message);
    const warnnotify = (message: string) => toast.warn(message);


    let value = {
        loading, setLoading,
        alertState, setAlertState,
        alertmessage, setAlertmessage,
        severity, setSeverity,
        successnotify, errornotify, warnnotify
    }

    return (
        <UtilContext.Provider value={value}>
            {children}
        </UtilContext.Provider>
    );
}



export const useUtils = () => {
    return useContext(UtilContext);
}