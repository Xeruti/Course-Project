import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function IndexPage() {

    const [courses,setCourses] = useState([])

    useEffect(() => {   

        axios.get('/courses').then(({data}) => {


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

        <div className=" container m-auto mt-10 grid grid-cols-1">
          
          {courses.length > 0 && courses.map(course => (  
    
              <Link to={'/course/'+course._id}>
                    <div className="m-5 flex rounded-xl gap-4 cursor-pointer border-2">
                        <div className="flex w-64 h-64 shrink-0 ">
                            {course.photos.length > 0 && (
                                <img className="object-cover rounded-xl" src={"http://localhost:4000/"+course.photos[0]} alt="zdjęcie"/>
                            )}
                        </div>
                        <div className="my-6 mx-3 grid grid-cols-4 w-full">
                        <div className="col-span-3 grow-0 shrink">
                            <h2 className="text-3xl">{course.title}</h2>
                            <p className="mt-3 text-lg">{course.days} dni</p>
                            <p className="flex gap-2 my-2 mt-3 text-lg">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4H5C3.89543 4 3 4.89543 3 6V9M8 4H16M8 4V2M8 4V6M16 4H19C20.1046 4 21 4.89543 21 6V9H3M16 4V2M16 4V6M3 9V20C3 21.1046 3.89543 22 5 22H10M17 15.25V17L18.25 18.25M22 17C22 19.7614 19.7614 22 17 22C14.2386 22 12 19.7614 12 17C12 14.2386 14.2386 12 17 12C19.7614 12 22 14.2386 22 17Z" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                              {course.startDate} - {course.endDate}
                            </p>
                            <p className="text-md mt-4 hidden xl:flex">{course.shortDescription}</p>
                        </div>

                        <div className="col-span-1 grow-0 shrink text-center">
                            <p className="text-3xl text-primary pt-20">od {course.price} zł</p>
                        </div>
                        </div>
                    </div>
              </Link>
                )) }
        </div>

    )
}