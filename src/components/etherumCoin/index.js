import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Web3 from 'web3';


// Styled components
const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 34px;
  margin-bottom: 20px;
  color: #0085C2;
  background-color: #D5FF74;
  width: 60%;
  height: 60px;
  padding-top: 20px;
  border-radius: 8px;
  font-family: ;
  text-align: center;
  margin-left: 20%;
`;

const Info = styled.div`
  margin-bottom: 15px;
  opacity: ${({ isConnected }) => (isConnected ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

function EthereumInteraction() {
    const [networkId, setNetworkId] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    async function initWeb3() {
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum);

            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                setIsConnected(true);

                const id = await web3.eth.net.getId();
                setNetworkId(id);

                const accounts = await web3.eth.getAccounts();
                if (accounts.length > 0) {
                    setUserAddress(accounts[0]);
                }

                window.ethereum.on('accountsChanged', (accounts) => {
                    if (accounts.length > 0) {
                        setUserAddress(accounts[0]);
                    }
                });
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
                alert('Failed to connect to MetaMask. Please check your MetaMask installation.');
            }
        } else {
            console.error('MetaMask not found');
            alert('Please install MetaMask to interact with Ethereum');
        }
    }

    useEffect(() => {
        initWeb3();
    }, []);

    return (
        <Container>
            <Title>Ethereum Interaction with Web3.js</Title>
            <Info isConnected={isConnected}>
                <div>Current Ethereum Network ID: {networkId}</div>
                <div>User Ethereum Address: {isConnected ? userAddress : 'Not Connected'}</div>
            </Info>
            {!isConnected && (
                <Button onClick={initWeb3}>Connect to MetaMask</Button>
            )}
        </Container>
    );
}

export default EthereumInteraction;
