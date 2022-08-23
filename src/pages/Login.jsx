import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Login() {
    const {loadding,user,error} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const handleLogin =()=>{
        
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
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}

export default Login