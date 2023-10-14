import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth' 
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Signup() {

  const history = useHistory()

  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')

  const {firebase} = useContext(FirebaseContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!email || !password || !username || !phone){
      return
    }

    const auth = getAuth()
    const db = getFirestore()

    createUserWithEmailAndPassword(auth, email, password)
    .then((result)=>{

      const user = result.user
      updateProfile(user,{displayName:username})
      .then(()=>{
        const userCollection = collection(db, 'users')
        const userData = {
          id:user.uid,
          username:username,
          phone:phone
        }
        addDoc(userCollection, userData)
        .then(()=>{
          history.push('/login')
        })
      })

    }) 
  } 

  return (
    <div>
      <div className="signupParentDiv">
        <Link to="/">
        <img width="200px" height="200px" src={Logo}></img>
        </Link>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="email"
            name="email"
            
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="phone"
            name="phone"
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="password"
            name="password"
            
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">
        <span>Login</span>
        </Link>
      </div>
    </div>
  );
}
