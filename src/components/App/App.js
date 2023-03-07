import React, { Component } from 'react';
import './App.css';
// import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    return fetch('http://localhost:3001/api/v1/urls')
    .then(response => {
      if (response.ok){
        return response.json()
      } else {
        throw new Error
      }
    })
    .then(data => {
      this.setState({urls: data.urls})
    })
    .catch(error => {
      console.log(error)
    })
  }

  addUrl = (newUrl) => {
    this.setState({ urls: [...this.state.urls, newUrl] });
  }

  sendUrl = (newUrl) => {
    fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      body: JSON.stringify(newUrl),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      if (response.ok){
        return response.json()
      } else {
        throw new Error
      }
    })
    .then(data => {
      this.addUrl(data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1 className='website-name'>URL Shortener</h1>
          <UrlForm urls={this.state.urls} sendUrl={this.sendUrl}/>
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
