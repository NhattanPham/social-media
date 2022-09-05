import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPostsAction, createPostAction } from '../store/posts/PostAction'
import storage from '../firebase/firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
function AddPost({loadPostByUser}) {
    const { user } = useSelector(state => state.auth)
    const [file, setFile] = useState("")
    const [imageUpload, setImageUpload] = useState('')
    const [persent, setPersent] = useState(0)
    const dispatch = useDispatch()
    const handleAddPost = (e) => {
        dispatch(createPostAction({ userId: user.id, body: e.target.value, thumbnail: imageUpload }))
        dispatch(loadPostsAction())
        loadPostByUser()
        e.target.value = ''
    }
    const handleChange = (e) => {
        console.log('File', e.target.files[0])
        setFile(e.target.files[0])
    }
    // function handleChange(event) {
    //     console.log('File', event.targe)
    //     // setFile(event.target.files[0]);
    // }
    const handleUpload = () => {
        if (!file) {
            alert("Please choose a file first!")
        }else{
        const storeageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storeageRef, file)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const persentF = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setPersent(persentF)
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url)
                    setImageUpload(url)
                })
            }
        )
    }
    }
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
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            console.log(e.target.value)
                            handleAddPost(e)
                            setFile("")
                            setImageUpload('')
                        }
                    }}
                />
            </div>
            <div>
                <input type="file" onChange={handleChange} className='img' multiple />
                <button onClick={handleUpload}>Upload</button>
                <p>{persent} "% done"</p>
                {imageUpload !== '' && <img style={{ width: '80%' }} src={imageUpload} alt="" />}

            </div>
        </div>
    )
}

export default AddPost