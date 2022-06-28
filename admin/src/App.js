import './App.css';
import {useState,useEffect} from 'react'
import {BrowserRouter as Router,Routes ,Route} from 'react-router-dom'
import Nav from './components/Nav'
import Login from './components/Login'
import Home from './components/Home'
import Post from './components/Post'
import PostList from './components/PostList'
import PostEdit from './components/PostEdit'
import PostCreate from './components/PostCreate'
import AboutMe from './components/AboutMe'


//import PostUpdate from './components/PostUpdate'
import Axios from 'axios'
const instance = Axios.create({
  baseURL: 'https://blooming-peak-71078.herokuapp.com',
  withCredentials:true

});

function App() {
  const [backendDataPost,setBackendDataPost]=useState([{}])
  const [userData,setUserData]=useState(undefined)
//baby do bab do birulaibe laibe'


  useEffect(()=>{
    instance.get("/post").then((response)=>{
     console.log('responseeeeee',response)
     if(!response){
      setUserData(undefined)
      setBackendDataPost(undefined)
     }
     else{ console.log('response data userrr mate',response.data.user)
      setUserData(response.data.user)
    setBackendDataPost(response.data.post) }

  }
    
    )

  },[])

  


  return (
    <div className="App">
  
      <div className="App">
      <Router>
           <Nav user={userData} setUserData={setUserData}/> 
           <Routes>
           <Route exact path='/' element={<Home backendDataPost={backendDataPost} user={userData} />} />
           <Route exact path='/login' element={<Login setUserData={setUserData} />} />
           <Route exact path='/post/create' element={<PostCreate backendDataPost={backendDataPost} setBackendDataPost={setBackendDataPost}  user={userData} />} />
           <Route exact path='/post/:id' element={<Post backendDataPost={backendDataPost} setBackendDataPost={setBackendDataPost}  user={userData} />} />
           <Route exact path='/post/update/:id' element={<PostEdit backendDataPost={backendDataPost} setBackendDataPost={setBackendDataPost}  user={userData} />} />
           <Route exact path='/postList/:id' element={<PostList backendDataPost={backendDataPost} setBackendDataPost={setBackendDataPost}  user={userData} />} />
           <Route exact path='/About-Me' element={<AboutMe backendDataPost={backendDataPost} setBackendDataPost={setBackendDataPost}  user={userData} />} />

           </Routes>
         </Router>
       </div>
    </div>
  );


}

export default App;

