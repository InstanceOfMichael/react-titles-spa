import React, { Component } from 'react';
import axios from 'axios'

class Titles extends Component {

  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = {
      loading: null,
      title: null,
      title_id: props.match.params.id
    }
    console.log(this.state)
  }

  componentWillMount() {
    this.setState({
      loading: true,
    });

    axios.get(`http://localhost:3001/api/titles/${this.state.title_id}`)
      .then(response => {
        console.log({response})
        this.setState({
          loading: null,
          title: response.data,
        });
        console.log('title:', this.state.title)
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
    const title = this.state.title;
    const loading = !!this.state.loading;
    return (
      <div>
        {loading ? (
          <p>Loading</p>
        ) : (
          <div>
            <h1>Title: {title.title_name}</h1>
            <p>
              <strong>Release Year:</strong> {title.release_year}
            </p>
            <div>
              <h3>Genres</h3>
              <ul>
                {title.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Awards</h3>
              <table>
                <thead>
                  <tr>
                    <th>Award</th>
                    <th>Company</th>
                    <th>Year</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {title.awards.map(award => (
                    <tr key={award.id}>
                      <td>{award.award}</td>
                      <td>{award.award_company}</td>
                      <td>{award.award_year}</td>
                      <td>{award.award_won ? (
                        'Won'
                      ) : (
                        'Only Nominated'
                      )}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3>Participants</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {title.participants.map(participant => (
                    <tr key={participant.id}>
                      <td>{participant.name}</td>
                      <td>{participant.participant_type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3>Storylines</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Language</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {title.storylines.map(storyline => (
                    <tr key={storyline.id}>
                      <td>{storyline.type}</td>
                      <td>{storyline.description}</td>
                      <td>{storyline.language}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3>Names in Other Languages</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Language</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {title.other_names.map(other_name => (
                    <tr key={other_name.id}>
                      <td>{other_name.title_name}</td>
                      <td>{other_name.title_name_language}</td>
                      <td>{other_name.title_name_type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Titles
