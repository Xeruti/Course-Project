//npm install ... // yarn add ...

const express = require('express')

const app = express()   //inicjalizacja API przez expressa

const cors = require('cors') // cors posłuży do umożliwienia komunikacji między dwoma różnymi adresami

require('dotenv').config() // umożliwia korzystanie ze zmiennych środowiskowych env

const mongoose = require('mongoose') // mongoose pomaga we wszystkich sprawach dotyczących mongoDB i danych w kodzie

const jwt = require('jsonwebtoken') // json web token posłuży do weryfikacji użytkownika
const jwtSecret = 'randomString'    // "ukryty" string który będzie służył do weryfikacji tokenów jwt 

const bcrypt = require('bcryptjs')  //bcrypt posłuży do szyfrowania hasła
const secret = bcrypt.genSaltSync(12) //  ,Sync występuje dla async funkcji

const User = require('./models/User.js') //import modeli dla danych do Mongo DB
const Course = require('./models/Course.js')

const cookieParser = require('cookie-parser')   //cookie parser posłuży do odczytywania tokenów jwt

const multer = require('multer')    //multer do przesyłania plików - w naszym przypadku zdjęć
const fs = require('fs')            //filesystem do zarządzania plikami

app.use(express.json()) //umożliwia korzystanie z formatu json
app.use(cookieParser())
app.use('/uploads', express.static(__dirname+'/uploads'))   //ustawienie domyślnej ścieżki dla endpointu /uploads


app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'  //Lub localhost - czasami pc wykrywa jako 127.0.0.1 albo jako localhost, rzadko oba
}))

mongoose.connect(process.env.MONGO_URL) //łączymy się z bazą danych przy pomocy connection stringa


/*

    WSZYSTKIE ENDPOINTY W API

    USER:

    /register   POST
    /login      POST
    /profile    GET
    /logout     POST

    COURSES:

    /upload     POST
    /courses      POST GET PUT
    /courses/:id  GET
    /courses/delete/:id DELETE
    /enrolling    POST

*/




//typ żadania, endpoint,    request, response
app.post('/register', async (req,res) =>{

    //pobieramy dane pochodzące z requesta
    const {name,email,password} = req.body

    try{
        //tworzymy nowego usera przy pomocy modelu User z mongoose
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, secret),
            role: 'user'
        })
        res.json(user)
    }
    catch(e){
        res.status(422).json(e)
    }
})

app.post('/login', async (req,res) =>{
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user){
        const passMatch = bcrypt.compareSync(password, user.password)

        if(passMatch){
            //używamy metody .sign() od jsonwebtoken aby uzyskać token logowania dla użytkownika
            jwt.sign({email:user.email, id:user._id}, jwtSecret, {}, (error,token)=>{
                if(error){
                    throw error
                }
                res.cookie('token', token).json(user)
            })
        } else {
            res.status(422).json('Podano błędne hasło.')
        }
    } else {
        res.json('not found')
    }

})

app.get('/profile', (req,res) =>{
    const {token}  = req.cookies
    if (token){
        jwt.verify(token, jwtSecret, {}, async (error, userData)=>{
            if (error){
                throw error
            }
            const {name, email,_id} = await User.findById(userData.id)
            res.json( {name, email,_id} )
        })
    } else {
        res.json(null)
    }
})

app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true)
})


//wykorzystujemy multera jako nasz middleware do uploadu zdjęć i ustawiamy uploads jako domyślny folder
const photosMiddleware = multer({dest:'uploads'})


app.post('/upload', photosMiddleware.array('photos', 50) , (req,res) => {

    const uploadedPhotos = []

    //przykład pojedyńczego zdjęcia - np. zdjecie1.png

    for(let i=0;i<req.files.length; i++){

        const {path,originalname} = req.files[i]
        const nameParts = originalname.split('.')   //rozdzielenie rozszerzenia od nazwy pliku
        const extension = nameParts[nameParts.length - 1]  //pozyskanie rozszerzenia .png
        const newPath = path + '.' + extension  //stworzenie nowej unikalnej nazwy dla pliku i dołączenie do niej rozszerzenia
        fs.renameSync(path, newPath)    //zamiana nazwy pliku na nową
        uploadedPhotos.push(newPath.replace('uploads/','')) //dołączenie pliku do folderu uploads
    }
    res.json(uploadedPhotos)
})

app.post('/courses', (req,res) =>{

    const {
        title,
        photos,
        shortDescription,
        description,
        extraInfo,
        departure,
        returnDate,
        price,
        days,
        maxPersons
    } = req.body

        const newCourse = Course.create({
            title,
            photos,
            shortDescription,
            description,
            extraInfo,
            departure,
            returnDate,
            price,
            days,
            maxPersons
    })
        res.json(newCourse)
})


app.get('/courses', async (req,res) => {
    res.json( await Course.find())
})

app.get('/courses/:id', async (req,res) => {
    const {id} = req.params
    res.json(await Course.findById(id))
})

app.delete('/courses/delete/:id', async (req,res) => {
    const {id} = req.params
    await Course.deleteOne({_id:id})
})

app.put('/courses', async (req,res) =>{
    const {
        id,
        title,
        photos,
        shortDescription,
        description,
        extraInfo,
        departure,
        returnDate,
        price,
        days,
        maxPersons
    } = req.body

    const CourseDocument = await Course.findById(id)
    CourseDocument.set(
        {
            title,
            photos,
            shortDescription,
            description,
            extraInfo,
            departure,
            returnDate,
            price,
            days,
            maxPersons
        })
        await CourseDocument.save()
})

app.post('/enrolling', async (req,res) =>{
    const {user,id} = req.body
    const userID = user._id
    const courseID = id

    const CourseDocument = await Course.findById(courseID)

    const updatedUsers = CourseDocument.users

    updatedUsers[updatedUsers.length] = userID

    CourseDocument.set({
        users:updatedUsers
    }
    )

    await CourseDocument.save()
    

    res.json(updatedUsers)
})

app.get('/myCourses/:id', async (req,res) => {
    const {id} = req.params
    res.json(await Course.find({users:id}))
})

app.listen(process.env.PORT || 5000)
