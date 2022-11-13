import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

//This file exists to reduce and simplify imports for user info
export const useUser = () => {
    const [userContext, setUserContext] = useContext(UserContext)

    return { user: userContext?.user, userContext, setUserContext, logout: ()=>setUserContext(null) }
}