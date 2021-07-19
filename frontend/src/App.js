import React, {useState, useContext, useEffect} from 'react'
import './App.css';
import Header from './components/Header'
import MainWrapper from './components/Main'
import MainWrapper2 from './components/Main2'
import SavedImageHolder from './components/SavedImageHolder'
import HomePage from './pages/HomePage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from './pages/Dashboard'
import Main from './components/Main'
import Register from './pages/Register'
import Login from './pages/Login'
import UserContext from './UserContext'

function App() {
  const [user, setUser] = useState(null)
  const [userImages, setUserImages] = useState([]);
  const [publicImages, setPublicImages] = useState([]);
  const url = "http://localhost:3001";
  useEffect(()=>{
    const userDataRaw = localStorage.getItem('user')
    const userData = JSON.parse(userDataRaw)
    setUser(userData)
    getPublicImages();
    // setUserData(userData)
  },[])

  async function getPublicImages(){
    try{
      let response = await fetch(`${url}/getAllPublicImages`,{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if(response.status !== 200) throw await response.json()

      let data = await response.json();
      console.log(data)
      setPublicImages((old)=>[...old ,data.map(item=> item.savedImageId)])
      // setImageUrl( data.image)
      // setComments(data.imageComments)

    } catch (e){
      alert(e)
      console.log(e)
    }
  }
  console.log(publicImages)

  return (
    <Router>
      <div className="App h-screen	">
        <UserContext.Provider value={{
          user,
          setUser,
          userImages,
          setUserImages
        }} >
          <Header />
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/image1" component={MainWrapper} />
            <Route path="/register" component={Register} />
            <Route path="/images/:imageId" component={MainWrapper} />
            <Route path="/publicImage/:imageId" component={MainWrapper2} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/addImage" component={MainWrapper} />

            <Route path="/" component={HomePage} />
          </Switch>
        </UserContext.Provider>

        {/*<MainWrapper />*/}
      </div>

    </Router>

  );
}

export default App;
