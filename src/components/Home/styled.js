import styled from 'styled-components';

export const Heading = styled.h1`
  font-size: 30px;
  color: #3DAE00;
  margin-bottom: 50px;
  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 25px;
    
}
`;

export const MainContainer = styled.div`
  width: 80%;
  height: 100%;
  @media screen and (max-width: 768px) {
    width: 80%;
    height: 100%;
}
  
`;
export const Button = styled.button`
  width: 150px;
  height: 50px;
  margin: 0 0 0 100%;
  border-radius: 8px;
  border: none;
  color: #A5004B;
  font-weight: bold;
  background-color: #00E8A6;
  font-size: 14px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 100px;
  height: 40px;
    font-size: 8px;
    margin: 0 0 0 70%;

    
}
`;