import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPostsAction, createPostAction } from '../store/posts/PostAction'
import { BsCardImage } from 'react-icons/bs'
import storage from '../firebase/firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
function AddPost({ loadPostByUser }) {
    const { user } = useSelector(state => state.auth)
    const [comment, setComment] = useState('')
    const [file, setFile] = useState("")
    const [imagePreview, setImagePreview] = useState('')
    // const [imageUpload, setImageUpload] = useState('')
    // const [persent, setPersent] = useState(0)
    const dispatch = useDispatch()
    const handleAddPost = (url) => {
        // handleUpload()
        // if(imageUpload)
        dispatch(createPostAction({ userId: user.id, body: comment, thumbnail: url }))
        dispatch(loadPostsAction())
        // loadPostByUser()

        // setComment('')
    }
    useEffect(() => {
        if (!file) {
            setImagePreview(undefined)
            return

        }
        const objectUrl = URL.createObjectURL(file)
        setImagePreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)

    }, [file])
    // const handleChangeInput = (e)=>{

    // }
    const handleChange = (e) => {
        console.log('File', e.target.files[0])
        setFile(e.target.files[0])

    }
    const handleUpload = () => {
        if (!file) {
            alert("Please choose a file first!")
        } else {
            const storeageRef = ref(storage, `/files/${file.name}`)
            const uploadTask = uploadBytesResumable(storeageRef, file)

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const persentF = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    console.log(persentF)
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url)
                        // setImageUpload(url)
                        handleAddPost(url)
                    })
                }
            )
        }
    }
    console.log('preview', imagePreview)
    // console.log('upload',imageUpload)
    return (
        <div style={{ backgroundColor: 'rgb(247, 247, 247)', margin: '10px 0', padding: '10px 20px', borderRadius: '20px' }} className='col-md-12'>
            <div className='input-group mb-3'>
                <img
                    style={{ width: '40px', height: '40px', borderRadius: '20px', margin: '0 20px' }}
                    src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
                    alt="No found" />
                <input
                    type="text"
                    className="form-control"
                    placeholder={`What's on your mind?`}
                    aria-describedby="basic-addon1"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            console.log(comment)
                            handleUpload()
                            setFile("")
                            setComment('')
                        }
                    }}
                />
                <label htmlFor="file-media" style={{ fontSize: '30px' }} className='btn'><BsCardImage /></label>
                <input style={{ display: 'none' }} id={"file-media"} name={'file-media'} type="file" onChange={(e) => {
                    handleChange(e)
                }} className='img' multiple />
            </div>
            <div>
                {imagePreview !== '' && <img style={{ width: '80%' }} src={imagePreview} alt="" />}
                <button className='btn btn-primary' onClick={() => {
                    handleUpload()
                    setFile("")
                    setComment('')
                }} style={{ margin: '10px', width: '80%' }}>Post</button>

            </div>
        </div>
    )
}

export default AddPost