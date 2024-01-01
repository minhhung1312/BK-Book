import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [showHoverPanel, setShowHoverPanel] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [user, setUser] = useState(null);
  const [queryParams, setQueryParams] = useSearchParams({ search: "" });
  const apiUrl = import.meta.env.VITE_API_URL;
  const chosenCartItemsRaw = localStorage.getItem("checkoutItems")
  const chosenCartItems = chosenCartItemsRaw ? JSON.parse(chosenCartItemsRaw).data : []

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(apiUrl + "/utils/get_user.php");
        if (res.data) setUser(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        showHoverPanel,
        setShowHoverPanel,
        user,
        apiUrl,
        chosenCartItems,
        showUserPanel,
        setShowUserPanel,
        queryParams,
        setQueryParams,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
