import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [isAuthenticatedState, setIsAuthenticatedState] = useState(Boolean(sessionStorage.getItem("access_token")))

    const login = (access_token) => {
        sessionStorage.getItem("access_token", access_token)
        setIsAuthenticatedState(true)
    }

    useEffect(() => {
        const auth_token = sessionStorage.getItem("access_token")
        if(auth_token){
            setIsAuthenticatedState(true)
        }
    }) 
    return (
        <AuthContext.Provider value={{isAuthenticatedState, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider