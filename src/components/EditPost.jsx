import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {AiOutlineEdit} from 'react-icons/ai'
import { editPost } from '../services/posts';
function EditPost({post,loadPosts}) {
    // const { user } = useSelector(state => state.auth)
    const [content, setContent] = useState(post.body)
    // const dispatch = useDispatch()
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleEdit = (postId,content) => {
        editPost(postId,{body:content})
        .then((res)=>{
            if(res.status===200){
                console.log(res.data)
                loadPosts()
            }
        })
    }
  return (
    <div> <Button variant="outline-primary" style={{position:'absolute',top:'30px',right:'50px'}} onClick={handleShowEdit}>
    <AiOutlineEdit/>
    </Button>
    <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup className="mb-3">
                <InputGroup.Text>Content</InputGroup.Text>
                <Form.Control
                    value={content}
                    onChange={(e) => { setContent(e.target.value) }}
                    aria-label="First name" />
            </InputGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
                Close
            </Button>
            <Button variant="primary" onClick={() => {handleEdit(post.id,content)}}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal></div>
  )
}

export default EditPost