import { Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { LoginContextProvider } from './LoginContex'
import AccountPage from './pages/AccountPage'
import CoursesInstructed from './pages/CoursesInstructed'
import CourseForm from './pages/CourseForm'
import CoursePage from './pages/CoursePage'
import MyCourses from './pages/MyCourses'
import ContactPage from './pages/ContactPage'

axios.defaults.baseURL = 'http://localhost:4000'

axios.defaults.withCredentials = true

function App() {
  return (
    <LoginContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/account" element={<AccountPage/>}></Route>
        <Route path="/account/myCourses/:id" element={<MyCourses/>}></Route>
        <Route path="/account/courses" element={<CoursesInstructed/>}></Route>
        <Route path="/account/courses/new" element={<CourseForm/>}></Route>
        <Route path="/account/courses/:id" element={<CourseForm/>}></Route>
        <Route path="/course/:id" element={<CoursePage/>}></Route>
        <Route path="/contact" element={<ContactPage/>}></Route>
      </Route>
    </Routes>
    </LoginContextProvider>
  )
}

export default App
