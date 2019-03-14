import React, { Component } from 'react';
import styled from 'styled-components';


const Li = styled('li')`
font-size: 1.5em;
color: purple;
border: 3px;
outline : blue;
`;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],
      error: false,
    };
  }
  componentDidMount() {
    this.search();
  }

  search = () => {

    const getItems = async () => {
      const result = await fetch('https://api.github.com/search/users?q=location%3Acherkassy&sort=followers');
      const data = await result.json();
      const items =  data.items.slice(0,10);
      return items
    }
    return getItems().then(data => {
      if(data.length > 0) {
        this.setState({
          users:data
        })
      } else {
        throw new Error('Error: less than 10 Users received')
      }
    }).catch(err=> {
      this.setState({
        hasError:true
      })
      throw new Error(err)
    })
  }

  render() {
    if(this.state.error) {
      throw new Error('Simulate Error');
    }

    return (
        <div>
          <button type='button' onClick={this.simlulateError}>error</button>
          <ul>
            {
              this.state.users.map(item => {
                const {id,avatar_url,login,html_url} = item;
                return (
                    <Li key={id}>
                      <img src={avatar_url} alt="person_img"/>
                      <div><a href={html_url}>{login}</a></div>
                    </Li>
                )
              })
            }
          </ul>
        </div>
    );

  }
}

export default App;
