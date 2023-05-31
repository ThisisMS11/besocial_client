import { createContext, useContext, ReactNode, useState } from 'react'


interface AuthContextValue {
    loading: Boolean
    setLoading: (loaderState: Boolean) => void;
}


const UtilContext = createContext<AuthContextValue | undefined>(undefined);

export const UtilsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    /* Spinner Utils */
    const [loading, setLoading] = useState<Boolean>(false);

    let value = {
        loading, setLoading
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