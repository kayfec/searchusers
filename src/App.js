import React, { Component } from 'react';
import styled from 'styled-components';


const ul = styled.li`
font-size: 1.5em;
color: purple;
border: 3px;
`;

const div = styled.div`
border: 3px;
outline : blue;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],
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
      this.setState({
        users:data
      })
    })
  }

  simlulateError = () => {
    this.setState({
      users:[]
    })
    throw new Error('not found user')
  }

  render() {
    setTimeout(() => {
      if(this.state.users.length === 0) {
        throw new Error('/wtf')
      }

    },5000)
    return (
        <div>
          <button type='button' onClick={this.simlulateError}>error</button>
          <ul>
            {
              this.state.users.map(item => {
                const {id,avatar_url,login,html_url} = item;
                return (
                    <li key={id}>
                      <img src={avatar_url} alt="person_img"/>
                      <div><a href={html_url}>{login}</a></div>
                    </li>
                )
              })
            }
          </ul>
        </div>
    );

  }
}

export default App;
