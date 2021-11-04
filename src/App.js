
import './App.css';
import Login from "./components/Login";
import {Route, Switch, Link, useHistory,useLocation} from 'react-router-dom'
import Home from "./components/Home";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {logout} from "./store/slices/auth";

function App() {
    const store = useSelector(state => state.auth);
    const dispatch=useDispatch();
    const history=useHistory();
    const location=useLocation();
    useEffect(()=>{
        if(store.success===false){
            history.push("/login");
        }
    },[location.pathname]);
    const isSuccess=()=>{
        return   store.success
            ?<li onClick={()=>dispatch(logout())}>
                <Link to="/logout">Logout</Link>
            </li>
            :<li>
                <Link to="/login">Login</Link>
            </li>
    }
  return (
        <div className="App">
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        {isSuccess()}
                    </ul>
                </nav>
            </div>
            <Switch>
                {store.success&&<Route path={"/"} exact component={Home}/>}
                <Route path={"/login"}  component={Login}/>
                <Route path={"/logout"} component={Login}/>
            </Switch>
        </div>
  );
}

export default App;
