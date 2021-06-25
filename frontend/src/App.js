import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Register from './components/Registeration/Register';
import Landing from './components/Landing';
import Timeline from "./components/timeline/Timeline";
import ProfilePage from './components/Profile/ProfilePage';
import PostPage from './components/timeline/PostPage/PostPage';



function App() {

  return (
    <div style={{height: "100%"}}>
      <BrowserRouter>
        <div style={{height: "100%"}}>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register/:type">
            <Register />
          </Route>
          <Route exact path="/timeline" component={Timeline} />
          <Route exact path="/profilePage/:userName" component={ProfilePage} />
          <Route exact path="/post/:postId" component={PostPage}/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
