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
import styles from './NavigationBar.module.css'

function NavigationBar() {
    const { user } = useSelector(state => state.auth)
    const [users, setUsers] = useState([])
    const [userFilter, setUserFilter] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log("user", user)
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
            .catch(error => console.log(error))
    }, [])
    const handleSearch = (params) => {
        // const userFilter = users.filter((item)=>item?.name.toLowerCase().includes(params))
        if (params !== '') {
            const userFilterF = users.filter((item) => {
                if (item.name)
                    return item?.name.toLowerCase().includes(params.toLowerCase())
                else return false
            }
            )
            setUserFilter(userFilterF)
        } else {
            setUserFilter([])
        }
    }
    // console.log('User',user)
    return (
        <Navbar style={{  position: ' sticky', top: '0', zIndex: '999' }} bg="light" expand="lg">
            <Container fluid>
                <Link style={{ textDecoration: 'none' }} to={'/'}>
                    <Navbar.Brand href="#">
                        <img
                            style={{width:'50px'}}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                            alt="Not Found"
                        />
                    </Navbar.Brand>
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
                            id={'search'}
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <Button variant="outline-primary"><FaSearch /></Button>

                    </Nav>
                    <div className='d-flex p-2 align-items-center'>
                        {user && <div ><Link to={`/profile/${user.id}`} style={{ color: '#000', textDecoration: 'none', padding: '0 20px' }}>{user.name ? user.name : user.email}</Link></div>}

                        {user !== null ? (<Form className="d-flex">
                            <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
                        </Form>) : (<Form className="d-flex">
                            <Link to={'/login'}>
                                <Button variant="outline-primary">Login</Button>
                            </Link>
                        </Form>)}
                    </div>
                </Navbar.Collapse>
                <div className={styles.searchBox}>
                    <ul style={{ listStyle: 'none', padding: '0px' }}>
                        {userFilter && userFilter.map(item => (
                            <li key={item.id} className={styles.searchBoxItemLi}><Link onClick={() => {
                                document.getElementById('search').value = ''
                                setUserFilter([])
                            }} className={styles.searchBoxItem} to={`/profile/${item.id}`}>{item.name}</Link></li>
                        ))}
                    </ul>
                </div>
            </Container>
        </Navbar>
    )
}

export default NavigationBar