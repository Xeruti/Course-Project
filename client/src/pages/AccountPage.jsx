import { useContext, useState } from "react"
import { LoginContext } from "../LoginContex"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import CoursesInstructed from "./CoursesInstructed"
import AccountNavigation from "../AccountNavigation"
import MyCourses from "./MyCourses"

export default function AccountPage(){

    const {user,setUser, ready} = useContext(LoginContext)
    const [redirect,setRedirect] = useState(null)

    let {subpage} = useParams()

    if (subpage === undefined){
        subpage = 'profile'
    }

    if(!ready){
        return 'Loading...'
    }

    if(ready && !user && !redirect){
        return <Navigate to={'/login'} />
    }

    async function logout(){
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return(
        <div>
            <AccountNavigation/>
            
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Zalogowano jako {user.name} ({user.email})
                    <button onClick={logout} className="primary max-w-sm mt-2">Wyloguj się</button>
                </div>
            )}

            {subpage === 'courses' && (
                <CoursesInstructed />
            )}

            {subpage === 'myCourses' && (
                <MyCourses />
            )}

        </div>
    )
}