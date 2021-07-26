import logo from "./logo.svg";
import "./App.css";
import uwsgiLinux from "./Pages/uwsgiLinux/uwsgiLinux";
import Home from "./Pages/Home/Home";
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Gunicorn from "./Pages/gunicornLinux/gunicornLunux";
function App() {
  return (
      // <uwsgiLinux></uwsgiLinux>
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} ></Route>
            <Route path="/uwsgi" exact component={uwsgiLinux} ></Route>
            <Route path="/gunicorn" exact component={Gunicorn}></Route>
        </Switch>
      </BrowserRouter>

  );
}

export default App;
