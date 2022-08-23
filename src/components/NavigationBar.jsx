import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import {useSelector} from 'react-redux'
import {logoutAction} from '../store/auth/AuthAction'

function NavigationBar() {
    const {user} = useSelector(state=>state.auth)
    console.log(user)
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Link style={{textDecoration:'none'}} to={'/'}>
                    <Navbar.Brand href="#">Logo</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {/* <Nav.Link href="#action1">Home</Nav.Link> */}
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-primary"><FaSearch/></Button>
                       
                    </Nav>
                    <p>{user&&user.email}</p>
                    {user?(<Form className="d-flex">
                        {/* <Link to={'/login'}> */}
                            <Button variant="outline-primary" onClick={logoutAction}>Logout</Button>
                        {/* </Link> */}
                    </Form>):(<Form className="d-flex">
                        <Link to={'/login'}>
                            <Button variant="outline-primary">Login</Button>
                        </Link>
                    </Form>)}
                    {/* <Form className="d-flex">
                        <Link to={'/login'}>
                            <Button variant="outline-primary">Login</Button>
                        </Link>
                    </Form> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar