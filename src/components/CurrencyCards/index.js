import React, { useState, useEffect } from 'react';
import image1 from "./images/images.png";
import image2 from './images/download.png';
import image3 from './images/360_F_35763485_gQJYDbJe7k4RUMwOurLBilnBmsjSPJ9w.jpg';
import pic1 from './images/image1-removebg-preview.png';
import pic2 from './images/image2-removebg-preview.png';
import pic3 from './images/image3-removebg-preview.png';
import { BounceLoader } from 'react-spinners';
import styled from 'styled-components';



import {
    MainContainer,
    MainHead,
    CrptoCardMain,
    Container1,
    Container2,
    ImageCoin,
    ImageFlag,
} from './styled';


const StyledLoader = styled(BounceLoader)`
  // Center the loader horizontally and vertically
  position: absolute;
  margin-top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const CryptoCard = ({ currency, data,image }) => {
    console.log(currency);
  const { code, symbol, rate, description, rate_float } = data;
  const getRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
  };

  return (
    <CrptoCardMain style={{ background: getRandomColor() }}>
        <Container1>
            <h1>{code}</h1>
            <ImageFlag src={image.flag} alt="Flag"/>
        
            <p>{description}</p>
        </Container1>
        <ImageCoin src={image.pic} alt="Flag"/>
       <Container2>
       <h1>
        <span dangerouslySetInnerHTML={{ __html: symbol }}></span>
        {rate}
      </h1>
            <p>{rate_float}</p>
       </Container2>
    
    </CrptoCardMain>
  );
};

const Currency = () => {
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const { bpi,time } = await response.json();
        setCryptoData(bpi);
        console.log(time);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const currencyImages = {
    USD: {flag: image1 , pic : pic2},
    GBP: {flag: image2 , pic : pic1},
    EUR: {flag: image3 , pic : pic3}
  };

  return (
    
    <MainContainer>
      <MainHead>Prices of Bitcoin in Multiple Currencies</MainHead>
      {loading ? (
        <StyledLoader
        color="#36d7b7"
        size={300}
      />
      ) : (
        <div className="crypto-container">
          {cryptoData && Object.entries(cryptoData).map(([currency, data]) => (
            <CryptoCard key={currency} currency={currency} data={data} image={currencyImages[currency]} />
          ))}
        </div>
      )}
    </MainContainer>
  );
};

export default Currency;
