import { useEffect, useState } from "react";
import axios from "axios";

export default function ContactPage() {

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
        <div className="container m-auto text-center mt-10 grid grid-cols-1">
          <div>
            <p className="text-lg mt-2">Skontaktuj się z nami:</p>  
            <p className="text-lg mt-2">Telefon: 987 654 321</p>
            <p className="text-lg mt-2">Email: courses@gmail.com</p>
            <p className="text-lg mt-2">Siedziba: Niska 57 Kraków</p>      
          </div>
        </div>

    )
}