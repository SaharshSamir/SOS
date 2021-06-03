import { BrowserRouter, Route, useParams } from 'react-router-dom';
import Register from './components/Registeration/Register';
import Landing from './components/Landing';
import Timeline from "./components/timeline/Timeline";


function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register/:type">

            <Register />
          </Route>
          <Route exact path="/timeline" component={Timeline} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
