import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';

function Login() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const {firebase} = useContext(FirebaseContext)

  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      return;
    }
  
    const auth = getAuth();
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          history.push('/');
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Password',
            text: 'Enter username and password correctly !'
            
          })
        });
    } catch (error) {
      alert('An error occurred while signing in.');
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <Link to="/">
        <img width="200px" height="200px" src={Logo}></img>
        </Link>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            placeholder='Email address'
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            placeholder='Password'
          />
          <br />
          <br />
          <button type='submit'>Login</button>
        </form>
        <Link to="/signup">
        <span>Signup</span>
        </Link>
      </div>
    </div>
  );
}

export default Login;

