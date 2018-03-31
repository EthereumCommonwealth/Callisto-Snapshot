import React, { Component } from 'react'
import logo from '../images/clo-logo.png'

let web3;

if (typeof window !== 'undefined') {
  const Web3 = require('web3')
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(Web3.givenProvider || "https://clo-testnet3.0xinfra.com")
  }
}

class Snapshot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      error: false,
      message: false,
      showSpinner: false,
    }
  }

  onChange = (event) => {
    event.preventDefault()
    this.setState({ address: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.setState({
      showSpinner: true,
      error: false,
    })
    if (web3.utils.isAddress(this.state.address)) {
      web3.eth.getBalance(this.state.address)
        .then((res) => {
          this.setState({
            message: web3.utils.fromWei(res, 'ether'),
            error: false,
            showSpinner: false,
          })
        })
        .catch((err) => {
          this.setState({
            error: res.message,
            message: false,
            showSpinner: false,
          })
        })
    } else {
      this.setState({
        error: 'Incorrect address format',
        message: false,
        showSpinner: false,
      })
    }
  }

  render() {
    return (
      <div className="App-Container">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <h1 className="App-title" >AirDrop Balance Checker</h1>
          <p className="App-intro">This is the Callisto Snapshot system for testnet</p>
          <form className="App-form" onSubmit={this.onSubmit}>
            <input
              className="App-form-input"
              value={this.state.address}
              onChange={this.onChange}
              placeholder="Address..."
              type="text"
              required
            />
            <a className="App-form-submit" onClick={(evt) => {
              if (this.state.address !== ""){
                this.onSubmit(evt);
              }
            }}>Submit</a>
          </form>
          {this.state.showSpinner ? <i className="fas fa-circle-notch fa-spin fa-3x fa-fw App-Spinner" /> : null}
          {this.state.message ? <p className="App-message">Your Callisto Balance is: {this.state.message} CLO</p> : null}
          {this.state.error ? <p className="App-error">{this.state.error}</p> : null}
        </div>
        <footer className="Footer" key="footer">
          <a
            href="https://github.com/EthereumCommonwealth/Callisto-Snapshot"
            target="_blank"
            className="Footer-Link"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" /> Source Code
          </a>
        </footer>
      </div>
    )
  }
}

export default Snapshot
