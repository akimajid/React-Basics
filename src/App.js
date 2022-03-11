import "./assets/styles.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import TodoPage from './pages/todo';
import BandPage from "./pages/band";
import Navbar from "./components/Navbar/Navbar";
import TourPage from "./pages/tour";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/404";
import BandMemberPage from "./pages/band-member";
import ProductPage from "./pages/product";
import UsersPage from "./pages/users";
import LoginPage from "./pages/login";
import CounterPage from "./pages/counter";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const saveUserData = localStorage.getItem("user_data")

    if (saveUserData) {
      const parsedUserData = JSON.parse(saveUserData)
  
      dispatch ({
        type: "LOGIN_USER",
        payload : parsedUserData
      })
    }

  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/band" element={<BandPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/tour" element={<TourPage />} />
        <Route path="/band-member/:bandMemberId" element={<BandMemberPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="counter" element={<CounterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
