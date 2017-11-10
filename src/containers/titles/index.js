import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Header, Segment, Icon, Input } from 'semantic-ui-react'

class Titles extends Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      search: '',
      loading: null,
      collection: { data: []},
    }
  }

  fetchItems() {
    this.setState({
      loading: true,
    });

    axios.get('http://localhost:3001/api/titles', {
      params: {
        search: this.state.search || null
      },
    })
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

  componentWillMount() {
    this.fetchItems();
  }

  searchOnChange(event) {
    this.setState({
      search: event.target.value,
    });
  }

  searchOnKeyUp(event) {
    this.fetchItems();
  }

  render() {
    const loading = !!this.state.loading;
    const titles = this.state.collection.data.map(title =>
      <Segment attached key={title.id}>
        <Link to={`/titles/${title.id}`}>
          {title.title_name} ({title.release_year})
        </Link>
      </Segment>
    )
    return (
      <div>
        <Header as='h1' dividing>
          Titles Index
        </Header>
        <Input
          value={this.state.search}
          onChange={e => this.searchOnChange(e)}
          onKeyUp={e => this.searchOnKeyUp(e)}
          icon={
            <Icon name='search' inverted circular link />
          }
          placeholder='Search...'
        />
        {loading ? (
          <p>Loading</p>
        ) : (
          <Segment.Group>
            {titles}
          </Segment.Group>
        )}
      </div>
    )
  }
}

export default Titles
