import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {storage,firestore} from '../../firebase/config'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2'




const Create = () => {

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)

  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)

  const history = useHistory()


  const handleSubmit = ()=>{    
    const storageRef = ref(storage,`/images/${image.name}`)
    uploadBytes(storageRef,image)
    .then((snip)=>{
        getDownloadURL(snip.ref)
    .then((url)=>{
        console.log(url)
        try {
          const docRef = addDoc(collection(firestore, 'products'), {
            name,
            category,
            price,
            userId: user.uid,
            createdAt: new Date().toISOString(),
            imageUrl: url, // Include the download URL of the image
          });
          history.push('/')
        } catch (error) {
          console.error('Error adding document: ', error);
          alert('Error adding document: ' + error.message);
        } 
      })
      .catch((error)=>{
        alert(error.message)
      })
        }
)
.catch((error)=>{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Please Login for posting Ads'
    
  })
})
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              placeholder='Product Name'
              onChange={e=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              placeholder='Category'
              onChange={e=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" onChange={e=>setPrice(e.target.value)} type="number" id="fname" name="Price" value={price} placeholder='price' />
            <br />
          
          <br />
          {image && <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>}
          
            <br />
            <input onChange={e=>setImage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
