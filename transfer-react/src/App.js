import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import transfer from './transfer';

class App extends Component {
  state = {
    sender: '',
    receiver:'',
    value:'',
    message:''
  };

  async componentDidMount() {
    const sender = await transfer.methods.sender().call();
    this.setState({ sender});
  }

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await transfer.methods.sendEther().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });
    
    this.setState({ message: 'Ether sent successfully!' });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await transfer.methods.setReceiver().send({
      from: accounts[0],
      
    });
    this.setState({receiver:accounts[0]});
    this.setState({ message: 'Assigned the Receiver!' });
  };

  render() {
    return (
      <div>
        <h2>Simple Ether Transfer Contract</h2>
        <p>
          This contract is managed by {this.state.sender}.           
        </p>

        <hr />
        <h4>Set Receiver</h4>
        <button onClick={this.onClick}>Set Receiver</button>   
        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to transfer Ether?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Send Ether</button>
        </form>

       
        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;