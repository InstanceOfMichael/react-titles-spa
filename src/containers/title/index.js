import React, { Component } from 'react';
import axios from 'axios'
import { Header, Segment, Label } from 'semantic-ui-react'

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
            <Header as='h1' dividing>
              {title.title_name}
            </Header>

            <Segment attached>
              <strong>Release Year:</strong> {title.release_year}
            </Segment>
            <Segment attached>
              <strong>Genres:</strong>&nbsp;
              {title.genres.map(genre => genre.name).join(', ')}
            </Segment>

            <Header as='h4' attached='top' block>Awards</Header>
            {title.awards.map(award => (
              <Segment key={award.id} attached>
                {award.award_year} {award.award}
                &nbsp;
                {award.award_won ? (
                  <Label color='green'>Won</Label>
                ) : (
                  <Label color='grey'>Only Nominated</Label>
                )}
              </Segment>
            ))}

            <Header as='h4' attached='top' block>Participants</Header>
            {title.participants.map(participant => (
              <Segment key={participant.id} attached>
                {participant.name}
                &nbsp;
                <Label>{participant.participant_type}</Label>
              </Segment>
            ))}

            <Header as='h4' attached='top' block>Storylines</Header>
            {title.storylines.map(storyline => (
              <Segment key={storyline.id} attached>
                <Label>{storyline.language}</Label>&nbsp;
                {storyline.description}
                &nbsp;
                <small>({storyline.type})</small>
              </Segment>
            ))}

            <Header as='h4' attached='top' block>Names in Other Languages</Header>
            {title.other_names.map(other_name => (
              <Segment key={other_name.id} attached>
                <Label>{other_name.title_name_language}</Label>&nbsp;
                {other_name.title_name}
                &nbsp;
                <small>({other_name.title_name_type})</small>
              </Segment>
            ))}

          </div>
        )}
      </div>
    )
  }
}

export default Titles
