import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

class Titles extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: null,
      collection: { data: []},
    }
  }

  componentWillMount() {
    this.setState({
      loading: true,
    });

    axios.get('http://localhost:3001/api/titles')
      .then(response => {
        console.log({response})
        this.setState({
          loading: null,
          collection: response.data,
        });
        console.log('collection:', this.state.collection)
      })
      .catch(err => {
        console.error('/api/titles', err)
        this.setState({
          loading: null,
          error: err,
        });
      })
  }

  render() {
    const titles = this.state.collection.data.map(title =>
      <li key={title.id}>
        <Link to={`/titles/${title.id}`}>
          {title.title_name}
        </Link>
      </li>
    )
    return (
      <div>
        <h1>Titles Index</h1>
        <p>Did you get here via Redux?</p>
        <ul>{titles}</ul>
        <p>Loading</p>
      </div>
    )
  }
}

export default Titles
