import React, { useContext, useEffect } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import { AuthContext, FirebaseContext } from './store/Context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import Post from './store/PostContext';
import ViewPost from './Pages/ViewPost'




function App() {

  const {firebase} = useContext(FirebaseContext) 
  const {user, setUser} = useContext(AuthContext)

  useEffect(()=>{
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
    return ()=>{
      unsubscribe();
    }
  },[])

  return (
    <div>
      <Post>
      <Router>
        <Route exact path='/'><Home /></Route>
        <Route path='/signup'><Signup/></Route>
        <Route path='/login'><Login/></Route>
        <Route path='/create'><Create /></Route>
        <Route path='/view'><ViewPost /></Route>
      </Router>
      </Post>
    </div>
  );
}

export default App;
