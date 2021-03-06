import { Component, Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import NavBar from './components/navBar'
import MovieForm from './components/movieForm'
import Movies from './components/movies'
import Customers from './components/customers'
import Rentals from './components/rentals'
import NotFound from './components/notFound'
import LoginForm from './components/loginForm'
import RegisterForm from './components/registerForm'
import './App.css'

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </Fragment>
    )
  }
}

export default App
