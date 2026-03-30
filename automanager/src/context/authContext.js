import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('Ação impossível de se realizar')

    return context
}

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}