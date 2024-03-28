import styled from 'styled-components';

export const MainContainer = styled.div`
     border-radius: 10px;
`;
export const MainHead = styled.h1`
   text-align: center;
   color: #A5004B;
   margin-bottom: 50px;
   font-size: 38px;
   @media screen and (max-width: 768px) {
     font-size: 18px;
}
`;
export const CrptoCardMain = styled.div`
    width: 50%;
   
    height: 120px;
    padding: 30px;
    padding-left: 6%;
    padding-right: 6%;
    margin-left: 20%;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
      flex-direction: column;
      width: 100%;
      height: 120px;
      padding-left: o%;
      margin-left: 2%;
 }
    
`;
export const Container1 = styled.div`
display: flex;
justify-content: space-between;
flex-direction: column;
width: 25%;
@media screen and (max-width: 768px) {
     flex-direction: row;
     width: 100%;
     
}
 
`;
export const Container2 = styled.div`
     border-radius: 10px;
     align-self: center;
     @media screen and (max-width: 768px) {
          align-self: flex-start;
          
     }
`;
export const ImageFlag = styled.img`
     height: 30px;
     width: 50px;
     border-radius: 3px;
     @media screen and (max-width: 768px) {
          
          
     }
`;
export const ImageCoin = styled.img`
     height: 130px;
     width: 130px;
     border-radius: 3px;
     align-self: center;
     @media screen and (max-width: 768px) {
          display: none;
          height: 80px;
           width: 80px;
     }
`;