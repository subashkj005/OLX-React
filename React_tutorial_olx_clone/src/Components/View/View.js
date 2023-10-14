import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/config';
function View() {

  const [userDetails, setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)

  useEffect(()=>{
    if (postDetails !== null){
      const {userId} = postDetails
      const productDetails = collection(firestore, 'users')
      console.log(productDetails);
      const q  = query(productDetails, where('id', '==', userId))
      getDocs(q)
      .then((snapShot)=>{
        console.log(snapShot);
        snapShot.forEach(doc => {
          setUserDetails(doc.data())
          console.log(doc.data());
        })
      })
    }
  },[])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {
        userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
        }
      </div>
    </div>
  );
}
export default View;
