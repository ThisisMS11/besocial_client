import { useContext, createContext, useState, ReactNode } from "react";

/* User Interface */
interface User {
    userid: String,
    name: String | null,
    loggedIn: Boolean,
    profilePicUrl: String
}

interface AuthContextValue {
    user: User | null;
    setUser: (user: User | null) => void;
}

const authContext = createContext<AuthContextValue | undefined>(undefined);

/*React.FC is a generic type provided by React that stands for "Function Component." It indicates that the component is a functional component that accepts props.
<{ children: ReactNode }> specifies the prop types for the component. In this case, it indicates that the component accepts a single prop called children, which should be of type ReactNode.
*/

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const value: AuthContextValue = {
        user,
        setUser
    };

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
}

export const useAuth = (): AuthContextValue => {

    const context = useContext(authContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}