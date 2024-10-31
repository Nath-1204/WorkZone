
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignOutUser } from "../../../redux/ActionCreater/AuthActionCreater";

import "./navbar.css"

const Navbar = () => {

    const dispatch  = useDispatch()
    const {isAuthenticated, user} = useSelector(state => state.auth);

    return(
        <div className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3">
            <Link to="/Dashboard" className="navbar-brand ms-5">
                File Management System
            </Link>
            <ul className="navbar-nav ms-auto me-5">
                {
                    isAuthenticated ? (
                        <>
                            <li className="nav-item mx-2">
                                <p className="my-0 mt-1 mx-2">
                                    <span className="text-dark">Welcome,</span>
                                    <span className="fw-bold">{user.displayName}</span>
                                </p>
                            </li>
                            <li className="nav-item mx-2">
                                <Link to="/" className="btn btn-primary btn-sm">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button 
                                    className="btn btn-success btn-sm" 
                                    onClick={() => dispatch(SignOutUser())}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )
                    : (
                        <>
                            <li className="nav-item mx-2">
                                <Link to="/Login" className="btn btn-primary btn-sm">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Register" className="btn btn-success btn-sm">
                                    Register
                                </Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </div>
    )
}

export default Navbar;