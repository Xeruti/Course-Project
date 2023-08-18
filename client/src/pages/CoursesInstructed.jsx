import { Link } from "react-router-dom";
import AccountNavigation from "../AccountNavigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CoursesInstructed() {

    const [courses,setCourses] = useState([])

    useEffect(() => {
        axios.get('/courses').then(({data}) => {
            setCourses(data)
        })
    },[])

    return(
        <div>
            <AccountNavigation/>
            <div className="text-center p-3">
                <br/>
                <Link className="inline-flex gap-2 bg-primary text-white py-2 px-6 rounded-full" to={'/account/courses/new'}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4V20M4 12H20" stroke="rgba(255,255,255,1)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                    </svg>
                    Add new course</Link>
            </div>

            <div className="mt-4 xl:mx-20">
                {courses.length > 0 && courses.map(course => (
                    <Link to={"/account/courses/" + course._id} className="m-5 flex bg-gray-100 p-4 rounded-xl gap-4 cursor-pointer">
                        <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                            {course.photos.length > 0 && (
                                <img className="object-cover" src={"http://localhost:4000/"+course.photos[0]} alt="zdjęcie"/>
                            )}
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{course.title}</h2>
                            <p className="text-md mt-2">{course.shortDescription}</p>
                        </div>
                    </Link>
                )) }
            </div>
        </div>

    )
}