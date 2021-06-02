import { BrowserRouter, Route } from 'react-router-dom';
import Register from './components/Registeration/Register';
import Landing from './components/Landing';


function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
