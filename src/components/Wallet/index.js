import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import Web3 from 'web3';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 10px #4caf50;
  }
  50% {
    box-shadow: 0 0 20px #4caf50;
  }
  100% {
    box-shadow: 0 0 10px #4caf50;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  margin: 10px;
  cursor: pointer;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  transition: background-color 0.3s ease;
  animation: ${glowAnimation} 2s infinite;
  &:hover {
    background-color: #45a049;
    animation: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 16px;
  margin-top: 10px;
`;

const InfoText = styled.p`
  margin-top: 10px;
`;

class MetaMaskIntegration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      errorMessage: '',
      account: '',
      balance: ''
    };
  }

  async componentDidMount() {
    await this.checkConnection();
  }

  checkConnection = async () => {
    try {
      if (window.ethereum) {
        // Prompt user to connect their MetaMask wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Create Web3 instance using MetaMask provider
        const web3 = new Web3(window.ethereum);
        // Check if wallet is connected
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          // Wallet connected successfully
          this.setState({ isConnected: true, account: accounts[0], errorMessage: '' });
          this.getBalance(web3, accounts[0]);
        } else {
          // Wallet not connected
          this.setState({ isConnected: false, errorMessage: 'Wallet connection failed.' });
        }
      } else {
        // MetaMask extension not detected
        this.setState({ isConnected: false, errorMessage: 'MetaMask extension not detected.' });
      }
    } catch (error) {
      // Handle error
      console.error('Wallet connection error:', error);
      this.setState({ isConnected: false, errorMessage: 'Error connecting to wallet. Please try again.' });
    }
  };

  getBalance = async (web3, account) => {
    try {
      const balance = await web3.eth.getBalance(account);
      this.setState({ balance: web3.utils.fromWei(balance, 'ether') });
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  connectWallet = async () => {
    await this.checkConnection();
  };

  disconnectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
        this.setState({ isConnected: false, errorMessage: '', account: '', balance: '' });
      } else {
        this.setState({ errorMessage: 'MetaMask extension not detected.' });
      }
    } catch (error) {
      console.error('Wallet disconnection error:', error);
      this.setState({ errorMessage: 'Error disconnecting from wallet. Please try again.' });
    }
  };

  render() {
    const { isConnected, errorMessage, account, balance } = this.state;
    return (
      <Container>
        {!isConnected ? (
          <Button onClick={this.connectWallet}>Connect Wallet</Button>
        ) : (
          <>
            <Button onClick={this.disconnectWallet}>Disconnect Wallet</Button>
            <InfoText>Connected Account: {account}</InfoText>
            <InfoText>Balance: {balance} ETH</InfoText>
          </>
        )}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Container>
    );
  }
}

export default MetaMaskIntegration;
