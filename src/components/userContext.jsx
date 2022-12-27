import { createContext, useState } from "react";


let UserContext = createContext()

export const UserProvider =({children})=>{
//create an hook from the context and send it to nav component
  const [cart,setCart] =useState([])

return(

    <UserContext.Provider value={{cart,setCart}}>
        {children}
    </UserContext.Provider>

)
}



export default UserContext;