import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Ranks from './components/Ranks/Ranks';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

// import { render } from '@testing-library/react';


const particlesOption ={
  particles: {
    number: {
      value:100,
      density:{
        enable: true,
        value_area:700
      }
    }
  }
}
 
const initialState = {
  input:'',
  imgUrl:'',
  box:{},
  route: 'SignIn',
  isSignedIn:false,
  users: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: 'new Date()'
}
}   

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

loadUser = (data)=>{
  this.setState({users: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries:data.entries,
    joined:data.joined

}})

}

  componentDidMount() {
    fetch('http://localhost:3001')
    .then(response => response.json())
    .then (console.log)
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = (image.width);
    const height = (image.height);
    
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box)=>{
      console.log(box);
      this.setState({box:box})
  } 

  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }
  
  onPictureSubmit =()=>{
    this.setState({imgUrl:this.state.input});
    
    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers: {'content-Type': 'application/json'},
      body: JSON.stringify({
      input:this.state.input
  })
})
      .then(response => response.json())
      .then(response => {
        if (response){
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
            id: this.state.users.id
            })
        }) 
          .then(response => (response.json()))
          .then(count => {
            this.setState(Object.assign(this.state.users, {entries:count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
    .catch(err => console.log(err))
    }
  

  onRouteChange=(route)=>{
    if (route === 'SignIn'){
      this.setState(initialState)
    }

        else if (route==='FaceRec'){
          this.setState({isSignedIn:true})
        }
    this.setState({route:route});
  }



  render() {
    const {box,route,isSignedIn,imgUrl} = this.state;
    return (
      <div className="App">
          <Particles params={particlesOption} className='particles'/>
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          {route === 'FaceRec'?
          <div>
          <Logo /> 
          <Ranks 
          name={this.state.users.name} 
          entries={this.state.users.entries}
          />
          <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onPictureSubmit={this.onPictureSubmit}/>
          <FaceRecognition box={box} imgUrl={imgUrl}/>
          </div>
          :
          (
            route==='SignIn'?
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            // <SignIn onRouteChange={this.onRouteChange}/>
            :<Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
          )
         
          }
      </div>
    
    );
  }
}
export default App;
