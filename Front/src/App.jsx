import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux"
import { useEffect } from "react";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./Pages/AuthPages/Login/Login";
import Register from "./Pages/AuthPages/Register/Register";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import HomePage from "./Pages/HomePage/HomePage"
import { CheckIsLoggedIn } from "./redux/ActionCreater/AuthActionCreater";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CheckIsLoggedIn());
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/Dashboard" element={<DashboardPage />}/>
      </Routes>
    </>
  )
}

export default App;
