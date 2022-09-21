import { createContext, useContext, useEffect, useState } from "react";

// Initialiserer auth context
// createContext leverer et objekt
const AuthContext = createContext();

// Definerer Contekst Provider, som kan levere data
// med props.children som tilstandsværdi.{children} betyder props.children
const AuthProvider = ({ children }) => {
  const [loginData, setLoginData] = useState("");

  // Opdater loginData med data fra sessionstorage hvis det findes
  //kigger på, om der er noget i storage
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoginData(JSON.parse(sessionStorage.getItem("token")));
    }
  }, [children]);

  // Returner provider
  // Alle childs af denne får adgang til logindata
  return (
    <AuthContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Definerer context hook
// Gør at vi nemt kan kalde context
// f eks: const { loginData } = useAuth()
const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
