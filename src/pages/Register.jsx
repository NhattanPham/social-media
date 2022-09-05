import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { registerAction } from '../store/auth/AuthAction'
import { useDispatch, useSelector } from 'react-redux'
function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const {registerSuccess} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        if (registerSuccess)
            navigate('/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registerSuccess])

    const handeleRegister = (e) => {
        e.preventDefault()
        dispatch(registerAction({
            email, password
        }))
    }
    return (
        <div style={{margin:'auto'}} className='col-md-6 col-xs-12'>
            <Form>
                <h1>Register</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <p>You have an account!<Link to={'/login'}>Login</Link></p>
                <Button variant="primary" type="submit" onClick={handeleRegister}>
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default Register