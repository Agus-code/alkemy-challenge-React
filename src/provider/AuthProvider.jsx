import React from "react";
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {

    const [isLogged, setIsLogged] = React.useState(false);

    const getToken = () => {
        const token = localStorage.getItem("token");
        if (!token) return setIsLogged(false);
        if (token.length === 0) return setIsLogged(false);
        return setIsLogged(true);
    }

    React.useEffect(() => {
        getToken();
    })

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export { AuthProvider };