import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//pages
import Login from './pages/login';
import Home from './pages/home'
import Search from './pages/search';
import Superhero from './pages/superhero';

const Routes = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/hero/:id" component={Superhero} />
                </Switch>
            </Router>
        </>
    )
}

export default Routes;