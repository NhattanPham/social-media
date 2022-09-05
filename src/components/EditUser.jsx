import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { editUserAction } from '../store/auth/AuthAction';
function EditUser({reloadPosts}) {
    const { user } = useSelector(state => state.auth)
    const [name, setName] = useState(user?.name)
    const [address, setAddress] = useState(user?.address)
    const [phone, setPhone] = useState(user?.phone)
    const dispatch = useDispatch()
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleEdit = (name, address, phone) => {
        dispatch(editUserAction(user.id, { name, address, phone }))
        handleCloseEdit()
        reloadPosts(user.id)
    }
  
    return (
        <div>
            <Button variant="primary" onClick={handleShowEdit}>
                Edit profile
            </Button>
            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Name</InputGroup.Text>
                        <Form.Control
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            aria-label="First name" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Address</InputGroup.Text>
                        <Form.Control
                            value={address}
                            onChange={(e) => { setAddress(e.target.value) }}
                            aria-label="First name" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Phone</InputGroup.Text>
                        <Form.Control
                            type='number'
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                            aria-label="First name" />
                    </InputGroup>
                    <div>Avatar</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEdit(name, address, phone)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditUser