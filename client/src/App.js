import "./App.css";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import uwsgiLinux from "./Pages/uwsgiLinux/uwsgiLinux";
import Gunicorn from "./Pages/gunicornLinux/gunicornLunux";
function App() {
    return (
        <BrowserRouter basename="/project/docs">
            <Switch>
                <Route path="/uwsgi" exact component={uwsgiLinux}></Route>
                <Route path="/gunicorn" exact component={Gunicorn}></Route>
                <Route path="/" exact component={Home}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
