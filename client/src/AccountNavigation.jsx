import { Link, useLocation, useParams } from "react-router-dom"
import { LoginContext } from "./LoginContex"
import { useContext } from "react"


export default function AccountNavigation(){

    const {user,setUser, ready} = useContext(LoginContext)

    const id = user._id

    const {pathname} = useLocation()
    let subpage = pathname.split('/')?.[2]
    if(subpage === undefined){
        subpage = 'profile'
    }
    
    function linkClasses (type=null){
        let classes =  'inline-flex gap-2 py-2 px-6 rounded-full'

        if(type === subpage ){
            classes += ' bg-primary text-white'
        }

        else{
            classes += ' bg-gray-300'
        }

        return classes
    }

    return(
        <nav className="w-full flex justify-center mt-8 gap-2" >
                <Link className={linkClasses('profile')} to={'/account'}>
                    My profile
                </Link>

                <Link className={linkClasses('myCourses')} to={`/account/myCourses/${id}`}>
                 My courses
                </Link>

                {user.role === 'admin' && (

                <Link className={linkClasses('courses')} to={'/account/courses'}>
                    Edit Courses
                </Link>
                )}
            </nav>
    )
}