import React, { Children, createContext, useContext, useState } from 'react'
export const UserContext =createContext()
function UserContextProvider({children}) {
  const initialUser=localStorage.getItem("Users");
  const [user,setUser]=useState(
    initialUser? JSON.parse(initialUser):undefined
  )
  return (
    <UserContext.Provider value={[user,setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

export const useAuth=()=>useContext(UserContext)