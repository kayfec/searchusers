import React, { Component } from 'react';
import styled from 'styled-components';


const Span = styled('span')`
  font-size: 1.5em;
  border: 2px;
`;

const Img = styled('img')`
    border: 2px solid #55c5e9;
    padding: 15px;
    background: #666;
    margin-top: 12px;
    margin-right: 10px; 
    // margin-bottom: 10px; 
    width: 150px; 
    height: 150px;
   
`;

const Button = styled('button')`
  display: inline-block;
  color: gray;
  font-weight: 700;
  text-decoration: none;
  user-select: none;
  padding: .5em 2em;
  outline: none;
  border: 2px solid;
  border-radius: 1px;
  transition: 0.2s;
  margin-bottom: 10px;
  
  :hover { background: rgba(255,255,255,.2); };
  :active { background: white; };
`;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],
      hasError: false,
    };
  }
  componentDidMount() {
    this.search();
  };

  search = () => {

    const getItems = async () => {
      const result = await fetch('https://api.github.com/search/users?q=location%3Acherkassy&sort=followers');
      const data = await result.json();
      const items =  data.items.slice(0,10);
      return items
    };
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
      });
      throw new Error(err)
    })
  };

  simlulateError = () => {
    this.setState({
      hasError:true
    });
  };



  render() {
    if(this.state.hasError) {
      throw new Error('Simulate Error');
    }

    return (
        <div>
          <Button type='button' onClick={this.simlulateError}>error</Button>
          <div>
            {
              this.state.users.map(item => {
                const {id,avatar_url,login,html_url} = item;
                return (
                    <Span key={id}>
                      <Img src={avatar_url} alt="person_img"/>
                      <div><a href={html_url}>{login}</a></div>
                    </Span>
                )
              })
            }
          </div>
        </div>
    );

  }
}

export default App;
