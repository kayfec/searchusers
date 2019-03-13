import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],
      URL : 'https://api.github.com/search/users?q=location%3Acherkassy&sort=followers'
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
    throw new Error('wwww')
  }

  render() {
    setTimeout(() => {
      if(this.state.users.length === 0) {
        throw new Error('/wtf')
      }

    },5000)
    return (
        <div>
          <div>URL : <input defaultValue={this.state.URL} /></div>
          <button>Search</button>
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
