import { Link } from "react-router-dom";
import AccountNavigation from "../AccountNavigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../LoginContex";
import { useContext } from "react";

export default function MyCourses() {

    const [courses,setCourses] = useState([])

    const {user,setUser, ready} = useContext(LoginContext)
    

    useEffect(() => {
        const id = user._id
        axios.get(`/MyCourses/${id}`).then(({data}) =>{
            let convertedData = data

          for (let x=0;x<convertedData.length;x++){

          let startDate = "2023-04-24"

         if(convertedData[x].startDate){
            startDate = (convertedData[x].startDate).substring(0, 10)
          }

          let endDate = "2023-04-24"
          
          if(convertedData[x].startDate){
            endDate = (convertedData[x].endDate).substring(0, 10)
          }

          convertedData[x].startDate = startDate
          convertedData[x].endDate = endDate

        }
          setCourses(convertedData)
        })
    },[])

    return(
        <div>
            <AccountNavigation/>
            <div className="mt-4 xl:mx-20">
                {courses.length > 0 && courses.map(course => (
                    <Link to={"/course/" + course._id} className="m-5 flex bg-gray-100 p-4 rounded-xl gap-4 cursor-pointer">
                        <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                            {course.photos.length > 0 && (
                                <img className="object-cover" src={"http://localhost:4000/"+course.photos[0]} alt="zdjęcie"/>
                            )}
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{course.title}</h2>
                            <p className="text-md mt-2">{course.shortDescription}</p>
                            <p className="text-lg mt-2">{course.startDate} - {course.endDate}</p>
                        </div>
                    </Link>
                )) }
            </div>
        </div>

    )
}