import { createContext,useContext,useState,useEffect } from "react";
import { Getcurrentuser } from "../Appwrite/Appwrite";

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({children})=>{

    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [user,setUser] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
        
    useEffect(()=>{
        Getcurrentuser().then((res)=>{
            if(res){
                setIsLoggedIn(true)
                setUser(res)
            }
            else{
                setIsLoggedIn(false)
                setUser(null)
            }
        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[])

    const updateUser = (newData) => {
        setUser(prevUser => ({
            ...prevUser, 
            ...newData 
        }));
    };

    const modifyUser=(newName,image_url)=>{
       setUser(user=>({
         ...user,
         name:newName,
         profile_image:image_url
       }))
    }

   return (
    <GlobalContext.Provider 
     value={{
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        updateUser,
        setUser,
        modifyUser
    }}>
           {children}
    </GlobalContext.Provider>
   )
}

export default GlobalProvider;