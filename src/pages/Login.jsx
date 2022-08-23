import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {loginAction} from '../store/auth/AuthAction'

function Login() {
    const {user,error} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[user])

    const handleLogin =(e)=>{
        e.preventDefault()
        dispatch(loginAction({email,password}))
        console.log('user', user,error)
    }
    return (
        <Form>
            <h1>Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                type="email"
                 placeholder="Enter email" 
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 />
            </Form.Group>
            <p>You don't have an account?<Link to={'/register'}>Register</Link></p>
            <Button 
            variant="primary" 
            type="submit"
                onClick={handleLogin}
            >
                Login
            </Button>
        </Form>
    )
}

export default Login