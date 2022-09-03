import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutAction } from '../store/auth/AuthAction'
import { getUsers } from '../services/auth'


function NavigationBar() {
    const { user } = useSelector(state => state.auth)
    const [users, setUsers] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log("user", user)
    const handleLogout = () => {
        dispatch(logoutAction())
        navigate('/login')
    }
    useEffect(() => {
        getUsers()
            .then(res => {
                if (res.status === 200)
                    setUsers(res.data)
            })
            .catch(error=>console.log(error))
    },[])
    const handleSearch = (params) => {
        console.log(users)
        console.log(params)
    }
    return (
        <Navbar style={{ padding: '8px 100px' }} bg="light" expand="lg">
            <Container fluid>
                <Link style={{ textDecoration: 'none' }} to={'/'}>
                    <Navbar.Brand href="#">Logos</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <Button variant="outline-primary"><FaSearch /></Button>

                    </Nav>
                    <div className='d-flex p-2 align-items-center'>
                        {user && <div ><Link to={`/profile/${user.id}`} style={{ color: '#000', textDecoration: 'none', padding: '0 20px' }}>{user.email}</Link></div>}

                        {user !== null ? (<Form className="d-flex">
                            {/* <Link to={'/login'}> */}
                            <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
                            {/* </Link> */}
                        </Form>) : (<Form className="d-flex">
                            <Link to={'/login'}>
                                <Button variant="outline-primary">Login</Button>
                            </Link>
                        </Form>)}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar