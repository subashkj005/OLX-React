import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebase/config';


function Posts() {

  const [products, setProducts] = useState([])

  const history = useHistory()
  const {setPostDetails} = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)
  

  useEffect(()=>{

    const productsCollection = collection(firestore, 'products')
    const unsubscribe = onSnapshot(productsCollection, (snapshot)=>{
      const allProducts = snapshot.docs.map((product)=>(
        {
          ...product.data(),
          id:product.id
        }
      ))
      setProducts(allProducts)
      
    })
    return ()=>unsubscribe()
    

  },[firebase])

  return (
    
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

        {products.map((product)=>(
          <div
          className="card"
          key={product.id} 
          onClick={()=>{
            setPostDetails(product)
            history.push('/view')
            }}>
          <div className="favorite">
            <Heart></Heart>
          </div>
          <div className="image">
            <img src={product.imageUrl} alt="" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; {product.price}</p>
            <p className="kilometer"> {product.name}</p>
            <span className="name">{product.category}</span>
          </div>
          <div className="date">
            <span>{product.createdAt}</span>
          </div>
        </div>
        ))}
        
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {products.map((product)=>(

          <div className="card" 
             key={product.id}
             onClick={()=>{
            setPostDetails(product)
            history.push('/view')
            }}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageUrl} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <p className="name"> {product.name}</p>
              <span className="kilometer">{product.category}</span>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
        ))}

        </div>
      </div>
    </div>
  );
}


export default Posts;
