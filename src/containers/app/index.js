import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Titles from '../titles'
import Title from '../title'

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/titles">Titles</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/titles" component={Titles} />
      <Route exact path="/titles/:id" component={Title} />
    </main>
  </div>
)

export default App
