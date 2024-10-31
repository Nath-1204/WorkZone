import React, { useState, useEffect } from "react";
import { SignInUser } from "../../redux/ActionCreater/AuthActionCreater"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password) {
            toast.error("Please fill in all fields");
        }

        dispatch(SignInUser(email, password, setSuccess));
    }

    useEffect(() => {
        if(success){
            navigate("/Dashboard");
        }
    }, [success]);

    
    return(
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group my-2">
                <input 
                    type="email" 
                    name="email" 
                    className="form-control" 
                    placeholder="Email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)} 
                />
            </div>
            <div className="form-group my-2">
                <input 
                    type="password" 
                    name="password" 
                    className="form-control" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary my-2 form-control">Login</button>
        </form>
    )
}

export default LoginForm;